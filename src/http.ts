import { Dependent, Relationship } from './useDependentsBenefits';
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

export type Breakdown = { [key: string]: number } & {
  total: number;
  paycheckAmount: number;
  numberOfPaychecks: 26;
};

const EMPLOYEE_COST = 1000;
const CHILD_COST = 500;
const SPOUSE_COST = 500;
const STARTING_WITH_LETTER = 'A';
const NUMBER_OF_PAYCHECKS = 26;
const PAYCHECK_AMOUNT = 2000;
const DISCOUNT_AMOUNT = 0.9;

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
  editDependent: (dependent: Dependent) => {
    const dependents =
      safeGetFromLocalStorage<Dependent[]>(dependentsStorageKey) || [];
    const index = dependents.findIndex(
      (existing) => existing.id === dependent.id
    );
    if (index >= 0) {
      dependents.splice(index, 1, dependent);
      localStorage.setItem(dependentsStorageKey, JSON.stringify(dependents));
    }
    return new Promise<Dependent[]>((res) => {
      setTimeout(() => {
        res(dependents);
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
  getCosts: () => {
    const calculateCost = (person: Dependent) => {
      const getPreDiscountTotal = () => {
        if (person.relationship === Relationship.employee) {
          return EMPLOYEE_COST;
        }
        if (person.relationship === Relationship.spouse) {
          return SPOUSE_COST;
        }
        return CHILD_COST;
      };

      const cost = getPreDiscountTotal();
      return person.firstName
        .toLowerCase()
        .startsWith(STARTING_WITH_LETTER.toLowerCase())
        ? cost * DISCOUNT_AMOUNT
        : cost;
    };
    const perDependentCost: { [key: string]: number } = {};

    const dependents =
      safeGetFromLocalStorage<Dependent[]>(dependentsStorageKey) || [];

    dependents.forEach(
      (dependent) => (perDependentCost[dependent.id] = calculateCost(dependent))
    );

    const total = Object.values(perDependentCost).reduce(
      (sum, next) => sum + next,
      0
    );

    const breakdown: Breakdown = {
      ...perDependentCost,
      total,
      numberOfPaychecks: NUMBER_OF_PAYCHECKS,
      paycheckAmount: PAYCHECK_AMOUNT,
    };

    return new Promise<Breakdown>((res) => {
      setTimeout(() => {
        res(breakdown);
      }, 1500);
    });
  },
};
