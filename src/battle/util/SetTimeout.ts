export const setTimeoutWrapper = (
  handler: () => void,
  timeout: number,
): number => {
  console.log('fake set titmeout');
  return setTimeout(handler, timeout);
};
