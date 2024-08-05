import { Response } from 'express';
import IRequestInterface from './IRequest.interface';

export default interface IControllerInterface {
  (req: IRequestInterface, res: Response): void;
}
