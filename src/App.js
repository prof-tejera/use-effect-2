import { useEffect, useState } from 'react';
import './index.css';

import Locations from './Locations';
import Map from './Map';
import { fetchLocations } from './api';

const App = () => {
  const [locations, setLocations] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    fetchLocations().then(({ data }) => {
      setLocations(data);
    });
  }, []);

  const toggleFavorite = id => {
    const isFavorite = favoriteIds.includes(id);
    if (isFavorite) {
      setFavoriteIds(favoriteIds.filter(fid => fid !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  return (
    <div className="app">
      <h1 style={{ fontSize: 40 }}>Map It!</h1>
      <div className="panel">
        {!locations && <div>Loading...</div>}
        <Locations
          setLocations={setLocations}
          locations={locations}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
        />
        <Map locations={locations} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default App;
