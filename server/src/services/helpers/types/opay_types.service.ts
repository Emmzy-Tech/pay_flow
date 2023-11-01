export type currencies = 'ngn' | 'usd' | 'pounds' | 'eur';

export type ReciverType = {
  name: string;
  nameCheck?: string;
  bankCode: number;
  bankAccountNumber: number;
};

export type SendMoneyType = {
  reference: string;
  amount: number;
  currency: currencies;
  country: string;
  receiver: ReciverType;
  reason: string;
};
