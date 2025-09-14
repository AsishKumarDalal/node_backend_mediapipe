const PersonalInfo = require("../models/personalinfo");
const expressAsyncHandler = require("express-async-handler");
const see_all_candidates = expressAsyncHandler(async (req, res) => {
  const results = await PersonalInfo.find({});
  res.send({
    results,
  });
});
module.exports = {
  see_all_candidates,
};
