// -----ERRORS-----
// password:
const PASSWORD_LENGTH = "The password must be at least 8 characters long";
const PASSWORD_CHARACTRES =
  "The password must contain an uppercase letter, a lowercase letter, a number and a special character";
const CONFIRM_PASSWORD = "The password and password verification must be equal";

export function CheckEmail(email: string) {
  // email length need to be at least 6 and "@" need to be in the email.
  if (email.trim().length < 6 || email.search("@") < 0) {
    return false;
  }
  return true;
}

export function CheckPassword(password: string) {
  const symbols = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/; // regex for allowed symbols
  if (
    password.trim().length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    symbols.test(password)
  ) {
    return true;
  }
  return false;
}

export function CheckConfirmPassword(password: string, confirmPassword: string) {
  return password === confirmPassword;
}

export function CheckAge(age: number) {
  return age > 0 && age <= 120;
}

export function CheckName(name: string) {
  const letters = /^[A-Za-z]+$/;
  if (name.match(letters)) return true;
  return false;
}
