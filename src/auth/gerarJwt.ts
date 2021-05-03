import * as jwt from "jsonwebtoken";
import { UsuarioAttributes } from "../models/usuario";
import { JWT_SECRET } from '../util/secrets'

export const gerarJwt = (usuario: UsuarioAttributes) => {
  // Usado id para buscar o usuário quando envia o token
  const payload = {
    id: usuario.id
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  });
};