const router = require("express").Router();
const validate = require("../middleware/validate");
const { carrierSchema } = require("../models/carrierModel");
const controller = require("../controllers/carrierController");

/**
 * Carriers Routes
 */
router.get("/", controller.getAllCarriers);
router.get("/:id", controller.getCarrierById);
router.post("/", validate(carrierSchema), controller.createCarrier);
router.put("/:id", validate(carrierSchema), controller.updateCarrier);
router.delete("/:id", controller.deleteCarrier);

module.exports = router;
