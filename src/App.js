import React, { useEffect, useState } from 'react';
import UserCreateForm from './ui-components/UserCreateForm';
import InterestForm from './InterestForm'; // Import the InterestForm component
import '@aws-amplify/ui-react/styles.css';
import {
  Button,
  Card,
  Heading,
  View,
  withAuthenticator,
  Text,
} from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { SearchUsersByEmail } from './graphql/queries';

function App({ signOut, user }) {
  const [shouldShowForm, setShouldShowForm] = useState(true);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [showInterestForm, setShowInterestForm] = useState(false); // State to control InterestForm visibility
  const client = generateClient();

  useEffect(() => {
    const checkIfUserExists = async () => {
      setIsCheckingUser(true);
      const userEmail = String(user.username);
      try {
        const response = await client.graphql({
          query: SearchUsersByEmail,
          variables: { email: userEmail }
        });
        const userExists = response.data.searchUsers.items.length > 0;
        setShouldShowForm(!userExists);
        setShowInterestForm(userExists); // Show InterestForm if user already exists
      } catch (error) {
        console.error('Error searching for user:', error);
      } finally {
        setIsCheckingUser(false);
      }
    };

    if (user && user.username) {
      checkIfUserExists();
    } else {
      setIsCheckingUser(false);
      setShouldShowForm(true);
    }
  }, [user, client]);

  const handleUserFormSuccess = (userData) => {
    console.log('User created:', userData);
    setShouldShowForm(false);
    setShowInterestForm(true); // Show InterestForm once UserCreateForm is successfully filled
  };

  const handleInterestSubmit = (interests) => {
    console.log('User Interests:', interests);
    sessionStorage.setItem('userInterests', JSON.stringify(interests));
    
  };

  return (
    <View className="App">
      <Card>
        <Heading level={1}>Welcome to the App!</Heading>
        {isCheckingUser ? (
          <Text>Loading...</Text>
        ) : shouldShowForm ? (
          <>
            <Text>Current user email: {user.username}</Text>
            <UserCreateForm
              onSuccess={handleUserFormSuccess}
              onError={(userData, errorMessage) => {
                console.error('Error creating user:', errorMessage);
              }}
            />
          </>
        ) : showInterestForm ? (
          <InterestForm onSubmit={handleInterestSubmit} />
        ) : (
          <Text>Welcome back, {user.username}</Text>
        )}
      </Card>

      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
