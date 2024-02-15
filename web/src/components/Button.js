import { Button as AntButton } from 'antd';

export const Button = ({ children, ...props }) => {
  return (
    <AntButton {...props} style={{ borderRadius: '20px' }}>
      {children}
    </AntButton>
  );
};
