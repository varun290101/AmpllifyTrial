import React, { useState } from 'react';
import "./style.css"
function MusicPreferenceForm() {
  const [musicEra, setMusicEra] = useState('');
  const [genre, setGenre] = useState('');
  const [danceDesire, setDanceDesire] = useState(0);
  const [loudnessLevel, setLoudnessLevel] = useState(0);
  const [acousticness, setAcousticness] = useState(0);
  const [instrumentalness, setInstrumentalness] = useState(0);
  const [valence, setValence] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [topic, setTopic] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [requestString, setRequestString] = useState('');

  const roundToThreeDecimals = (value) => {
    return Math.round(value * 1000) / 1000;
  };

  const genreToNumeric = {
    'rock': 1, 'pop': 2, 'hiphop': 3, 'jazz': 4, 'reggae': 5, 'electronic': 6, 'country': 7, 'blues': 8
  };

  const topicToNumeric = {
    'sadness': 1, 'world/life': 2, 'music': 3, 'romantic': 4, 'violence': 5, 'obscene': 6, 'night/time': 7, 'feelings': 8
  };

  const categorizeMusicEra = (year) => {
    if (year === '1950') return 1;
    else if (year === '2000') return 2;
    else if (year === '2020') return 3;
    return 0;
  };
  
  const minMaxNormalize = (value, max) => {
    return value / max;
  };
  const callApi = async (formData) => {
    try {
      const response = await fetch('http://varun290101.pythonanywhere.com/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error making API call:', error);
      setApiResponse({ error: 'Failed to fetch data',details: error.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userFeatures = [
      categorizeMusicEra(musicEra),
      genreToNumeric[genre.toLowerCase()] || 0,
      roundToThreeDecimals(minMaxNormalize(parseFloat(danceDesire), 10)),
      roundToThreeDecimals(minMaxNormalize(parseFloat(loudnessLevel), 10)),
      roundToThreeDecimals(minMaxNormalize(parseFloat(acousticness), 10)),
      roundToThreeDecimals(minMaxNormalize(parseFloat(instrumentalness), 10)),
      roundToThreeDecimals(minMaxNormalize(parseFloat(valence), 10)),
      roundToThreeDecimals(minMaxNormalize(parseFloat(energy), 10)),
      topicToNumeric[topic.toLowerCase()] || 0,
    ];

    const formData = { user_features: userFeatures };
    const stringifiedFormData = JSON.stringify(formData);
    setRequestString(stringifiedFormData); // Update the request string state

    await callApi(formData);
  };

  return (
    <div className="music-preference-form">
      <form onSubmit={handleSubmit}>
        {/* Mood Selection */}
        

        {/* Music Era Selection */}
        <div>
          <label>What kind of music do you wish to hear?</label>
          <select value={musicEra} onChange={(e) => setMusicEra(e.target.value)}>
            <option value="">Select Era</option>
            <option value="1950">Old School Classic</option>
            <option value="2000">2000s Blues</option>
            <option value="2020">Modern Hits</option>
          </select>
        </div>

        {/* Genre Selection */}
        <div>
          <label>What's your favorite music genre?</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="hiphop">Hip Hop</option>
            <option value="jazz">Jazz</option>
            <option value="reggae">reggae</option>
            <option value="electronic">Electronic</option>
            <option value="country">Country</option>
            <option value="blues">Blues</option>
          </select>
        </div>

        {/* Dance Desire */}
        <div>
          <label>On a scale of 1-10, how much do you feel like dancing?</label>
          <input type="range" min="1" max="10" step="0.001" value={danceDesire} onChange={(e) => setDanceDesire(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Loudness Level */}
        <div>
          <label>Are you having a quiet evening or do you wish to blast some music? (1 for quiet, 10 for loud)</label>
          <input type="range" min="1" max="10" step="0.001" value={loudnessLevel} onChange={(e) => setLoudnessLevel(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Acousticness */}
        <div>
          <label>How much do you enjoy acoustic music? (1 to 10)</label>
          <input type="range" min="1" max="10" step="0.001" value={acousticness} onChange={(e) => setAcousticness(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Instrumentalness */}
        <div>
          <label>How much do you enjoy instrumental music? (1 to 10)</label>
          <input type="range" min="1" max="10" step="0.001" value={instrumentalness} onChange={(e) => setInstrumentalness(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Valence */}
        <div>
          <label>Rate the positivity of the music you prefer (1 to 10)</label>
          <input type="range" min="1" max="10" step="0.001" value={valence} onChange={(e) => setValence(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Energy */}
        <div>
          <label>Rate the energy level of the music you prefer (1 to 10)</label>
          <input type="range" min="1" max="10" step="0.001" value={energy} onChange={(e) => setEnergy(roundToThreeDecimals(parseFloat(e.target.value)))} />
        </div>

        {/* Topic Selection */}
        <div>
          <label>What mood or theme do you prefer in music?</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Select Topic</option>
            <option value="romantic">Romantic</option>
            <option value="sadness">Sadness</option>
            <option value="world/life">World & Life</option>
            <option value="obscene">Obscene</option>
            <option value="night/time">Night/Time</option>
            <option value="music">Music</option>
            <option value="violence">Violence</option>
            <option value="feelings">Feelings</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
      
      {apiResponse && (
        <div className="api-response">
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MusicPreferenceForm;


