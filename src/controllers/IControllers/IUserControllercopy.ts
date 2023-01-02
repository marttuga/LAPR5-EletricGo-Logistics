import { Request, Response, NextFunction } from 'express';

export default interface IUserControllercopy  {
  createUser(req: Request, res: Response, next: NextFunction)
  findUser(req: Request, res: Response, next: NextFunction)
  updateUser(req: Request, res: Response, next: NextFunction)
  //deleteUser(req: Request, res: Response, next: NextFunction)
  getPhone(req: Request, res: Response, next: NextFunction)
  getEmail(req: Request, res: Response, next: NextFunction)
  deleteUserByEmail(req: Request, res: Response, next: NextFunction)
}