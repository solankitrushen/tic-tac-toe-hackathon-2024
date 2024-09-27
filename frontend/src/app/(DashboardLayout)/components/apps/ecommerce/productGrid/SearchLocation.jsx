import React, { useRef, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { IconMapPin } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

export default function LocationSearch({ setCoordinates }) {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState('');
  const [location, setLocation] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return null;
  }
  const handleGetLocation = async (e) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true, // Requests the most accurate location data available
        timeout: 5000, // Maximum time in milliseconds allowed for obtaining the location
        maximumAge: 0, // Ensures that the location data is not cached and is freshly obtained
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log({ latitude, longitude });
          const address = await getLocation(latitude, longitude);
          setCoordinates({ longitude, latitude });

          console.log(address);
          setLocation(address);
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        },
        options, // Passing the options object here
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  async function onPlaceChanged() {
    if (searchResult != null) {
      console.log('(searchResult', searchResult);
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;
      console.log(`Formatted Address: ${formattedAddress}`);
      setLocation(formattedAddress);
      const coordinates = await getCoordinates(formattedAddress);
      console.log(coordinates);
      setCoordinates(coordinates);
    } else {
      alert('Please enter text');
    }
  }

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  return (
    <div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div>
          <TextField
            id="outlined-search"
            placeholder="Search Service Provider"
            size="large"
            type="search"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconMapPin
                    size="20"
                    onClick={handleGetLocation}
                    className="hover:cursor-pointer"
                  />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
      </Autocomplete>
      <p style={{ color: 'gray', marginTop: '8px', fontSize: '14px' }}>
        Click on Location icon to get current Location.
      </p>
    </div>
  );
}
