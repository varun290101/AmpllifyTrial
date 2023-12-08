import React from "react";
import UserCreateForm from "./ui-components/UserCreateForm"; // Import the UserCreateForm component

import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
  Image,
  Card,
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        
        <Heading level={1}>We now have auth!</Heading>
      </Card>
      <UserCreateForm
        // You can pass any props or callbacks needed by UserCreateForm here
        onSuccess={(userData) => {
          // Handle the successful creation of a user here
          console.log("User created:", userData);
        }}
        onError={(userData, errorMessage) => {
          // Handle the error here
          console.error("Error creating user:", errorMessage);
        }}
      />
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
