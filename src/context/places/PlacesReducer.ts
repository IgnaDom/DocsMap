import { Feature } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";


type PlacesAction = 
| { type: 'setUserLocation', payload: [ number , number ] }
| { type: 'setLoadingPaces' }
| { type: 'setPlaces', payload: Feature[] }
| { type: 'setDelate', payload: boolean}

export const PlacerReducer = ( state:PlacesState , action: PlacesAction): PlacesState => {

    switch ( action.type){
        case 'setUserLocation':
            return{
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: [],
            }
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        case 'setDelate':
            return {
                ...state,
                delate: action.payload
            }
        default:
            return state;
    }

}