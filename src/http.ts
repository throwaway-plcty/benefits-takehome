import { Dependent } from './useDependentsBenefits';
import { v4 } from 'uuid';

export const http = {
  addDependent: (dependent: Omit<Dependent, 'id'>) => {
    //should make network call here
    return new Promise<Dependent>((res) => {
      setTimeout(() => {
        res({ ...dependent, id: v4() });
      }, 1500);
    });
  },
  removeDependent: (_dependent: Dependent) => {
    return new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1500);
    });
  },
};
