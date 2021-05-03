import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export class AuthMiddleware {
  static autenticarJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err, usuario, info) {
      if (err) {
        console.log(err)
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
      if (!usuario) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      } else {
        req.user = usuario;
        return next()
      }
    })(req, res, next)
  }

  static autorizarJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err, usuario, jwtToken) {
      if (err) {
        console.log(err)
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      }
      if (!usuario) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' })
      } else {
        req.user = usuario;
        return next()
      }
    })(req, res, next)
  }
}