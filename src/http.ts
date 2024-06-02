import { Dependent } from './useDependentsBenefits';
import { v4 } from 'uuid';

const dependentsStorageKey = 'dependents-list';

const safeGetFromLocalStorage = <T>(key: string): T | null => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return null;
    }
  } catch {
    console.warn(`unable to get ${key} from local storage `);
    return null;
  }
};

export const http = {
  addDependent: (dependent: Omit<Dependent, 'id'>) => {
    //should make network call here
    const id = v4();
    const dependentWithId: Dependent = { ...dependent, id };
    const existingDependents =
      safeGetFromLocalStorage<Dependent[]>(dependentsStorageKey) || [];
    localStorage.setItem(
      dependentsStorageKey,
      JSON.stringify([...existingDependents, dependentWithId])
    );
    return new Promise<Dependent>((res) => {
      setTimeout(() => {
        res(dependentWithId);
      }, 1500);
    });
  },
  removeDependent: (dependent: Dependent) => {
    const existingDependents =
      safeGetFromLocalStorage<Dependent[]>(dependentsStorageKey) || [];
    localStorage.setItem(
      dependentsStorageKey,
      JSON.stringify(
        existingDependents.filter((existing) => existing.id !== dependent.id)
      )
    );
    return new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1500);
    });
  },
  getDependents: () => {
    const dependents =
      safeGetFromLocalStorage<Dependent[]>(dependentsStorageKey) || [];
    return new Promise<Dependent[]>((res) => {
      setTimeout(() => {
        res(dependents);
      }, 1500);
    });
  },
};
