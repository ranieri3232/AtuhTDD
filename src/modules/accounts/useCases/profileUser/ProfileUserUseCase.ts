import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class ProfileUserUseCase {
  constructor(
		private userRepository: IUsersRepository,
  ) {}

  async execute(id:string) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User does not exists.');
    }
  }
}
export { ProfileUserUseCase };
