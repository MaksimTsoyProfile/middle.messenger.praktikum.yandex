const validateName = (value: string): string =>
  /^[A-ZА-Я][a-zа-я-]*$/.test(value)
    ? ''
    : 'Имя должно начинаться с заглавной буквы и содержать только буквы и дефисы';

const validateLogin = (value: string): string =>
  /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/.test(value)
    ? ''
    : 'Логин должен содержать от 3 до 20 символов, состоять из латинских букв, цифр, дефисов и нижних подчеркиваний и начинаться с буквы';

const validateEmail = (value: string): string =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
    ? ''
    : 'Некорректный адрес электронной почты';

const validatePassword = (value: string): string =>
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)
    ? ''
    : 'Пароль должен содержать от 8 до 40 символов, включать хотя бы одну заглавную букву и одну цифру';

const validatePhone = (value: string): string =>
  /^\+?\d{10,15}$/.test(value) ? '' : 'Некорректный номер телефона';

const validateMessage = (value: string): string =>
  value.trim() !== '' ? '' : 'Сообщение не может быть пустым';

type FieldName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'oldPassword'
  | 'newPassword'
  | 'phone'
  | 'message'
  | 'title';

export const validate = (
  value: string,
  fieldName: FieldName | unknown,
): string => {
  if (!fieldName) return '';
  const errorByFieldName: Record<FieldName, string> = {
    first_name: validateName(value),
    second_name: validateName(value),
    login: validateLogin(value),
    email: validateEmail(value),
    password: validatePassword(value),
    oldPassword: validatePassword(value),
    newPassword: validatePassword(value),
    phone: validatePhone(value),
    message: validateMessage(value),
    title: validateMessage(value),
  };
  return errorByFieldName[fieldName as FieldName];
};
