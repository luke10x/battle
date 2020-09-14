export const untilDiceRolled = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const untilFaceTurned = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
};
