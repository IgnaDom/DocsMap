import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DocsMap } from './DocsMaps'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiaWduYWRvbTEwMCIsImEiOiJjbThocjhubTYwM2wzMmtwdW42ODEyazhmIn0.fC-cdxvrUaEsdH0KKC4gtQ';


if(!navigator.geolocation){
  alert('Tu navegador no tiene acceso a la geolocalizacion');
  throw new Error('Tu navegador no tiene acceso a la geolocalizacion');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsMap></DocsMap>
  </StrictMode>,
)
