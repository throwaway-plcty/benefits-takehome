import * as React from 'react';
import { Breakdown, http } from './http';

export enum Relationship {
  child = 'Child',
  spouse = 'Spouse',
  employee = 'Employee',
}

export type Dependent = {
  firstName: string;
  lastName: string;
  relationship: Relationship;
  id: string;
};

export const useDependentBenefits = () => {
  const [dependents, setDependents] = React.useState<Dependent[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [costBreakdown, setCostBreakdown] = React.useState<Breakdown | null>(
    null
  );

  React.useEffect(() => {
    setLoading(true);
    Promise.all([
      http.getDependents().then((dependents) => {
        setDependents(dependents);
      }),
      http.getCosts().then((breakdown) => setCostBreakdown(breakdown)),
    ]).then(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    http.getCosts().then((breakdown) => {
      setCostBreakdown(breakdown);
      setLoading(false);
    });
  }, [dependents]);

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

  const addDependent = (
    dependent: Omit<Dependent, 'id'>,
    successCallback?: () => void
  ) =>
    http.addDependent(dependent).then((depToAdd) => {
      successCallback?.();
      setDependents((existing) => [...existing, depToAdd]);
    });

  const editDependent = (
    dependent: Dependent,
    successCallback?: () => void
  ) => {
    return http.editDependent(dependent).then((updatedDependents) => {
      successCallback?.();
      setDependents(updatedDependents);
    });
  };

  return {
    dependents,
    addDependent,
    removeDependent,
    loading,
    costBreakdown,
    editDependent,
  };
};
