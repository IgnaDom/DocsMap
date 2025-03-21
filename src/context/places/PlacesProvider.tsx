import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacerReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponce } from "../../interfaces/places"

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number , number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
}

interface Props{
    children: React.JSX.Element | React.JSX.Element[]
}

export const PlacesProvider = ({ children }:Props) => {

    const [state,dispatch] = useReducer(PlacerReducer,INITIAL_STATE);

    useEffect(() => {
        getUserLocation()
            .then( lngLat => dispatch({ type:'setUserLocation', payload: lngLat})) 
    }, []);

    const searchPlacesByTerm = async( query: string): Promise<Feature[]> => {

        if( query.length === 0) return []; 
        if( !state.userLocation ) throw new Error('No se encontro la ubicacion inicial');

        dispatch({ type: 'setLoadingPaces' });
        
        const resp = await searchApi.get<PlacesResponce>(`/${ query }.json`,{
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        dispatch({ type: 'setPlaces', payload: resp.data.features});

        return resp.data.features;   
    }

    return (
        <PlacesContext.Provider value = {{
            ...state,   

            //Methods
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
  )
}
