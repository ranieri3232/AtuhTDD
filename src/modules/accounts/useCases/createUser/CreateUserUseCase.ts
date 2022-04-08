import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';

class CreateUserUseCase {
  constructor(
		private userRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password } : ICreateUserDTO):Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 8);
    await this.userRepository.create({ name, email, password: passwordHash });
  }
}

export { CreateUserUseCase };
