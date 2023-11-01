import { sendAcountCreatedMailTemplate } from '../../convert_from_mjml_to_html.service';
import { sendMail } from '../../send_mail.service';

export const sendAccountCreatedMail = async (receiver: string, name: string) => {
  const subject = 'Welcome to PayFlow';
  await sendMail(subject, sendAcountCreatedMailTemplate({ name }), receiver);
};
