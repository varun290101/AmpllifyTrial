import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css"
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
        <img src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have auth!</Heading>
        </Card>
       
     <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
