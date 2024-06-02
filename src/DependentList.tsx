import { Skeleton } from 'antd';
import { Dependent } from './useDependentsBenefits';
import { DependentItem } from './DependentItem';
import { Breakdown } from './http';
import { FormType } from './DependentForm';

type Props = {
  dependents: Dependent[];
  loading: boolean;
  removeDependent(
    dependent: Dependent,
    successCallback?: () => void
  ): Promise<void>;
  costBreakdown: Breakdown | null;
  openDrawer: (type: FormType, initialData?: { [key: string]: any }) => void;
};
export const DependentList = ({
  dependents,
  loading,
  removeDependent,
  costBreakdown,
  openDrawer,
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
          openDrawer={openDrawer}
          cost={getDependentCost(dependent.id, costBreakdown!)}
        />
      ))}
    </Skeleton>
  );
};

function getDependentCost(dependentId: string, costBreakdown: Breakdown) {
  return costBreakdown?.[dependentId];
}
