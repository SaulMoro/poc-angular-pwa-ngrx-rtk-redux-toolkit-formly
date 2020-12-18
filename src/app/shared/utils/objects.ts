export const isString = (arg: any) => {
  return typeof arg === 'string';
};

export const isObject = (arg: any) => {
  return arg && typeof arg === 'object';
};

export const isEqual = (o1: any, o2: any) => {
  if (o1?.constructor === Array && o2?.constructor === Array && o1?.length !== o2?.length) {
    return false;
  }
  return o1 === o2 || JSON.stringify(o1) === JSON.stringify(o2);
};

export function argumentsStringifyComparer(): any {
  let currentJson = '';
  return (incoming: any, current: any) => {
    if (incoming === current) {
      return true;
    }

    const incomingJson = JSON.stringify(incoming);
    if (currentJson !== incomingJson) {
      currentJson = incomingJson;
      return false;
    }

    return true;
  };
}
