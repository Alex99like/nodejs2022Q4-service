import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length);
      try {
        const decoded = await this.jwtService.verifyAsync(token);
        req.user = decoded;
        next();
      } catch (err) {
        //res.status(401).json({ message: 'Invalid Token' });
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
      //res.status(401).json({ message: 'Authorization header not found' });
    }
  }
}
