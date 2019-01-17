export function validate(location, params) {
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const param = params[key];
    if (param == null) {
      console.error('Error at ', location, ': ', param, ' is null ');
      return false;
    }

    if (typeof param === 'string' && param === '') {
      console.error('Error at ', location, ': ', param, ' is empty ');
      return false;
    }
  }

  return true;
}

export default { validate };