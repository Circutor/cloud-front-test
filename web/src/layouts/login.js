import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Flex, Space } from 'antd';
import { LoginUser } from '../api/auth';
import { useState } from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function LayoutLogin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const redirectToRegister = () => {
    navigate('/register');
  };

  const onFinish = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    LoginUser(email, password).then((data) => {
      setLoading(true);
      const { status } = data;
      if (data) {
        setLoading(false);
        if (status !== 200) {
          setShowError(true);
          data.json().then(({ message }) => setErrorMessage(message));
          setTimeout(() => setShowError(false), 1500);
          return;
        }
        if (data.token === null) {
          navigate('/register');
        } else {
          localStorage.setItem('test-token', data.Token);
          localStorage.setItem('email', data.Email);
          navigate('/buildings');
        }
      }
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Title style={{ color: '#fff', margin: 0 }} level={3}>
          My Buildings
        </Title>
        <Button
          type='link'
          onClick={redirectToRegister}
          style={{ color: '#fff', float: 'right' }}
        >
          Register
        </Button>
      </Header>
      <Content
        style={{
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Flex vertical style={{ position: 'relative' }}>
          {showError && (
            <Alert
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
              }}
              showIcon
              type='error'
              message={errorMessage}
              closable
            />
          )}
          <Form
            form={form}
            name='login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
          >
            <Title level={2}>Login</Title>
            <Form.Item
              name='email'
              type='email'
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Content>
    </Layout>
  );
}
