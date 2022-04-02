import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from './CreateUserUseCase';

let userRepositoryInMemory: IUsersRepository;
let sut: CreateUserUseCase;
describe('create user use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    sut = new CreateUserUseCase(userRepositoryInMemory);
  });

  describe('if the email is not taken', () => {
    it('should return resolved promise', async () => {
      const user: ICreateUserDTO = {
        email: 'rlmdatans15@gmail.com',
        password: '123',
        name: 'ranieri',
      };
      await expect(sut.execute(user)).resolves.toEqual(undefined);
    });
  });
  describe('if the email is already taken', () => {
    it('should throw a error', async () => {
      const user: ICreateUserDTO = {
        email: 'rlmdatans15@gmail.com',
        password: '123',
        name: 'ranieri',
      };
      await sut.execute(user);
      await expect(sut.execute(user)).rejects.toEqual(new AppError('User already exists'));
    });
  });
});
