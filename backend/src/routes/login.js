const { Router } = require("express");

const { login } = require("../Controllers/login.controllers");

const routerLogin = Router();

routerLogin.post("/", login);

module.exports = routerLogin

