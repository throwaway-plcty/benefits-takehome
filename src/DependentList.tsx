import { Skeleton } from 'antd';
import { Dependent } from './useDependentsBenefits';
import { DependentItem } from './DependentItem';

type Props = {
  dependents: Dependent[];
  loading: boolean;

  removeDependent(
    dependent: Dependent,
    successCallback?: () => void
  ): Promise<void>;
};
export const DependentList = ({
  dependents,
  loading,
  removeDependent,
}: Props) => {
  return (
    <Skeleton active paragraph={{ rows: 4 }} title={false} loading={loading}>
      {dependents.map((dependent) => (
        <DependentItem
          removeDependent={removeDependent}
          dependent={dependent}
        />
      ))}
    </Skeleton>
  );
};
