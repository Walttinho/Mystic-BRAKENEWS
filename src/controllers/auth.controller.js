import bcrypt from "bcryptjs";
import { loginService, generateToken } from "../services/auth.service.js";

// Função para realizar o login
// Function to perform login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verifica se o usuário existe e se a senha está correta
    // Check if the user exists and if the password is correct
    const user = await loginService(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    // Gera o token de autenticação para o usuário
    // Generate the authentication token for the user
    const token = generateToken(user.id);

    // Retorna a resposta com o token de autenticação
    // Return the response with the authentication token
    res.send({ token });
  } catch (error) {
    // Captura e trata qualquer erro
    // Catches and handles any errors
    console.error("Login error:", error);
    res.status(500).send({ message: "Login error" });
  }
};

export { login };

