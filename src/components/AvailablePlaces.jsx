import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
  async function fetchPlaces() {
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:3000/places');

      if (!response.ok) {
        throw new Error('Failed to fetch places.');
      }

      const resData = await response.json();
      setAvailablePlaces(resData.places);
    } catch (error) {
      console.log(error);
      setError({
        message: 'Could not fetch places, try again later.',
      });
    } finally {
      setIsFetching(false);
    }
  }

  fetchPlaces();
}, []);


  if(error){
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
