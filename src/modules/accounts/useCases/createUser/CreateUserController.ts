import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { Request, Response } from 'express';

class CreateUserController {
  async handle(req: Request, res: Response):Promise<Response> {
    const { email, name, password } = req.body as ICreateUserDTO;

    return res.status(200).send({ message: 'ola' });
  }
}

export { CreateUserController };
