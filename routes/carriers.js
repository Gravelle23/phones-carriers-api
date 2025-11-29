const router = require("express").Router();
const validate = require("../middleware/validate");
const { carrierSchema } = require("../models/carrierModel");
const controller = require("../controllers/carrierController");
const { requiresAuth } = require("express-openid-connect"); 

/**
 * Carriers Routes
 */
router.get("/", controller.getAllCarriers);
router.get("/:id", controller.getCarrierById);

router.post("/", requiresAuth(), validate(carrierSchema), controller.createCarrier);
router.put("/:id", requiresAuth(), validate(carrierSchema), controller.updateCarrier);
router.delete("/:id", requiresAuth(), controller.deleteCarrier);

module.exports = router;
