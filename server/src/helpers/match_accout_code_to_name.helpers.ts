import banks from '@constants/opay_supported_banks.constants.json';
import squadBanks from '@constants/squad_supported_banks.constants.json';

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

interface SquadJsonObject {
  id: number;
  code: string;
  name: string;
  shortName: string;
  shortCode: string;
}

function findObjectByName(jsonArray: SquadJsonObject[], name: string): SquadJsonObject | null {
  const result = jsonArray.find((obj) => obj.name === name);
  return result || null;
}

export const findBankByName = (name: string) => {
  const result = findObjectByName(squadBanks.banks, name);
  return result;
};
