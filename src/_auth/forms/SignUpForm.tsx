import { Button } from 'views/Elements/Button/Button';
import { Input } from 'views/Elements/Input/Input';

export const SignUpForm = () => {
  return (
    <>
      <Input
        onChange={() => {
          throw new Error('Function not implemented.');
        }}
        value=""
        placeholder="Name"
      />
      <Button>SignUpForm</Button>
    </>
  );
};
