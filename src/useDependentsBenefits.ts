import * as React from 'react';

export enum Relationship {
  child = 'Child',
  spouse = 'Spouse',
}

export type Dependent = {
  firstName: string;
  lastName: string;
  relationship: Relationship;
};

export const useDependentBenefits = () => {
  const [dependents, setDependents] = React.useState<Dependent[]>([]);
  const addDependent = (dependent: Dependent) =>
    setDependents((existing) => [...existing, dependent]);

  return { dependents, addDependent };
};
