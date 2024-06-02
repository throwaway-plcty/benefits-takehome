import { Alert, Button, Form, FormProps, Input, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import * as React from 'react';
import { Dependent, Relationship } from './useDependentsBenefits';
import { http } from './http';

type Props = {
  addDependent(dependent: Dependent): void;
  closeDrawer(): void;
};

export const DependentForm = ({ addDependent, closeDrawer }: Props) => {
  const [networkError, setNetworkError] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const dropdownOptions = React.useMemo(() => {
    const options = Object.values(Relationship);
    return options.map<DefaultOptionType>((option) => ({
      label: option,
      value: option,
    }));
  }, []);

  const onFinish: FormProps<Dependent>['onFinish'] = async (data) => {
    setActive(true);
    try {
      const dependent = await http.addDependent(data);
      addDependent(dependent);
      setActive(false);
      closeDrawer();
    } catch {
      setNetworkError(true);
      setActive(false);
    }
  };
  return (
    <Form onFinish={onFinish}>
      {networkError && (
        <Alert
          message='Oops. Something went wrong. Wait some time and try again'
          type='error'
        />
      )}
      <Form.ErrorList />
      <Form.Item<Dependent>
        name='firstName'
        label='First Name'
        rules={[
          {
            required: true,
            message: 'First name is required',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Dependent>
        name='lastName'
        label='Last Name'
        rules={[
          {
            required: true,
            message: 'Last name is required',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Dependent>
        name='relationship'
        label='Relationship'
        rules={[
          {
            required: true,
            message: 'Relationship is required',
          },
        ]}
      >
        <Select defaultActiveFirstOption options={dropdownOptions} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={active} type='primary' htmlType='submit'>
          Add Dependent
        </Button>
      </Form.Item>
    </Form>
  );
};
