require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Users = require("./models/userModel");
const session = require("express-session");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const connectDB = require("./config/db");
const path = require("path");

const MAILCHIMP_API_KEY = "13281cac13ebeb03c9b4dd42693b0623-us12";
const MAILCHIMP_LIST_ID = "168c5c0711";
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
// After you declare "app"

//connectDB
connectDB();


const app = express();
app.use('/uploads', express.static('./uploads/'));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("./uploads/"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);

//routes
app.use("/gif", require("./routes/GIFRouter"));
app.use("/shop", require("./routes/shopRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/parrain", require("./routes/parrain.router"));
app.use("/api", require("./routes/upload"));
app.use("/banner", require("./routes/bannerRouter"));
app.use("/apropos", require("./routes/AproposRouter"));
app.use("/product", require("./routes/product.router"));
app.use("/ccmarche", require("./routes/CommentcamarcheRouter"));
app.use("/subscribe", require("./routes/newsletterRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/contact", require("./routes/contactRouter"));
app.use("/logo", require("./routes/logoRouter"));
app.use("/api/meetings", require("./routes/meetingRouter"));
app.use("/habillements", require("./routes/habillementRouter"));
app.use("/hbs/images", require("./routes/habillement-imgs.router"));
app.use("/filterHabillement", require("./routes/FilterHabillementRouter"));
app.use("/subcategories", require("./routes/SubCategoryRouter"));
app.use("/seasons", require("./routes/seasonRouter"));
app.use("/brands", require("./routes/brandRouter"));
app.use("/favoris", require("./routes/FavorisRouter"));
app.use("/inventaire", require("./routes/inventaire.route"));
app.use("/abonnements", require("./routes/abonnement.router"));
app.use("/commentlouer", require("./routes/commentlouer.router"));
app.use("/coach", require("./routes/coach.router"));
app.use("/sizes", require("./routes/SizeRouter"));
app.use("/shoesize", require("./routes/shoeSizeRouter"));
app.use("/venteflash", require("./routes/venteflash.router"));
app.use("/brandvideo", require("./routes/brandvideo.router"));
app.use("/utils/images", express.static("utils/images"));
app.use("/desc", require("./routes/DescriptionRouter"));
app.use("/ResSoc", require("./routes/ResSocRouter"));
const PORT = process.env.PORT || 31714;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: "us12",
});
app.get("/getMembers", async (req, res) => {
  const response = await mailchimp.lists.getListMembersInfo(MAILCHIMP_LIST_ID);
  res.status(200).json(response);
});
app.get("/blockUser", async (req, res) => {
  try {
    const { email } = req.body;
    const response = await mailchimp.lists.updateListMember(
      MAILCHIMP_LIST_ID,
      email,
      {
        status: "unsubscribed",
      }
    );
    res.json({ msg: "User has been blocked " });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
app.post("/addSubscriber", async (req, res) => {
  const { email } = req.body;
  const check = await Users.findOne({ email });
  if (check)
    return res
      .status(400)
      .json({ msg: "This account is already a list member " });
  const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
    email_address: email,
    status: "pending",
  });
  res.status(200).json(response);
});