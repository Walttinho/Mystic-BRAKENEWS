const User = require("../models/User");

// Serviço para criar um novo usuário
const createService = (body) => User.create(body);

// Serviço para obter todos os usuários
const findAllService = () => User.find();

// Serviço para obter um usuário pelo ID
const findByIdService = (id) => User.findById(id);

// Serviço para Atualizar um usuário
const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );

module.exports = {
  createService,
  findAllService,
  findByIdService,
  updateService,
};