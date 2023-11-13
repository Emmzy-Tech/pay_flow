export type currencies = 'NGN' | 'USD' | 'pounds' | 'EUR';

export type ReciverType = {
  name: string;
  nameCheck?: string;
  bankCode: number;
  bankAccountNumber: string;
};

export type SendMoneyType = {
  reference: string;
  amount: number;
  currency: currencies;
  country: string;
  receiver: ReciverType;
  reason?: string;
};
