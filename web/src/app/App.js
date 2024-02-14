import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutRegister from '../layouts/register';
import LoginPage from './pages/login';
import BuildingList from '../layouts/buildings_list';
import BuildingMetrics from '../layouts/buildings_metrics'
import BookmarksList from "../layouts/bookmarks_list";

import { ConfigProvider } from "antd";

const CustomAntdThemeExtention = {
  token: {
      borderRadius: 10,
      borderRadiusLG: 10,
      borderRadiusOuter: 10,
      borderRadiusSM: 10,
      borderRadiusXS: 10,
      colorPrimary: 'green',
  }
}


function App() {
  return (
    <ConfigProvider theme={CustomAntdThemeExtention}>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route path="/bookmarks" element={<BookmarksList />} />
          <Route path="/buildings" element={<BuildingList />} />
          <Route path="/buildings/:buildingId" element={<BuildingMetrics />} />
          <Route path="/register" element={<LayoutRegister />} />
          <Route path="home" element={<LayoutRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LayoutRegister />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App
