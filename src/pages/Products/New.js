import React from "react";
import { postProduct } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { Box, FormControl, FormLabel, Text, Input, Textarea, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { message } from "antd";
import "./New.css";

function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "Product added successfully",
          key: "product_update",
          duration: 2,
        });
      },
    });
  };

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link active">Products</Link></li>
        </ul>
      </nav>

      <Box className="new-product-wrapper">
        <Box className="new-product-form">
          <Text className="page-title">Add New Product</Text>

          <Formik
            initialValues={{
              title: "",
              description: "",
              price: "",
              photos: [],
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
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl isInvalid={touched.title && errors.title}>
                    <FormLabel className="form-label">Title</FormLabel>
                    <Input
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

                  <FormControl isInvalid={touched.description && errors.description}>
                    <FormLabel className="form-label">Description</FormLabel>
                    <Textarea
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

                  <FormControl isInvalid={touched.price && errors.price}>
                    <FormLabel className="form-label">Price</FormLabel>
                    <Input
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

                  <FormControl>
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
                    Add Product
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
}

export default NewProduct;
