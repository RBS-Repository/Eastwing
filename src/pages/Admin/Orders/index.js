import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Center,
  Spinner
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
import './Orders.css';  // Make sure this import is here

function Orders() {
  const { isLoading, isError, data, error } = useQuery("admin:orders", fetchOrders);

  if (isLoading) {
    return (
      <div className="admin-container">
        <Center><Spinner size="xl" color="#ff4444" /></Center>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="admin-container">
        <Text color="red.500">Error: {error.message}</Text>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link active">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link">Products</Link></li>
        </ul>
      </nav>

      <Box className="orders-content-wrapper">
        <Box className="orders-table-container">
          <Text className="page-title">Orders</Text>

          {!data || data.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">📦</div>
              <Text className="no-orders-text">No orders available</Text>
              <Text className="no-orders-subtext">Orders will appear here once customers make purchases</Text>
            </div>
          ) : (
            <Table variant="simple" className="admin-table">
              <TableCaption>Orders Overview</TableCaption>
              <Thead>
                <Tr>
                  <Th>Users</Th>
                  <Th>Address</Th>
                  <Th>Items</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.user?.email || "No Name"}</Td>
                    <Td>{item.address || "No address available"}</Td>
                    <Td isNumeric>{item.items.length}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Orders;
