import sha512 from 'js-sha512';

export const toHmac = (data: any, secretKey: string): string => {
  const hmac = sha512.sha512.hmac.create(secretKey);
  hmac.update(JSON.stringify(data));

  const signature = hmac.hex();

  return signature;
};
