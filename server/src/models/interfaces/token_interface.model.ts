import { mongoose } from '@dolphjs/dolph/packages';
import { TokenType } from '../types';

export interface IToken extends mongoose.Document {
  token: string;
  userId: mongoose.Types.ObjectId;
  type: typeof TokenType;
  expires: Date;
}
