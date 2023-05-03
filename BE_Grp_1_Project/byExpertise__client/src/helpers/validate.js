export const isNameValid = (name) => {
  return /^[A-Za-z]+$/.test(name);
};

export const isEmailValid = (email) => {
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
    email
  );
};

export const isPasswordValid = (password) => {
  return password.length >= 8;
};
