import { Box, Text, Button, Center } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table, Popconfirm } from "antd";
import './AdminProducts.css';

function AdminProducts() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <div className="action-buttons">
            <Link to={`/admin/products/${record._id}`}>
              <Button className="edit-button">Edit</Button>
            </Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    alert("Product deleted");
                  },
                });
              }}
              onCancel={() => console.log("Canceled")}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete-button">Delete</Button>
            </Popconfirm>
          </div>
        ),
      },
    ];
  }, [deleteMutation]);
  
  

  if (isLoading) {
    return <div className="admin-container loading">Loading...</div>;
  }
  if (isError) {
    return <div className="admin-container error">Error: {error.message}</div>;
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link active">Products</Link></li>
        </ul>
      </nav>

      <Box className="products-content-wrapper">
        <Box className="products-table-container">
          <Box className="products-header">
            <Text className="page-title">Products</Text>
            <Link to="/admin/products/new">
              <Button className="new-product-button">New</Button>
            </Link>
          </Box>

          <Table dataSource={data} columns={columns} rowKey="_id" className="products-table" />
        </Box>
      </Box>
    </div>
  );
}

export default AdminProducts;
