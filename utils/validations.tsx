export function ValidateEmail(mail: string): boolean {
  const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (mail?.match(reg)) {
    return true;
  }
  return false;
}

export function ValidateName(name: string): boolean {
  return name.length > 2;
}

export function validatePassword(password: string): boolean {
  if (!password) {
    return false;
  } else if (password.length < 8) {
    return false;
  } else {
    return true;
  }
}
