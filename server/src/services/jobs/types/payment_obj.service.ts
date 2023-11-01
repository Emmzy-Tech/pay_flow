import { ReciverType } from '@/services/helpers';

export type PaymentType = {
  userId: string;
  amount: number;
  currentBalance: number;
  receiver: ReciverType;
};
