import { Request } from 'express';
import { User } from '../entities/user/user.entity';

export default interface IRequestInterface extends Request {
  user: User;
}
