import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasscryptService {
  private salt = 10;

  async crypt(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash;
  }

  async validate(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
