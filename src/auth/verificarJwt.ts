import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
import { JWT_SECRET } from '../util/secrets'

export const verificarJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send();
  }

  const token = authHeader.split(' ')[1];
  
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET);
  } catch (error) {    
    res.status(401).send();
    return;
  }  

  try {
    const usuario = await Usuario.findByPk(jwtPayload.id);
    if (usuario) {
      req.user = usuario;
      next();
    } else {
      res.status(401).send({ erro: 'Usuário id token.' });
    }
  } catch (erro) {
    res.status(401).send({ erro: erro });
  }
};

  // Atualizar o token por mais uma hora
  /*
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ jwtPayload.id }, JWT_SECRET, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
  */