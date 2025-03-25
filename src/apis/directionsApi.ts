import axios from 'axios';

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'full',
        steps: false,
        access_token: 'pk.eyJ1IjoiaWduYWRvbTEwMCIsImEiOiJjbThocjhubTYwM2wzMmtwdW42ODEyazhmIn0.fC-cdxvrUaEsdH0KKC4gtQ'
    }
});

export default directionApi;