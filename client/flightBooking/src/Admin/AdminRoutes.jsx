// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import FlightManagement from "./pages/FlightManagement";
import BookingManagement from "./pages/BookingManagement";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="flights" element={<FlightManagement />} />
      <Route path="bookings" element={<BookingManagement />} />
    </Route>
  </Routes>
);

export default AdminRoutes;