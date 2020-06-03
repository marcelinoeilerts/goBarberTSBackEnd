import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('incorrect email/passwd combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('incorrect email/passwd combination.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
