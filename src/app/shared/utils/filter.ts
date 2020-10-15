const matchObject = (object, query, includes = false): boolean =>
  object.constructor !== Object && object.constructor !== Array
    ? includes && typeof object === 'string'
      ? String(object.toLowerCase()).includes(query.toLowerCase())
      : object === query
    : object.constructor === Array
    ? query.every((objQuery) => object.includes(objQuery))
    : query.constructor === Array
    ? query.some((objQuery) => matchObject(object, objQuery, includes))
    : Object.entries(query).every(
        ([key, value]) => !value || (object[key] && matchObject(object[key], value, includes))
      );

export function filterData<T>(data: T[], query): T[] {
  return data.filter((item) => matchObject(item, query));
}

export function filterContainsData<T>(data: T[], query): T[] {
  return data.filter((item) => matchObject(item, query, true));
}
