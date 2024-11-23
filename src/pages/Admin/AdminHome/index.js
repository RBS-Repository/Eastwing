import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Button, Flex, Divider } from "@chakra-ui/react";
import "./AdminHome.css";

function AdminHome() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link active">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link">Products</Link></li>
        </ul>
      </nav>

      <Flex className="content-wrapper">
        <Box className="admin-panel">
          <Text className="welcome-text">
            Welcome Admin
          </Text>
          <Divider className="divider" />

          <div className="admin-options">
            <div className="option-card">
              <Text className="option-text">View and manage orders</Text>
              <Link to="/admin/orders">
                <Button className="admin-button">
                  Orders
                </Button>
              </Link>
            </div>

            <div className="option-card">
              <Text className="option-text">Browse all products</Text>
              <Link to="/admin/products">
                <Button className="admin-button">
                  Products
                </Button>
              </Link>
            </div>

            <div className="option-card">
              <Text className="option-text">Edit or remove existing products</Text>
              <Link to="/admin/products">
                <Button className="admin-button">
                  Edit or Delete
                </Button>
              </Link>
            </div>

            <div className="option-card">
              <Text className="option-text">Add new products to inventory</Text>
              <Link to="/admin/products/new">
                <Button className="admin-button">
                  New Products
                </Button>
              </Link>
            </div>
          </div>
        </Box>
      </Flex>
    </div>
  );
}

export default AdminHome;
