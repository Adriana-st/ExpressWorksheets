import argon2 from 'argon2';
import { UserModel } from '../models/users';

// Anyone can read a JWT payload, so never put secrets in here
export interface TokenPayload {
  sub: string;   // the user's _id
  email: string;
}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
}

// OWASP minimum for Argon2id: 19 MiB memory, 2 iterations, 1 thread
const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export class AuthService {
  async register(name: string, email: string, password: string): Promise<PublicUser> {
    const passwordHash = await argon2.hash(password, hashOptions);
    const user = await UserModel.create({ name, email, passwordHash });
    // Built by hand so the hash never leaves the server
    return { _id: user._id.toString(), name: user.name, email: user.email };
  }
}