import { Badge, Button, Divider, Drawer, Flex, Space, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import * as React from 'react';
import { DependentForm, FormType } from './DependentForm';
import { useDependentBenefits } from './useDependentsBenefits';
import { DependentList } from './DependentList';
import { BenefitsCost } from './BenefitsCost';

export const BenefitsSummary = () => {
  const [drawerState, setDrawerState] = React.useState<{
    open: boolean;
    type: FormType;
    initialData?: { [key: string]: any };
  }>({ open: false, type: FormType.create });
  const {
    dependents,
    addDependent,
    removeDependent,
    loading,
    costBreakdown,
    editDependent,
  } = useDependentBenefits();
  const closeDrawer = () =>
    setDrawerState((existingDrawerState) => ({
      ...existingDrawerState,
      open: false,
    }));
  const openDrawer = (type: FormType, initialData?: { [key: string]: any }) =>
    setDrawerState({ open: true, type, initialData });

  return (
    <Flex
      justify='center'
      align='center'
      style={{ height: '100%', width: '100%' }}
    >
      <Flex align='center' gap='middle' vertical>
        <Typography.Title level={2}>Benefits Summary</Typography.Title>
        <BenefitsCost costBreakdown={costBreakdown} loading={loading} />
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
          openDrawer={openDrawer}
          loading={loading}
          costBreakdown={costBreakdown}
        />
        <Button
          icon={<UserAddOutlined />}
          type='dashed'
          onClick={() => openDrawer(FormType.create)}
        >
          Add Dependent
        </Button>
      </Flex>
      <Drawer
        width='400px'
        title={drawerState.type}
        open={drawerState.open}
        onClose={closeDrawer}
        destroyOnClose
      >
        <DependentForm
          formType={drawerState.type}
          dependents={dependents}
          initialData={drawerState.initialData}
          closeDrawer={closeDrawer}
          addDependent={addDependent}
          editDependent={editDependent}
        />
      </Drawer>
    </Flex>
  );
};
