const { ObjectId } = require("mongodb");
const { getDb } = require("../data/database");

const collectionName = "carriers";

// GET all carriers
const getAllCarriers = async (req, res, next) => {
  try {
    const db = getDb();
    const carriers = await db.collection(collectionName).find().toArray();
    res.json(carriers);
  } catch (err) {
    next(err);
  }
};

// GET carrier by id
const getCarrierById = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const carrier = await db.collection(collectionName).findOne({ _id: id });
    if (!carrier) return res.status(404).json({ message: "Carrier not found" });

    res.json(carrier);
  } catch (err) {
    err.status = 400;
    err.message = "Invalid carrier ID format";
    next(err);
  }
};

// POST create carrier
const createCarrier = async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db.collection(collectionName).insertOne(req.body);

    res.status(201).json({
      message: "Carrier created",
      id: result.insertedId
    });
  } catch (err) {
    next(err);
  }
};

// PUT update carrier
const updateCarrier = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection(collectionName).updateOne(
      { _id: id },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    res.json({ message: "Carrier updated" });
  } catch (err) {
    err.status = 400;
    err.message = "Invalid carrier ID format";
    next(err);
  }
};

// DELETE carrier
const deleteCarrier = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection(collectionName).deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    res.json({ message: "Carrier deleted" });
  } catch (err) {
    err.status = 400;
    err.message = "Invalid carrier ID format";
    next(err);
  }
};

module.exports = {
  getAllCarriers,
  getCarrierById,
  createCarrier,
  updateCarrier,
  deleteCarrier
};
