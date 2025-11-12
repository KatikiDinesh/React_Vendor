import React, { useEffect, useState } from "react";
import { API_URL } from "../helpers/ApiPath";


export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const firmId = localStorage.getItem("firmId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/order/vendor/${firmId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.log("Error fetching vendor orders:", error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`${API_URL}/order/status/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (error) {
      console.log("status update error", error);
    }
  };

  return (
    <div className="vendor-orders-container">
      <h2>Incoming Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        orders.map((order) => {
          const status = order.status?.toLowerCase();
          const isCompleted = status === "completed" || status === "delivered";
          const isCancelled = status === "cancelled";

          return (
            <div
              key={order._id}
              className={`vendor-order-card ${
                isCompleted ? "completed" : isCancelled ? "cancelled" : ""
              }`}
            >
              <div className="order-header">
                <h4>Order ID: {order._id}</h4>
                {isCompleted && <span className="tick">✔️</span>}
              </div>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    isCompleted
                      ? "status-completed"
                      : isCancelled
                      ? "status-cancelled"
                      : "status-default"
                  }
                >
                  {order.status}
                </span>
              </p>

              <p>
                <b>Total:</b> ₹{order.totalAmount}
              </p>
              <p>
                <b>Address:</b> {order.address}
              </p>

              <h4>Items:</h4>
              {order.products.map((p) => (
                <p key={p.productId?._id}>
                  {p.productId?.productName} × {p.quantity}
                </p>
              ))}

              {!isCompleted && !isCancelled && (
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="status-dropdown"
                >
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Preparing</option>
                  <option>Out for delivery</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
