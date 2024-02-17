import { ConfigProvider } from 'antd';

export const Providers = ({ children }) => (
  <ConfigProvider theme={{ token: { colorPrimary: '52a447' } }}>
    {children}
  </ConfigProvider>
);
