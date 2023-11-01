import { appInDevMode, appInProdMode } from '@/utils';
import { SendMoneyType } from './types/opay_types.service';
import { postRequest } from './api_requests.service';
import { isSuccessfulRes } from './response_check.service';

export class Opay {
  private readonly sandboxUrl = 'http://sandbox-cashierapi.opayweb.com/api/v3';
  private readonly liveUrl = 'https://cashierapi.opayweb.com/api/v3';

  protected url = !appInProdMode() ? this.sandboxUrl : this.liveUrl;

  public readonly sendToBank = async ({ reference, amount, currency, country, receiver, reason }: SendMoneyType) => {
    const endpoint = `${this.url}/transfer/toBank`;
    const headers = {};
    const data = {
      reference,
      amount,
      country,
      currency,
      receiver,
      reason,
    };

    try {
      const res = await postRequest({ endpoint, data, headers });
      console.log(res.data);

      if (isSuccessfulRes(res)) return res.data;

      return false;
    } catch (e: any) {
      console.error(`Send To Bank Request Error - ${e.message}`);
      return false;
    }
  };
}
