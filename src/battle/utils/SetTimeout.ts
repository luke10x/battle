export const setTimeoutWrapper = (
  handler: () => void,
  timeout: number,
): number => {
  console.log('fake set timeout');
  return setTimeout(handler, timeout);
};
