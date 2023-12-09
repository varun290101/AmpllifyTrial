import React, { useState } from 'react';
import { Button, CheckboxField, View } from '@aws-amplify/ui-react';

function InterestForm({ onSubmit }) {
  const [interests, setInterests] = useState({
    youtube: false,
    games: false,
    book: false,
    music: false,
    netflix: false
  });

  const handleChange = (event) => {
    setInterests({
      ...interests,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(interests);
  };

  return (
    <View>
      <form onSubmit={handleSubmit}>
        <CheckboxField name="youtube" label="Watch YouTube" onChange={handleChange} />
        <CheckboxField name="games" label="Play Games" onChange={handleChange} />
        <CheckboxField name="book" label="Read a Book" onChange={handleChange} />
        <CheckboxField name="music" label="Listen to Music" onChange={handleChange} />
        <CheckboxField name="netflix" label="Watch Netflix" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
    </View>
  );
}

export default InterestForm;
