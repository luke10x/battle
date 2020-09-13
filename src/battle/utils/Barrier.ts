export const barrier = (): [() => Promise<void>, () => Promise<void>] => {
  let release: (value?: void | PromiseLike<void> | undefined) => void;
  return [
    (): Promise<void> => new Promise((resolve) => (release = resolve)),
    (): Promise<void> => (release?.() as unknown) as Promise<void>,
  ];
}
