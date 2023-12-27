import React, { useEffect, useState } from 'react';
import UserCreateForm from './ui-components/UserCreateForm';
import MusicPreferenceForm from './MusicPreferenceForm';
import '@aws-amplify/ui-react/styles.css';
import "./style.css"
import {
  Button,
  Card,
  Heading,
  View,
  withAuthenticator,
  Text
} from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { SearchUsersByEmail } from './graphql/queries';

const NavBar = ({ onSignOut, username }) => (
  <div className="navbar">
    <img src="/logo.png" alt="Logo" className="logo" />
    <div>
      <Button onClick={onSignOut} className="signout-button">Sign Out</Button>
      <div className="welcome-message">Welcome back, {username}</div>
    </div>
  </div>
);


function App({ signOut, user }) {
  const [username, setUsername] = useState('');
  const [shouldShowForm, setShouldShowForm] = useState(true);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [showMusicForm, setShowMusicForm] = useState(true); // Music form is shown by default
  const [userMusicPreferences, setUserMusicPreferences] = useState(null);
  const [userExistenceChecked, setUserExistenceChecked] = useState(false);
  const client = generateClient();
  
  useEffect(() => {
    
    const checkIfUserExists = async () => {
      if (userExistenceChecked) return;

      setIsCheckingUser(true);
      const userEmail = String(user.username);
      try {
        const response = await client.graphql({
          query: SearchUsersByEmail,
          variables: { email: userEmail }
        });
        const userExists = response.data.searchUsers.items.length > 0;
        setShouldShowForm(!userExists);
        setUserExistenceChecked(true);
      } catch (error) {
        console.error('Error searching for user:', error);
      } finally {
        setIsCheckingUser(false);
      }
    };
    const handleUserFormSuccess = (userData) => {
      setShouldShowForm(false);
    };
    const handleMusicPreferencesSubmit = (preferences) => {
      setUserMusicPreferences(preferences);
      setShowMusicForm(false); // Hide the form once preferences are submitted
    };  
    if (user && user.username && !userExistenceChecked) {
      checkIfUserExists();
    }
  }, [user, client, userExistenceChecked]);

  const handleUserFormSuccess = (userData) => {
    setShouldShowForm(false);
  };

  const handleMusicPreferencesSubmit = (preferences) => {
    setUserMusicPreferences(preferences);
    setShowMusicForm(false);
  };

  return (
    
    <View className="App">
      <NavBar onSignOut={signOut} username={user.username} />
      <Card>
        <Heading level={1}>Welcome to the App!</Heading>
        {isCheckingUser ? (
          <Text>Loading...</Text>
        ) : shouldShowForm ? (
          <>
            <Text>Current user email: {user.username}</Text>
            <UserCreateForm 
              onSuccess={handleUserFormSuccess} 
              onError={(userData, errorMessage) => console.error('Error creating user:', errorMessage)} 
            />
          </>
        ) : userMusicPreferences ? (
          // Only display the recommendations if they exist
          <div className="preferences-display">
          <h2>Your Music Preferences</h2>
          <pre>{JSON.stringify(userMusicPreferences, null, 2)}</pre>
        </div>
        ) : showMusicForm && (
          // Only show the form if userMusicPreferences is not set
          <MusicPreferenceForm onSubmit={handleMusicPreferencesSubmit} />
        )}
      </Card>
    </View>
  );
}

export default withAuthenticator(App);
