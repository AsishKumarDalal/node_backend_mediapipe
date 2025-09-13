const { register_service, login_service } = require("../services/authservice");
const expressAsyncHandler = require("express-async-handler");
const register = expressAsyncHandler(async (req, res) => {
  const { email, password, ...rest } = req.body;
  const response = await register_service({ email, password, ...rest });
  res.send(response);
});
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await login_service(email, password);
  res.send({
    response,
  });
});
module.exports = {
  register,
  login,
};
