import React, { useState } from 'react';
import { Button, View } from '@aws-amplify/ui-react';

function InterestForm({ onSubmit }) {
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleChange = (event) => {
    setSelectedInterest(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem('selectedInterest', selectedInterest); // Store the interest in session storage
    onSubmit(selectedInterest);
  };

  return (
    <View>
      <form onSubmit={handleSubmit}>
        <select value={selectedInterest} onChange={handleChange}>
          <option value="">Select an Interest</option>
          <option value="youtube">Watch YouTube</option>
          <option value="games">Play Games</option>
          <option value="book">Read a Book</option>
          <option value="music">Listen to Music</option>
          <option value="netflix">Watch Netflix</option>
        </select>
        <Button type="submit">Submit</Button>
      </form>
    </View>
  );
}

export default InterestForm;
