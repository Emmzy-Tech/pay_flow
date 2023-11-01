import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { resolve } from 'path';
import mjml2html = require('mjml');

const sendOtpMail = readFileSync(resolve(__dirname, './templates/auth/send_otp_mail.mjml')).toString();
const sendAvtivateAccountMail = readFileSync(resolve(__dirname, './templates/auth/activeate_account_mail.mjml')).toString();
const sendAccountCreatedMail = readFileSync(resolve(__dirname, './templates/auth/welcome_to_payflow_mail.mjml')).toString();

export const sendOtpMailTemplate = compile(mjml2html(sendOtpMail).html);
export const sendAvtivateAccountMailTemplate = compile(mjml2html(sendAvtivateAccountMail).html);
export const sendAcountCreatedMailTemplate = compile(mjml2html(sendAccountCreatedMail).html);
