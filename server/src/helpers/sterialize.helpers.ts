import { IUser } from '@/models/interfaces';

export const sterilizeUser = (user: IUser) => {
  if (!user) return {};

  const {
    firstName,
    lastName,
    otherName,
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
  } = user;

  return {
    firstName,
    lastName,
    otherName,
    email,
    emailVerified,
    companyName,
    taxId,
    taxNo,
    taxOfficeAddr,
    officeAddr,
    position,
    accountDisabled,
    licenseNo,
    startDate,
    createdAt,
  };
};
