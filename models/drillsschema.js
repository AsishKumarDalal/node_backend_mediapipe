const PersonalInfo = require("./personalinfo");
const drillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // foreign key
      ref: "PersonalInfo",
      required: true,
    },
    sprint: {
      type: Number, // e.g., time in seconds
      required: false,
    },
    jump: {
      type: Number, // e.g., height in cm
      required: false,
    },
    shooting: {
      type: Number, // e.g., accuracy percentage
      required: false,
    },
  },
  { timestamps: true }
);
const Drill = mongoose.model("Drill", drillSchema);
