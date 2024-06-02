import { Skeleton } from 'antd';
import { Dependent } from './useDependentsBenefits';
import { DependentItem } from './DependentItem';

type Props = {
  dependents: Dependent[];
  loading: boolean;
};
export const DependentList = ({ dependents, loading }: Props) => {
  return (
    <Skeleton active paragraph={{ rows: 4 }} title={false} loading={loading}>
      {dependents.map((dependent) => (
        <DependentItem dependent={dependent} />
      ))}
    </Skeleton>
  );
};
