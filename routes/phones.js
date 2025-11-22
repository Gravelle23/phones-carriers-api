const router = require("express").Router();
const validate = require("../middleware/validate");
const { phoneSchema } = require("../models/phoneModel");
const controller = require("../controllers/phoneController");

/**
 * Phones Routes
 */
router.get("/", controller.getAllPhones);
router.get("/:id", controller.getPhoneById);
router.post("/", validate(phoneSchema), controller.createPhone);
router.put("/:id", validate(phoneSchema), controller.updatePhone);
router.delete("/:id", controller.deletePhone);

module.exports = router;
