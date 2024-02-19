import { Routes, Route } from "react-router-dom";

import { Redirect, RouteGuard } from '../components'

import LayoutRegister from '../layouts/register';
import LayoutLogin from '../layouts/login';
import BuildingList from '../layouts/buildings_list';
import BuildingMetrics from '../layouts/buildings_metrics'
import BookmarksList from "../layouts/bookmarks_list";


function App() {
  return (
    <Routes>
      <Route path="/bookmarks" element={<RouteGuard redirectTo="/login"><BookmarksList /></RouteGuard>} />
      <Route path="/buildings" element={<RouteGuard redirectTo="/login"><BuildingList /></RouteGuard>} />
      <Route path="/buildings/:buildingId" element={<RouteGuard redirectTo="/login"><BuildingMetrics /></RouteGuard>} />
      <Route path="/register" element={<LayoutRegister />} />
      <Route path="home" element={<LayoutRegister />} />
      <Route path="/login" element={<LayoutLogin />} />
      <Route path="/" element={<LayoutRegister />} />
    </Routes>
  );
}

export default App
