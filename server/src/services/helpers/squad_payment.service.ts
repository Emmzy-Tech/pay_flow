import { configs } from '@/configs';
import { appInDevMode } from '@/utils';
import { logger } from '@dolphjs/dolph/utilities';
import { createHmac } from 'crypto';
import { Request } from 'express';
import { getRequest, postRequest } from './api_requests.service';
import { isSuccessfulRes } from './response_check.service';
import { transferToBankAccountType } from './types';

export class Squad {
  private SQUAD_SECRET: string;
  private BASE_URL: string;

  constructor() {
    this.SQUAD_SECRET = !appInDevMode() ? configs.squad.testKey : configs.squad.privateKey;
    this.BASE_URL = !appInDevMode() ? 'https://sandbox-api-d.squadco.com' : 'https://api-d.squadco.com';
  }

  public verifyWebhookEvent = (req: Request) => {
    const hash = createHmac('sha512', this.SQUAD_SECRET).update(JSON.stringify(req.body)).digest('hex');
    console.log(req.headers);
    console.log(hash);
    if (hash == req.headers['x-squad-signature']) {
      return true;
    } else {
      return false;
    }
  };

  public getBanks = async () => {
    try {
      const endpoint = `${this.BASE_URL}/banks/NG`;
      const response = await getRequest({ endpoint, headers: { Authorization: `Bearer ${this.SQUAD_SECRET}` } });

      if (isSuccessfulRes(response)) return response.data.data;

      return false;
    } catch (e: any) {
      logger.error(`Get banks error:`, e);
      return false;
    }
  };

  public transferToBankAccount = async ({
    bank_code,
    account_number,
    amount,
    remark,
    transaction_reference,
    account_name,
    initiator_name,
  }: transferToBankAccountType) => {
    const endpoint = `${this.BASE_URL}/payout/transfer`;

    const data = {
      bank_code: bank_code.toString(),
      currency_id: 'NGN',
      account_name,
      amount: amount * 100,
      remark: remark ? remark : `Payflow tranfer from ${initiator_name}`,
      transaction_reference,
      account_number,
    };

    console.log(data);

    try {
      const response = await postRequest({
        endpoint,
        data,
        headers: { Authorization: `Bearer ${this.SQUAD_SECRET}` },
      });

      if (isSuccessfulRes(response)) return response.data.data;

      return false;
    } catch (e: any) {
      console.error(`transfer to bank account - `, e);
      return false;
    }
  };
}
