
// pages/AdminDashboard.jsx
const AdminDashboard = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">Total Users: 120</div>
          <div className="bg-white p-6 rounded shadow">Flights: 45</div>
          <div className="bg-white p-6 rounded shadow">Bookings: 320</div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  