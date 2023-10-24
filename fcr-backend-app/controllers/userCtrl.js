const Users = require("../models/userModel");
const PasswordReset = require("../models/PasswordReset");
const ParrainSchema = require("../models/Parrainage");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const cloudinary = require("../config/cloudinary");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;
const fetch = require("node-fetch");
const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, phone, address, birthday, gender, password } =
        req.body;
      if (
        !name ||
        !email ||
        !password ||
        !birthday ||
        !address ||
        !phone ||
        !gender
      )
        return res
          .status(400)
          .json({ msg: "Merci de remplir tous les champs" });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "E-mails invalides" });
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({
          msg: "Ce compte utilisateur existe déjà, veuillez créer un nouveau compte avec un email diffèrent",
        });

      if (password.length < 8)
        return res.status(400).json({
          msg: " Le Mot de passe doit contenir au moins 8 caractéres",
        });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        phone,
        address,
        birthday,
        gender,
        password: passwordHash,
      };
      const activation_token = createActivationToken(newUser);
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Activer", "Vérifiez votre adresse e-mail");

      res.json({
        msg: "Inscription réussie ! Veuillez activer votre email pour commencer ",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerMobile: async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        birthday,
        gender,
        password,
        confirmPassword,
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !birthday ||
        !gender ||
        !address ||
        !phone
      ) {
        return res.status(400).json({
          status: "FAILED",
          msg: "Veuillez s'il vous plaît compléter les champs réquis",
        });
      } else if (!validateEmail(email)) {
        return res.status(400).json({
          status: "FAILED",
          msg: "Adresse e-mail invalide!",
        });
      } else if (password.length < 8) {
        return res.status(400).json({
          status: "FAILED",
          msg: "Mot de passe doit contenir au minimum 8 caractères!",
        });
      } else {
        Users.find({ email })
          .then((result) => {
            if (result.length) {
              res.status(400).json({
                status: "FAILED",
                msg: "Adresse email est déjà utilisée!",
              });
            } else {
              const saltRounds = 12;
              bcrypt
                .hash(password, saltRounds)
                .then((hashedPassword) => {
                  const newUser = new Users({
                    name,
                    email,
                    address,
                    phone,
                    gender,
                    birthday,
                    password: hashedPassword,
                    verified: false,
                    confirmPassword,
                    subscribed: false,
                  });
                  newUser.save().then((result) => {
                    sendOTPVerificationEmail(result, res);
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    status: "FAILED",
                    msg: "An error occured while hashing password!",
                  });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "FAILED",
              msg: "An error occured while checking for existing user",
            });
          });
      }
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ status: "FAILED", msg: "Adresse email n'existe pas! " });
      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(
        email,
        url,
        "Réinitialisez",
        "Réinitialisez votre mot de passe "
      );
      return res.status(200).json({
        status: "SUCCESS",
        msg: "Renvoyez le mot de passe, veuillez vérifier votre e-mail",
        user: user,
      });
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  requestPasswordReset: async (req, res) => {
    const { email } = req.body;
    Users.find({ email })
      .then((data) => {
        if (data.length) {
          if (!data[0].verified) {
            res.status(400).json({
              status: "FAILED",
              msg: "Email hasn't been verified yet. Check your inbox!",
            });
          } else {
            sendResetEmail(data[0], res);
          }
        } else {
          res.status(400).json({
            status: "FAILED",
            msg: "No account with the supplied email exists!",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          msg: "An error occured while checking for existing user",
        });
      });
  },
  ResetPass: async (req, res) => {
    let { userId, resetString, newPassword } = req.body;

    PasswordReset.find({ userId })
      .then((result) => {
        if (result.length > 0) {
          const { expiresAt } = result[0];
          const hashedCode = result[0].resetString;
          if (expiresAt < Date.now()) {
            PasswordReset.deleteOne({ userId })
              .then(() => {
                res.status(400).json({
                  status: "FAILED",
                  msg: "Password reset code has expired.",
                });
              })
              .catch((error) => {
                res.status(400).json({
                  status: "FAILED",
                  msg: "Clearing password reset record failed.",
                });
              });
          } else {
            bcrypt
              .compare(resetString, hashedCode)
              .then((result) => {
                if (result) {
                  const saltRounds = 12;
                  bcrypt
                    .hash(newPassword, saltRounds)
                    .then((hashedNewPassword) => {
                      Users.updateOne(
                        { _id: userId },
                        { password: hashedNewPassword }
                      )
                        .then(() => {
                          PasswordReset.deleteOne({ userId })
                            .then(() => {
                              res.status(200).json({
                                status: "SUCCESS",
                                msg: "Password has been reset successfully.",
                              });
                            })
                            .catch((error) => {
                              res.status(400).json({
                                status: "FAILED",
                                msg: "An error occurred while finalizing password reset.",
                              });
                            });
                        })
                        .catch((error) => {
                          res.status(400).json({
                            status: "FAILED",
                            msg: "Updating user password failed.",
                          });
                        });
                    })
                    .catch((error) => {
                      res.status(400).json({
                        status: "FAILED",
                        msg: "An error occurred while hashing new password.",
                      });
                    });
                } else {
                  res.status(400).json({
                    status: "FAILED",
                    msg: "Invalid password reset details passed.",
                  });
                }
              })
              .catch((error) => {
                res.status(400).json({
                  status: "FAILED",
                  msg: "Comparing password reset strings failed.",
                });
              });
          }
        } else {
          res.status(400).json({
            status: "FAILED",
            msg: "Password reset request not found.",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: "FAILED",
          msg: "Checking for existing password reset record failed.",
        });
      });
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const {
        name,
        email,
        password,
        confirmPassword,
        address,
        phone,
        gender,
        birthday,
      } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({
          status: "FAILED",
          msg: "Adresse email est déjà utilisée!",
        });

      const newUser = new Users({
        name,
        email,
        address,
        phone,
        gender,
        birthday,
        password,
        confirmPassword,
        subscribed: false,
      });
      await newUser.save();

      return res.status(200).json({
        status: "SUCCESS",
        msg: "Le compte a été activé ",
        user: newUser,
      });
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  loginMobile: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({
          status: "FAILED",
          msg: "Le compte n'existe pas",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          status: "FAILED",
          msg: "le mot de passe est incorrect. Essayez à nouveau.",
        });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      return res.status(200).json({
        status: "SUCCESS",
        msg: "La connexion a réussi!",
        user: user,
        refresh_token: refresh_token,
      });
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({
          status: "FAILED",
          msg: "Ce mail n'existe pas",
        });
      if (user.isArchived) {
        return res.status(400).json({
          status: "FAILED",
          msg: "Cet utilisateur a été archivé. Il est nécessaire de créer un nouveau compte.",
        });
      }
      if (user.blocked) {
        return res.status(400).json({
          status: "FAILED",
          msg: "Cet utilisateur a été bloqué. Veuillez nous contacter pour plus d'informations",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          status: "FAILED",
          msg: "Votre mot de passe est incorrecte, priére d'entrer un mot de passe correcte.",
        });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      return res.status(200).json({
        status: "SUCCESS",
        msg: "Connexion réussie",
        refresh_token: refresh_token,
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        address: user.address,
        birthday: user.birthday,
        phone: user.phone,
        avatar: user.avatar,
        gender: user.gender,
        verified: true,
        statusParrain: user.statusParrain,
        justificatif:user.justificatif,
        isJustified:user.isJustified
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ status: "FAILED", msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Mot de passe changé avec succès ! " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersEnableandNotBlocked: async (req, res) => {
    try {
      const users = await Users.find({
        isArchived: false,
        blocked: false,
      }).select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchUsers: async (req, res, next) => {
    try {
      console.log(req.params.search.trim());
      const instance = await Users.find({
        $or: [
          { name: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          { email: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          { address: { $regex: `${req.params.search.trim()}`, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$phone" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$createdAt" },
                regex: req.params.search.trim(),
                options: "i",
              },
            },
          },
        ],
        isArchived: false,
        blocked: false,
      });
      console.log(instance);
      res.json({
        status: "SUCCESS",
        data: instance,
        message: "données affichées avec succees .",
      });
    } catch (error) {
      res.json({
        status: "Failed",
        message: error,
      });
    }
  },
  countUsers: async (req, res) => {
    try {
      req = { role: 0 };
      const count_ = await Users.countDocuments(req);
      if (count_ === 0) {
        res.status(400).json({ msg: "Aucune valeur n'a été trouvée" });
      } else {
        res.status(200).json({ data: count_ });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  countUsersByMonth: async (req, res) => {
    try {
      const result = await Users.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
      ]);

      res.json(result);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre d'utilisateurs par mois",
        error
      );
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await Users.findById(req.params.id).select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const users = await Users.findOne({email:req.params.email}).select("-password");
      res.status(200).json({
        status: "SUCCESS",
        msg: "user affiché.",
        data: users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.body.id;
      const { name, email, address, birthday, phone, avatar } = req.body;
      const user = await Users.findById(id);
      let imageInfo = "";
      if (avatar) {
        const result = await cloudinary.uploader.upload(avatar, {
          folder: "avatar",
          width: 400,
          height: 400,
          crop: "fill",
        });
        imageInfo = result.secure_url;
        if (user.avatar && user.avatar.public_id) {
          await cloudinary.uploader.destroy(user.avatar.public_id);
        }
      } else {
        imageInfo = user.avatar;
      }
      user.name = name;
      user.email = email;
      user.address = address;
      user.phone = phone;
      user.birthday = birthday;
      user.avatar = imageInfo;
      await user.save();
      res.json({ msg: "Update Success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
      console.log(err);
    }
  },
  updateJustificatif: async (req, res) => {
    try {
      const id = req.body.id;
      const user = await Users.findById(id);
      user.justificatif=req.file.filename
      user.isJustified="En attente"
      await user.save();
      res.json({ msg: "Update Success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
      console.log(err);
    }
  },
  updateEtatJustificatif: async (req, res) => {
    try {
      const id = req.params.id;
      const etat= req.params.etat;
      const user = await Users.findById(id);
      user.isJustified=etat;
      await user.save();
      res.json({ msg: "Update Success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
      console.log(err);
    }
  },
  Restaurerprofil: async (req, res) => {
    const id = req.params.id;
    const instance = await Users.findById(id);
    instance.isArchived = false;
    const persist = await instance.save();
    res.json({
      status: "SUCCESS",
      msg: "Vous avez restauré ce profil.",
      data: persist,
    });
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.json({ msg: "Supprimé avec succès !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  blockById: async (req, res) => {
    const id = req.params.id;
    const instance = await Users.findById(id);
    instance.blocked = true;
    const saved = await instance.save();
    res.json(saved);
  },
  unblockById: async (req, res) => {
    const id = req.params.id;
    const instance = await Users.findById(id);
    instance.blocked = false;
    const saved = await instance.save();
    res.json(saved);
  },
  archiveById: async (req, res) => {
    const id = req.params.id;
    const instance = await Users.findById(id);
    instance.isArchived = true;
    const saved = await instance.save();
    res.json(saved);
  },
  restoreById: async (req, res) => {
    const id = req.params.id;
    const instance = await Users.findById(id);
    instance.isArchived = false;
    const saved = await instance.save();
    res.json(saved);
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Déconnecté" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { email_verified, email, name, picture, id } = verify.payload;
      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res
          .status(400)
          .json({ msg: "La vérification de l'e-mail a échoué." });

      let user = await Users.findOne({ email });

      if (user) {
        if (user.isArchived) {
          return res.status(400).json({
            status: "FAILED",
            msg: "Cet utilisateur a été archivé. Il est nécessaire de créer un nouveau compte.",
          });
        }
        if (user.blocked) {
          return res.status(400).json({
            status: "FAILED",
            msg: "Cet utilisateur a été bloqué. Veuillez nous contacter pour plus d'informations",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res
            .status(400)
            .json({ msg: "Le mot de passe est incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        });

        res.json({
          status: "SUCCESS",
          msg: "Connexion réussie",
          refresh_token: refresh_token,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          id: user.id,
          statusParrain: user.statusParrain,
        });
      } else {
        const newUser = new Users({
          id,
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        await newUser.save();

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        });

        res.json({
          status: "SUCCESS",
          msg: "Connexion réussie",
          refresh_token: refresh_token,
          email: newUser.email,
          name: newUser.name,
          id: newUser.id,
          avatar: newUser.avatar,
          statusParrain: newUser.statusParrain,
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name, picture, id } = data;
      const password = email + process.env.FACEBOOK_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await Users.findOne({ email });

      if (user) {
        if (user.isArchived) {
          return res.status(400).json({
            status: "FAILED",
            msg: "Cet utilisateur a été archivé. Il est nécessaire de créer un nouveau compte.",
          });
        }
        if (user.blocked) {
          return res.status(400).json({
            status: "FAILED",
            msg: "Cet utilisateur a été bloqué. Veuillez nous contacter pour plus d'informations",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({
          status: "SUCCESS",
          msg: "Connexion réussie",
          refresh_token: refresh_token,
          email: user?.email,
          name: user?.name,
          avatar: user?.avatar,
          id: user?.id,
          statusParrain: user?.statusParrain,
        });
        console.log(user.id, name, email, picture, refresh_token);
      } else {
        const newUser = new Users({
          id,
          name,
          email,
          password: passwordHash,
          avatar: picture.data.url,
        });
        await newUser.save();

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({
          status: "SUCCESS",
          msg: "Connexion réussie",
          refresh_token: refresh_token,
          email: newUser.email,
          name: newUser.name,
          id: newUser.id,
          avatar: picture.data.url,
          statusParrain: newUser.statusParrain,
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {});
};
module.exports = userCtrl;