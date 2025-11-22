const { ObjectId } = require("mongodb");
const { getDb } = require("../data/database");

const collectionName = "phones";

// GET all phones
const getAllPhones = async (req, res, next) => {
  try {
    const db = getDb();
    const phones = await db.collection(collectionName).find().toArray();
    res.json(phones);
  } catch (err) {
    next(err);
  }
};

// GET phone by id
const getPhoneById = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const phone = await db.collection(collectionName).findOne({ _id: id });
    if (!phone) return res.status(404).json({ message: "Phone not found" });

    res.json(phone);
  } catch (err) {
    err.status = 400;
    err.message = "Invalid phone ID format";
    next(err);
  }
};

// POST create phone
const createPhone = async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db.collection(collectionName).insertOne(req.body);

    res.status(201).json({
      message: "Phone created",
      id: result.insertedId
    });
  } catch (err) {
    next(err);
  }
};

// PUT update phone
const updatePhone = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection(collectionName).updateOne(
      { _id: id },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Phone not found" });
    }

    res.json({ message: "Phone updated" });
  } catch (err) {
    err.status = 400;
    err.message = "Invalid phone ID format";
    next(err);
  }
};

// DELETE phone
const deletePhone = async (req, res, next) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection(collectionName).deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Phone not found" });
    }

    res.json({ message: "Phone deleted" });
  } catch (err) {
    err.status = 400;
    err.message = "Invalid phone ID format";
    next(err);
  }
};

module.exports = {
  getAllPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone
};
