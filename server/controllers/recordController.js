import Record from "../models/Record.js";

// @desc Create new record
export const createRecord = async (req, res) => {
  try {
    const record = await Record.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Record created successfully.",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create record.",
      error: error.message,
    });
  }
};


// @desc Get all user records
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(records);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch records.",
      error: error.message,
    });
  }
};


// @desc Update record
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({
        message: "Record not found.",
      });
    }

    Object.assign(record, req.body);

    const updatedRecord = await record.save();

    res.status(200).json({
      message: "Record updated successfully.",
      record: updatedRecord,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update record.",
      error: error.message,
    });
  }
};


// @desc Delete record
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({
        message: "Record not found.",
      });
    }

    await record.deleteOne();

    res.status(200).json({
      message: "Record deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete record.",
      error: error.message,
    });
  }
};