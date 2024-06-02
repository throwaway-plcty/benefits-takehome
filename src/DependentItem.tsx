import { Button, Space, Spin, Typography } from 'antd';
import { Dependent, Relationship } from './useDependentsBenefits';
import * as React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import useNotification from 'antd/es/notification/useNotification';

type Props = {
  dependent: Dependent;
  removeDependent(
    dependent: Dependent,
    successCallback?: () => void
  ): Promise<void>;
  cost: number;
};

export const DependentItem = ({ dependent, removeDependent, cost }: Props) => {
  const [deleting, setDeleting] = React.useState(false);
  const [notification] = useNotification();
  const onDelete = async () => {
    setDeleting(true);
    try {
      await removeDependent(dependent, () => setDeleting(false));
    } catch (e: any) {
      notification.error({
        message: e?.message || 'Something went wrong. Please try again later',
      });
      setDeleting(false);
    }
  };
  return (
    <Space direction='horizontal' key={dependent.id}>
      <Typography.Text>{`${dependent.firstName} ${dependent.lastName} - ${dependent.relationship}`}</Typography.Text>
      {cost ? <Typography.Text>{`- cost $${cost}`}</Typography.Text> : <Spin />}
      <Button
        size='small'
        onClick={onDelete}
        loading={deleting}
        disabled={dependent.relationship === Relationship.employee}
        danger
        icon={<DeleteOutlined size={10} />}
      />
    </Space>
  );
};
