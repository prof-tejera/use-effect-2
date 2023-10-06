import { useEffect, useState } from 'react';
import DebounceInput from './DebounceInput';
import { fetchLocations } from './api';

const Locations = ({ locations, setLocations, favoriteIds, toggleFavorite }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLocations({ search }).then(({ data }) => {
      setLocations(data);
    });
  }, [search, setLocations]);

  if (!locations) return null;

  return (
    <div className="locations">
      <DebounceInput
        type="text"
        className="input"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
        placeholder="Search..."
      />
      <div className="scroller">
        {locations.map(l => {
          const isFavorite = favoriteIds.includes(l.id);
          return (
            <div
              className="row"
              key={l.id}
              style={{
                borderLeft: `${isFavorite ? '4' : '0'}px solid red`,
              }}
              onClick={() => {
                toggleFavorite(l.id);
              }}
            >
              <div>{l.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Locations;
