import { Face } from '../state';

export const generateRandom = (): Face => {
  return (Math.floor(Math.random() * 6) + 1) as Face;
};
