import { createHmac } from 'crypto';

export const toHmac = (data: any, secretKey: string): string => {
  const sortedKeys = Object.keys(data).sort();
  const payloadString = sortedKeys.map((key) => `${key}=${data[key]}`).join('&');

  const hmac = createHmac('sha512', secretKey);
  hmac.update(payloadString);

  const signature = hmac.digest('hex');

  return signature;
};
