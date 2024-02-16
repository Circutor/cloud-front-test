import { Input as AntInput } from 'antd';
import styled from 'styled-components';

const Input = styled(AntInput)`
  border-radius: 50px;
`;

const InputPassword = styled(AntInput.Password)`
  border-radius: 50px;
`;

export const Styled = { Input, InputPassword };
