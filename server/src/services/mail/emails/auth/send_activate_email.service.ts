import { sendAvtivateAccountMailTemplate } from '../../convert_from_mjml_to_html.service';
import { sendMail } from '../../send_mail.service';

export const sendActivateAccountMail = async (receiver: string, otp: string) => {
  const subject = 'Here is Your OTP';
  await sendMail(subject, sendAvtivateAccountMailTemplate({ otp }), receiver);
};
