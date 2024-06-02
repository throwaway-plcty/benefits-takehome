import { Button, Flex, Space, Typography } from 'antd';

export const BenefitsSummary = () => {
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
        <Button type='dashed' onClick={() => {}}>
          Add Dependent
        </Button>
        <Space>
          <Button onClick={() => {}}>Cancel</Button>
          <Button type='primary' onClick={() => {}}>
            Finalize
          </Button>
        </Space>
      </Flex>
    </Flex>
  );
};
