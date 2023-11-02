export const appInDevMode = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

export const appInProdMode = () => {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }
  return false;
};

export * from './generate_random_nums.utils';
export * from './compare_and_validate.utils';
export * from './temp_store.utils';
