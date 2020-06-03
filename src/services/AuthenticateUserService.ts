import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('incorrect email/passwd combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('incorrect email/passwd combination.');
    }

    const token = sign({}, '8d36bbe7f8cb06e2deea48a04dd43ff2', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
