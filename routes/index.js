const router = require("express").Router();

router.use("/phones", require("./phones"));
router.use("/carriers", require("./carriers"));

module.exports = router;
