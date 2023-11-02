export const isSuccessfulRes = (response: any) => {
  console.info(`New Response - [${response.status}]status, message: ${response.data.message}`);

  if (`${response.status}`.startsWith('2') && response.data.status) return true;

  return false;
};

export const isFailedRes = (response: any) => {
  console.info(`New Response - [${response.status}]status, message: ${response.data.message}`);

  if ((`${response.status}`.startsWith('4') || `${response.status}`.startsWith('5')) && !response.data.status) return true;

  return false;
};
