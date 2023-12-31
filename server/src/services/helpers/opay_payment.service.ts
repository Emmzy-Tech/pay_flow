import { appInDevMode, appInProdMode, toHmac } from '@/utils';
import { SendMoneyType } from './types/opay_types.service';
import { postRequest } from './api_requests.service';
import { isSuccessfulRes } from './response_check.service';
import { configs } from '@/configs';
import { createHmac } from 'crypto';

export class Opay {
  private readonly sandboxUrl = 'https://testapi.opaycheckout.com/api/v1/international/payment/create';
  private readonly liveUrl = 'https://liveapi.opaycheckout.com/api/v1/international/payment/create';

  protected url = !appInProdMode() ? this.sandboxUrl : this.liveUrl;

  public readonly sendToBank = async ({ reference, amount, currency, country, receiver, reason }: SendMoneyType) => {
    const endpoint = `${this.url}`;
    const data = {
      amount: {
        currency,
        total: amount,
      },
      country,
      payMethod: 'BankTransfer',
      product: {
        description: 'Payment for monthly salary',
        name: 'Salaray Payment',
      },
      bankAccountNumber: receiver.bankAccountNumber,
      customerName: receiver.name,
      reference,
      callbackUrl: 'https://testapi.opaycheckout.com/api/v1/international/print',
    };

    const authorization = toHmac(data, configs.opay.secret);
    console.log(authorization, this.url, configs.opay.secret);
    try {
      const res = await postRequest({
        endpoint,
        data,
        headers: {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
          MerchantId: configs.opay.id,
        },
      });

      console.log(res.data);

      if (isSuccessfulRes(res)) return res.data;

      return false;
    } catch (e: any) {
      console.error(`Send To Bank Request Error - ${e.message}`);
      return false;
    }
  };
}
