import { useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_KEY } from './config';

mapboxgl.accessToken = MAPBOX_KEY;

const Map = ({ locations, favoriteIds, toggleFavorite }) => {
  const mapRef = useRef();
  const mapboxMap = useRef();
  const markers = useRef([]);

  const refreshMarkers = useCallback(() => {
    if (!locations) return;

    // Clear
    markers.current.forEach(m => m.marker.remove());

    // Add again
    locations.forEach(l => {
      const marker = new mapboxgl.Marker({
        color: favoriteIds.includes(l.id) ? 'red' : 'blue',
      })
        .setLngLat(l)
        .addTo(mapboxMap.current);

      marker.getElement().addEventListener('click', () => {
        toggleFavorite(l.id);
      });

      markers.current.push({
        ...l,
        marker,
      });
    });
  }, [favoriteIds, locations]);

  useEffect(() => {
    refreshMarkers();
  }, [locations, favoriteIds, refreshMarkers]);

  useEffect(() => {
    if (mapboxMap.current || !locations) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    const bounds = new mapboxgl.LngLatBounds(locations[0], locations[0]);

    locations.forEach(l => {
      bounds.extend(l);
    });

    map.fitBounds(bounds, {
      padding: 20,
    });

    mapboxMap.current = map;

    refreshMarkers();
  }, [locations, favoriteIds, refreshMarkers]);

  return <div className="map" ref={mapRef}></div>;
};

export default Map;
