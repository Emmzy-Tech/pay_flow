import { randomBytes } from 'crypto';
import { IUser } from '@/models/interfaces';

export const generateTransactionId = (userId: IUser['_id']) => {
  let result = '';
  for (let i = 0; i < 5; i++) {
    const buf = randomBytes(4);
    result += Math.floor((buf.readUInt32BE(0) / 0xffffffff) * 100) + '';
  }
  return userId + result.trim();
};
