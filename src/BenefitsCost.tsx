import { Skeleton, Space, Typography } from 'antd';
import { Breakdown } from './http';

type Props = {
  costBreakdown: Breakdown | null;
  loading: boolean;
};
export const BenefitsCost = ({ costBreakdown, loading }: Props) => {
  if (loading) {
    return <Skeleton.Input size='small' active />;
  } else {
    return (
      <Space direction='horizontal'>
        <Typography.Text>Your costs:</Typography.Text>
        <Typography.Text>${costBreakdown?.total}</Typography.Text>
      </Space>
    );
  }
};
