import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Admin = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch admin dashboard data from WooCommerce API
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulated data - replace with actual API calls
        setStats({
          totalSales: 12500.0,
          totalOrders: 156,
          activeUsers: 89,
          pendingOrders: 12,
        });
        setRecentOrders([
          {
            id: "ORD001",
            customer: "John Doe",
            amount: 99.99,
            status: "Completed",
            date: "2024-03-15",
          },
          {
            id: "ORD002",
            customer: "Jane Smith",
            amount: 149.99,
            status: "Pending",
            date: "2024-03-15",
          },
          {
            id: "ORD003",
            customer: "Mike Johnson",
            amount: 199.99,
            status: "Processing",
            date: "2024-03-14",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // TODO: Implement order status update with WooCommerce API
      console.log(`Updating order ${orderId} to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {currentUser?.displayName || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            ${stats.totalSales.toFixed(2)}
          </p>
          <div className="mt-2">
            <span className="text-green-600 text-sm">
              ↑ 12% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalOrders}
          </p>
          <div className="mt-2">
            <span className="text-green-600 text-sm">↑ 8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.activeUsers}
          </p>
          <div className="mt-2">
            <span className="text-green-600 text-sm">↑ 5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.pendingOrders}
          </p>
          <div className="mt-2">
            <span className="text-red-600 text-sm">↑ 3% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      className="text-sm border-gray-300 rounded-md"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add New Package
          </h3>
          <form className="space-y-4">
            <Input
              label="Package Name"
              type="text"
              placeholder="Enter package name"
            />
            <Input label="Price" type="number" placeholder="Enter price" />
            <Input
              label="Credits"
              type="number"
              placeholder="Enter number of credits"
            />
            <Button variant="primary" fullWidth>
              Add Package
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">WooCommerce API</span>
              <span className="text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Gateway</span>
              <span className="text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-600">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
