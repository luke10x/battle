export const setTimeoutWrapper = (
  handler: () => void,
  timeout: number,
): number => {
  console.log('fake set timeout');
  return setTimeout(handler, timeout);
};

export const untilDiceRolled = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
