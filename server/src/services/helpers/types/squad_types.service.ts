export type transferToBankAccountType = {
  amount: number;
  bank_code: string | number;
  account_number: string;
  remark: string;
  transaction_reference: string;
  account_name: string;
  initiator_name: string;
};
