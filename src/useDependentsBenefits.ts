import * as React from 'react';
import { http } from './http';

export enum Relationship {
  child = 'Child',
  spouse = 'Spouse',
}

export type Dependent = {
  firstName: string;
  lastName: string;
  relationship: Relationship;
  id: string;
};

export const useDependentBenefits = () => {
  const [dependents, setDependents] = React.useState<Dependent[]>([]);
  const addDependent = (dependent: Dependent) =>
    setDependents((existing) => [...existing, dependent]);

  const removeDependent = async (
    dependent: Dependent,
    successCallback?: () => void
  ) => {
    return http.removeDependent(dependent).then(() => {
      successCallback?.();
      setDependents((existingDependents) => {
        return existingDependents.filter(
          (existingDep) => existingDep.id !== dependent.id
        );
      });
    });
  };

  return { dependents, addDependent, removeDependent };
};
