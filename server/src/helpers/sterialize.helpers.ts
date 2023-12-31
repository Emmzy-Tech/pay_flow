import { IUser } from '@/models/interfaces';

export const sterilizeUser = (user: IUser) => {
  if (!user) return {};

  const {
    firstName,
    lastName,
    otherName,
    pics,
    email,
    emailVerified,
    companyName,
    taxId,
    taxNo,
    createdAt,
    officeAddr,
    position,
    accountDisabled,
    licenseNo,
    startDate,
    balance,
    bank,
    accNo,
    lastTransactionRef,
  } = user;

  return {
    firstName,
    lastName,
    otherName,
    email,
    pics,
    emailVerified,
    companyName,
    taxId,
    taxNo,
    officeAddr,
    position,
    balance,
    bank,
    accNo,
    lastTransactionRef,
    accountDisabled,
    licenseNo,
    startDate,
    createdAt,
  };
};
