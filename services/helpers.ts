export const parseClientMessage = (errorObj: {
  [key: string]: string[];
}): string[] => {
  const result: string[] = [];
  for (const key in errorObj) {
    if (errorObj.hasOwnProperty(key)) {
      result.push(...errorObj[key]);
    }
  }

  return result;
};
