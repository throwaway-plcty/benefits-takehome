import { Dependent } from './useDependentsBenefits';

type Props = {
  dependent: Dependent;
};

export const DependentItem = ({ dependent }: Props) => {
  return (
    <div
      key={`${dependent.firstName}-${dependent.lastName}`}
    >{`${dependent.firstName} ${dependent.lastName}`}</div>
  );
};
