import { Dependent } from './useDependentsBenefits';

export const http = {
  addDependent: (dependent: Dependent) => {
    //should make network call here
    return new Promise<Dependent>((res) => {
      setTimeout(() => {
        res(dependent);
      }, 1500);
    });
  },
};
