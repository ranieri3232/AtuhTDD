import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let sut: AuthenticateUserUseCase;
let userRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
describe('authenticate user use case', () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    sut = new AuthenticateUserUseCase(userRepository);
  });

  describe('with valid credentials', () => {
    it('should be able to authenticate a user', async () => {
      const user = {
        email: 'rlmdantas15@gmail.com',
        password: '123',
        name: 'ranieri 123',
      };
      await createUserUseCase.execute(user);
      const result = await sut.execute({ email: user.email, password: user.password });
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
    });
  });
  describe('with invalid credentials', () => {
    describe('when the user does not exist', () => {
      it('should throw a error', async () => {
        await expect(
          sut.execute({ email: 'nonexist@gmail.com', password: '123' }),
        ).rejects.toEqual(new AppError('Email or password is incorrect'));
      });
    });
    describe('when the password is wrong', () => {
      it('should throw a error', async () => {
        const user = {
          email: 'rlmdantas15@gmail.com',
          password: '123',
          name: 'Ranieri Lucas',
        };
        await createUserUseCase.execute(user);
        await expect(
          sut.execute({ email: user.email, password: 'wrong password' }),
        ).rejects.toEqual(new AppError('Email or password is incorrect'));
      });
    });
  });
});
