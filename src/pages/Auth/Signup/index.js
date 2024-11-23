import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  useBreakpointValue,
  Text,
  ScaleFade,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './signup.css';

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        navigate("/");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Registration failed" });
      }
    },
  });

  const boxWidth = useBreakpointValue({ base: "90%", md: "400px" });

  return (
    <Flex className="auth-container">
      <ScaleFade initialScale={0.9} in>
        <Box className="auth-box" width={boxWidth}>
          <Heading className="auth-heading">
            Create Your Account
          </Heading>

          {formik.errors.general && (
            <Alert status="error" className="auth-alert">
              {formik.errors.general}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel className="auth-label">
                Email Address
              </FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                focusBorderColor="orange.400"
                boxShadow="sm"
                _hover={{ borderColor: "orange.300" }}
                _focus={{ borderColor: "orange.500", boxShadow: "outline" }}
                borderRadius="md"
                className="auth-input"
              />
            </FormControl>

            <FormControl mb={4} isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel className="auth-label">
                Password
              </FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                focusBorderColor="orange.400"
                boxShadow="sm"
                _hover={{ borderColor: "orange.300" }}
                _focus={{ borderColor: "orange.500", boxShadow: "outline" }}
                borderRadius="md"
                className="auth-input"
              />
            </FormControl>

            <FormControl mb={6} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}>
              <FormLabel className="auth-label">
                Confirm Password
              </FormLabel>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                placeholder="Confirm your password"
                focusBorderColor="orange.400"
                boxShadow="sm"
                _hover={{ borderColor: "orange.300" }}
                _focus={{ borderColor: "orange.500", boxShadow: "outline" }}
                borderRadius="md"
                className="auth-input"
              />
            </FormControl>

            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              className="auth-button"
            >
              Sign Up
            </Button>
          </form>

          <Text className="auth-link-text">
            Already have an account?{" "}
            <Button 
              variant="link" 
              onClick={() => navigate("/signin")}
              className="auth-link"
            >
              Sign in
            </Button>
          </Text>
        </Box>
      </ScaleFade>
    </Flex>
  );
}

export default Signup;
