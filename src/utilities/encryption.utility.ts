import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default class Encryption {
  static async generateHash(password: string, saltRounds: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
        if (!err) {
          resolve(hash);
        }
        reject(err);
      });
    });
  }

  static async verifyHash(password: string, hash: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err: any, result: string) => {
        if (result) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }
  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  }
}
