export const isString = (arg: any) => {
  return typeof arg === 'string';
};

export const isObject = (arg: any) => {
  return arg && typeof arg === 'object';
};

export const isEqual = (o1: any, o2: any) => {
  if (o1.constructor === Array && o2.constructor === Array && o1.length !== o2.length) {
    return false;
  }
  return o1 === o2 || JSON.stringify(o1) === JSON.stringify(o2);
};
