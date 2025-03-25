import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiaWduYWRvbTEwMCIsImEiOiJjbThocjhubTYwM2wzMmtwdW42ODEyazhmIn0.fC-cdxvrUaEsdH0KKC4gtQ'
    }
});

export default searchApi;