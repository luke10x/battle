export const setTimeoutWrapper = (
  handler: () => void,
  timeout: number,
): number => {
  console.log('fake set timeout');
  return setTimeout(handler, timeout);
};

export const afterRolled = (handler: () => void): number => {
  return setTimeout(handler, 1000);
};
