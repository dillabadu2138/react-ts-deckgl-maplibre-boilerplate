import Map, {
  useControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  AttributionControl,
} from 'react-map-gl/maplibre';
import { DeckProps } from '@deck.gl/core';
import { GeoJsonLayer } from 'deck.gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const App = () => {
  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (f) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    }),
  ];

  return (
    <Map
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      style={{ width: '100vw', height: '100vh' }}
      attributionControl={false}
    >
      <DeckGLOverlay layers={layers} />
      <FullscreenControl position='top-right' />
      <GeolocateControl position='top-right' trackUserLocation={false} />
      <NavigationControl
        position='top-right'
        showZoom={true}
        showCompass={true}
        visualizePitch={true}
      />
      <ScaleControl position='bottom-left' />
      <AttributionControl compact={true} />
    </Map>
  );
};

export default App;
