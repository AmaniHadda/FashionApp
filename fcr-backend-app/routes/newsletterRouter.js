const router = require("express").Router();

const subscribeNewsletter = require("../controllers/newsletter.controller");

router.post("/addSubscriber", subscribeNewsletter.subscribeNewsletter);

module.exports = router;
