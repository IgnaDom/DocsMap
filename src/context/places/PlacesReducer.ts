import { PlacesState } from "./PlacesProvider";


type PlacesAction = { type: 'setUserLocation', payload: [ number , number ]};

export const PlacerReducer = ( state:PlacesState , action: PlacesAction): PlacesState => {

    switch ( action.type){
        case 'setUserLocation':
            return{
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        default:
            return state;
    }

}