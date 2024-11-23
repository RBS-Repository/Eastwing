import React, { useEffect } from "react";
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
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './signin.css';

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        navigate("/");
      } catch (e) {
        const errorMessage = e.response?.data?.message || "Login failed";
        bag.setErrors({ general: errorMessage });
      }
    },
  });

  const boxWidth = useBreakpointValue({ base: "90%", md: "400px" });

  return (
    <Flex className="signin-container">
      <ScaleFade initialScale={0.9} in>
        <Box className="signin-box" width={boxWidth}>
          <Heading className="signin-heading">
            Welcome Back
          </Heading>

          {formik.errors.general && (
            <Alert status="error" className="signin-alert">
              {formik.errors.general}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel className="signin-label">
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
                className="signin-input"
              />
            </FormControl>

            <FormControl mb={6} isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel className="signin-label">
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
                className="signin-input"
              />
            </FormControl>

            <Button
              width="full"
              type="submit"
              isLoading={formik.isSubmitting}
              className="signin-button"
            >
              Sign In
            </Button>
          </form>

          <Text className="signup-text">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              onClick={() => navigate("/signup")}
              className="signup-link"
            >
              Sign up
            </Button>
          </Text>
        </Box>
      </ScaleFade>
    </Flex>
  );
}

export default Signin;
