import { Badge, Button, Divider, Drawer, Flex, Space, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import * as React from 'react';
import { DependentForm } from './DependentForm';
import { useDependentBenefits } from './useDependentsBenefits';
import { DependentList } from './DependentList';

export const BenefitsSummary = () => {
  const [open, setDrawerOpen] = React.useState(false);
  const { dependents, addDependent, removeDependent, loading } =
    useDependentBenefits();
  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  return (
    <Flex
      justify='center'
      align='center'
      style={{ height: '100%', width: '100%' }}
    >
      <Flex align='center' gap='middle' vertical>
        <Typography.Title level={2}>Benefits Summary</Typography.Title>
        <div>Cost placeholder!</div>
        <Divider>
          <Space>
            <Typography.Text>Your Dependents</Typography.Text>
            <Badge
              style={{ backgroundColor: 'grey' }}
              count={dependents.length}
            />
          </Space>
        </Divider>
        <DependentList
          dependents={dependents}
          removeDependent={removeDependent}
          loading={loading}
        />
        <Button icon={<UserAddOutlined />} type='dashed' onClick={openDrawer}>
          Add Dependent
        </Button>
        <Divider>Submit your changes</Divider>
        <Space>
          <Button onClick={() => {}}>Cancel</Button>
          <Button type='primary' onClick={() => {}}>
            Finalize
          </Button>
        </Space>
      </Flex>
      <Drawer
        width='400px'
        title='Add a dependent'
        open={open}
        onClose={closeDrawer}
        destroyOnClose
      >
        <DependentForm
          dependents={dependents}
          closeDrawer={closeDrawer}
          addDependent={addDependent}
        />
      </Drawer>
    </Flex>
  );
};
