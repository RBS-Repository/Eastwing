import React from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import { Box, FormControl, FormLabel, Text, Input, Textarea, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { message } from "antd";
import "./AdminProductDetail.css";

function AdminProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="admin-container">
        <div className="error">Error {error.message}</div>
      </div>
    );
  }

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading... ", key: "product_update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "The product successfully updated",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error("The product was not updated.");
    }
  };

  return (
    <div className="admin-container admin-home">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link active">Products</Link></li>
        </ul>
      </nav>

      <Box className="product-detail-wrapper">
        <Box className="product-form-container">
          <Text className="page-title">Edit Product</Text>
          
          <Formik
            initialValues={{
              title: data.title,
              description: data.description,
              price: data.price,
              photos: data.photos,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              isSubmitting,
            }) => (
              <Box as="form" onSubmit={handleSubmit} className="form-content">
                <FormControl isInvalid={touched.title && errors.title} className="form-group">
                  <FormLabel htmlFor="title" className="form-label">Title</FormLabel>
                  <Input
                    id="title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    disabled={isSubmitting}
                    className="form-input"
                  />
                  {touched.title && errors.title && (
                    <Text className="error-text">{errors.title}</Text>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.description && errors.description} className="form-group">
                  <FormLabel htmlFor="description" className="form-label">Description</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    className="form-textarea"
                  />
                  {touched.description && errors.description && (
                    <Text className="error-text">{errors.description}</Text>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.price && errors.price} className="form-group">
                  <FormLabel htmlFor="price" className="form-label">Price</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={isSubmitting}
                    className="form-input"
                  />
                  {touched.price && errors.price && (
                    <Text className="error-text">{errors.price}</Text>
                  )}
                </FormControl>

                <FormControl className="form-group">
                  <FormLabel className="form-label">Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div className="photos-container">
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <div key={index} className="photo-input-group">
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                disabled={isSubmitting}
                                onChange={handleChange}
                                className="photo-input"
                              />
                              <Button
                                onClick={() => arrayHelpers.remove(index)}
                                className="remove-button"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        <Button
                          onClick={() => arrayHelpers.push("")}
                          className="add-photo-button"
                        >
                          Add a Photo
                        </Button>
                      </div>
                    )}
                  />
                </FormControl>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="submit-button"
                >
                  Update Product
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
}

export default AdminProductDetail;
