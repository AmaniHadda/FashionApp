const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const multer = require ('multer');
const _admin = require('../middleware/authAdmin');  
const path = require("path");
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',     
    'image/png':'png',
    'image/svg':'svg'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, "../uploads/justificatifs");
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name  );
      }
});

const upload = multer({ storage: storage }).single("justificatif");
router.post("/register", userCtrl.register);

router.post("/registerMobile", userCtrl.registerMobile);

router.post("/activation", userCtrl.activateEmail);
router.post("/login", userCtrl.login);

router.post("/loginMobile", userCtrl.loginMobile);

router.post("/activate", userCtrl.activateEmail);

router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/forgot", userCtrl.forgotPassword);
router.post("/reset", auth, userCtrl.resetPassword);
router.post("/requestPasswordReset", userCtrl.requestPasswordReset);
router.post("/resetPass", userCtrl.ResetPass);

router.get("/infor", auth, userCtrl.getUserInfor);
router.get("/users", userCtrl.getUsersEnableandNotBlocked);

router.get("/all_infor", auth, authAdmin, userCtrl.getUsersAllInfor);
router.get("/search/:search", userCtrl.searchUsers);
router.put("/update", userCtrl.updateUser);

router.put("/updateJustif",upload, userCtrl.updateJustificatif);
router.put("/updateEtatJustificatif/:id/:etat", userCtrl.updateEtatJustificatif);


router.put("/restaurer/:id", userCtrl.Restaurerprofil);
router.put("/disable/:id", userCtrl.archiveById);
router.put("/enable/:id", userCtrl.restoreById);
router.put("/block/:id", userCtrl.blockById);
router.put("/unblock/:id", userCtrl.unblockById);
router.get("/getuser/:id", userCtrl.getUser);
router.get("/proprietaire/:email", userCtrl.getUserByEmail);
router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);
router.get("/logout", userCtrl.logout);
router.post("/google_login", userCtrl.googleLogin);
router.post("/facebook_login", userCtrl.facebookLogin);
router.get("/countbymonth", userCtrl.countUsersByMonth);
router.get("/count", userCtrl.countUsers);

module.exports = router;