import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Button, Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="profile-container">
      <Flex className="profile-content">
        <Box className="profile-box">
          {!loggedIn ? (
            <div className="login-prompt">
              <Alert status="warning" className="login-alert">
                <AlertIcon />
                You are not logged in. Please login and try again.
              </Alert>
              <div className="auth-buttons">
                <Link to="/signin">
                  <Button className="login-button">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="register-button">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Tabs variant="enclosed" className="profile-tabs">
              <TabList className="tab-list">
                <Tab className="tab">Profile</Tab>
              </TabList>

              <TabPanels>
                <TabPanel className="tab-panel">
                  <Text className="panel-title">
                    Profile Information
                  </Text>
                  <Box className="info-box">
                    <Text className="info-text">
                      Email: {user.email}
                    </Text>
                    <Text className="info-text">
                      Role: {user.role}
                    </Text>
                  </Box>
                  <Button
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    Logout
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </Box>
      </Flex>
    </div>
  );
}

export default Profile;
