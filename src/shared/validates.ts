export const validateName = (value: string) =>
  /^[A-ZА-Я][a-zа-я-]*$/.test(value);

export const validateLogin = (value: string) =>
  /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/.test(value);

export const validateEmail = (value: string) =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);

export const validatePassword = (value: string) =>
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);

export const validatePhone = (value: string) => /^\+?\d{10,15}$/.test(value);

export const validateMessage = (value: string) => value.trim() !== '';
