const mongoose = require("mongoose");

const injurySchema = new mongoose.Schema({
  injuryType: {
    type: String,
    required: false, // not mandatory
  },
  dateOfInjury: {
    type: Date,
    required: false, // not mandatory
  },
  severity: {
    type: String,
    enum: ["Mild", "Moderate", "Severe"],
    required: false,
  },
  treatment: {
    type: String,
    required: false,
  },
  recovered: {
    type: Boolean,
    default: false,
  },
});

const personalInfoSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: false,
    },
    height_cm: {
      type: Number,
      required: false,
    },
    weight_kg: {
      type: Number,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pincode: { type: String, required: false },
    },
    level: {
      type: String,
      required: false,
    },
    specialConditions: {
      injuries: [injurySchema], // optional, can be empty
    },
  },
  { timestamps: true }
);

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
