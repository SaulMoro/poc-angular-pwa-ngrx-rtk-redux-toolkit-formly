const PHONE = /^[0-9]{9}$/;
const PHONE_WITH_PREFIX = /^(\+[0-9]{1,4}\s){0,1}[0-9]{9}$/;

export const ValidatePhone = (phone: string, withPrefix: boolean) =>
  withPrefix ? PHONE_WITH_PREFIX.test(phone) : PHONE.test(phone);
