import banks from '@constants/opay_supported_banks.constants.json';

interface JsonObject {
  code: string;
  altCode: string;
  name: string;
  type: string;
  icon: string;
  subscriptIcon: string | null;
  color: string | null;
  isSupportBankAccount: boolean;
  opayBank: string | null;
}

function findObjectByName(jsonArray: JsonObject[], name: string): JsonObject | null {
  const result = jsonArray.find((obj) => obj.name === name);
  return result || null;
}

export const findBankByName = (name: string) => {
  const result = findObjectByName(banks.data, name);
  return result;
};
