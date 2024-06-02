import { Skeleton } from 'antd';
import { Dependent } from './useDependentsBenefits';
import { DependentItem } from './DependentItem';
import { Breakdown } from './http';

type Props = {
  dependents: Dependent[];
  loading: boolean;
  removeDependent(
    dependent: Dependent,
    successCallback?: () => void
  ): Promise<void>;
  costBreakdown: Breakdown | null;
};
export const DependentList = ({
  dependents,
  loading,
  removeDependent,
  costBreakdown,
}: Props) => {
  return (
    <Skeleton
      active
      paragraph={{ rows: 4 }}
      title={false}
      loading={!dependents.length && loading}
    >
      {dependents.map((dependent) => (
        <DependentItem
          key={dependent.id}
          removeDependent={removeDependent}
          dependent={dependent}
          cost={getDependentCost(dependent.id, costBreakdown!)}
        />
      ))}
    </Skeleton>
  );
};

function getDependentCost(dependentId: string, costBreakdown: Breakdown) {
  return costBreakdown?.[dependentId];
}
