import { Skeleton, Space, Typography } from 'antd';
import { Breakdown } from './http';

type Props = {
  costBreakdown: Breakdown | null;
  loading: boolean;
};
export const BenefitsCost = ({ costBreakdown, loading }: Props) => {
  if (loading || !costBreakdown) {
    return <Skeleton title={false} paragraph={{ rows: 3 }} active />;
  } else {
    const perPaycheckDeduction =
      costBreakdown.total / costBreakdown.numberOfPaychecks;
    return (
      <>
        <Space size='small' direction='horizontal'>
          <Typography.Text>Your yearly costs:</Typography.Text>
          <Typography.Text>${costBreakdown.total.toFixed(2)}</Typography.Text>
        </Space>
        <Space size='small' direction='horizontal'>
          <Typography.Text>Your monthly deduction:</Typography.Text>
          <Typography.Text>${perPaycheckDeduction.toFixed(2)}</Typography.Text>
        </Space>
        <Space size='small' direction='horizontal'>
          <Typography.Text>Your paycheck after deduction:</Typography.Text>
          <Typography.Text>
            ${(costBreakdown.paycheckAmount - perPaycheckDeduction).toFixed(2)}
          </Typography.Text>
        </Space>
      </>
    );
  }
};
