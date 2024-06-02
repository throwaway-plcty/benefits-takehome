import { Button, Drawer, Flex, Space, Typography } from 'antd';
import * as React from 'react';
import { DependentForm } from './DependentForm';
import { useDependentBenefits } from './useDependentsBenefits';

export const BenefitsSummary = () => {
  const [open, setDrawerOpen] = React.useState(false);
  const { dependents, addDependent } = useDependentBenefits();
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
        <div>Placeholder for list of dependents</div>
        {dependents.map(({ firstName, lastName }) => (
          <div key={firstName}>{`${firstName} ${lastName}`}</div>
        ))}
        <Button type='dashed' onClick={openDrawer}>
          Add Dependent
        </Button>
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
        <DependentForm closeDrawer={closeDrawer} addDependent={addDependent} />
      </Drawer>
    </Flex>
  );
};
