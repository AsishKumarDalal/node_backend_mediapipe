const Adminschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // foreign key
    ref: "PersonalInfo",
    required: true,
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
});
module.exports = {
  Adminschema,
};