import crypto from 'crypto';
import prisma from '@/databases/postgreClient';
import { IUserInput } from '@/interfaces/user.interface';
import { logger } from '@/utils/logger';

export default class AuthService {
  public async register(user: IUserInput) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashPassword = crypto.pbkdf2Sync(user.password, salt, 310000, 32, 'sha256');
    try {
      await prisma.account.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          dateOfBirth: new Date(user.dateOfBirth),
          salt: salt,
          hashPassword: hashPassword.toString('hex'),
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async verify(username, password, cb) {
    // search for user in database
    try {
      const user = await prisma.account.findUnique({
        where: {
          username: username,
        },
      });

      // if user is found, check password
      if (user) {
        const hashPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
        
        // if calculated hash does not match the stored hash, return false
        if (user.hashPassword !== hashPassword.toString('hex')) {
          return cb(null, false);
        }

        // if user is found and password is correct, return user
        return cb(null, user);
      }

      // if user is not found, return false
      return cb(null, false);
    } catch (error) {
      return cb(null, false);
    }
  }
}
