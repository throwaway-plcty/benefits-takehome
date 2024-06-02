import { Alert, Button, Form, FormProps, Input, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import * as React from 'react';
import { Dependent, Relationship } from './useDependentsBenefits';

export enum FormType {
  create = 'add a dependent',
  edit = 'edit a dependent',
}

type Props = {
  addDependent(
    dependent: Omit<Dependent, 'id'>,
    successCallback?: () => void
  ): Promise<void>;
  dependents: Dependent[];
  closeDrawer(): void;
  formType: FormType;
  initialData?: { [key: string]: any };
  editDependent(
    dependent: Dependent,
    successCallback?: () => void
  ): Promise<void>;
};

type DependentFormData = Omit<Dependent, 'id'>;

export const DependentForm = ({
  addDependent,
  closeDrawer,
  dependents,
  formType,
  initialData,
  editDependent,
}: Props) => {
  const [networkError, setNetworkError] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const isCreateForm = formType === FormType.create;

  const dropdownOptions = React.useMemo(() => {
    const options = Object.values(Relationship);
    return options.map<DefaultOptionType>((option) => ({
      label: option,
      value: option,
    }));
  }, []);

  const onAddDependent: FormProps<DependentFormData>['onFinish'] = async (
    data
  ) => {
    setActive(true);
    try {
      await addDependent(data, () => {
        setActive(false);
        closeDrawer();
      });
    } catch {
      setNetworkError(true);
      setActive(false);
    }
  };

  const onEditDependent: FormProps<Dependent>['onFinish'] = async (data) => {
    setActive(true);
    try {
      await editDependent({ ...initialData, ...data }, () => {
        setActive(false);
        closeDrawer();
      });
    } catch {
      setNetworkError(true);
      setActive(false);
    }
  };
  return (
    <Form
      onFinish={isCreateForm ? onAddDependent : onEditDependent}
      initialValues={isCreateForm ? undefined : initialData}
    >
      {networkError && (
        <Alert
          message='Oops. Something went wrong. Wait some time and try again'
          type='error'
        />
      )}
      <Form.Item<DependentFormData>
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
      <Form.Item<DependentFormData>
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
      <Form.Item<DependentFormData>
        name='relationship'
        label='Relationship'
        rules={[
          {
            required: true,
            validator(_, value) {
              if (
                !isCreateForm &&
                initialData?.relationship === Relationship.employee &&
                value === Relationship.employee
              ) {
                return Promise.resolve();
              }
              if (
                !isCreateForm &&
                initialData?.relationship === Relationship.employee &&
                value !== Relationship.employee
              ) {
                return Promise.reject(
                  'You cannot change the relationship of an employee user'
                );
              }
              if (
                !dependents.some(
                  (dep) => dep.relationship === Relationship.employee
                ) &&
                value !== Relationship.employee
              ) {
                return Promise.reject('Employee user must be added first');
              }
              if (
                dependents.some(
                  (dep) => dep.relationship === Relationship.employee
                ) &&
                value === Relationship.employee
              ) {
                return Promise.reject('Only one Employee can be added');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Select defaultActiveFirstOption options={dropdownOptions} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={active} type='primary' htmlType='submit'>
          {isCreateForm ? 'Add Dependent' : 'Edit Dependent'}
        </Button>
      </Form.Item>
    </Form>
  );
};
