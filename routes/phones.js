const router = require("express").Router();
const validate = require("../middleware/validate");
const { phoneSchema } = require("../models/phoneModel");
const controller = require("../controllers/phoneController");
const { requiresAuth } = require("express-openid-connect"); 

/**
 * Phones Routes
 */
router.get("/", controller.getAllPhones);
router.get("/:id", controller.getPhoneById);

router.post("/", requiresAuth(), validate(phoneSchema), controller.createPhone);
router.put("/:id", requiresAuth(), validate(phoneSchema), controller.updatePhone);
router.delete("/:id", requiresAuth(), controller.deletePhone);

module.exports = router;

