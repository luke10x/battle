import { Face } from '../state';

export const generateRandom = (): Face => {
  return Math.ceil(Math.random() * 6) as Face;
};
