import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '@config/auth';

interface IRequest {
	email: string,
	password: string
}

interface IResponse{
	user: {
		name: string;
		email: string;
	},
	token: string;
}
interface ITokenPayload {
	id: string;
}
class AuthenticateUserUseCase {
  constructor(
		private userRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest):Promise<IResponse> {
    const {
      secretJwt,
      expiresIn,
    } = auth;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password is incorrect');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password is incorrect');
    }
    const token = jwt.sign(
      { email },
      secretJwt,
      {
        expiresIn,
        subject: user.id,
      },
    );
    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };
