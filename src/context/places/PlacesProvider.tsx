import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacerReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponce } from "../../interfaces/places"

import data from '../../json/especialistas.json'

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number , number];
    isLoadingPlaces: boolean;
    places: Feature[];
    delate: boolean;
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
    delate: false,
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
        
        dispatch({ type:'setDelate',payload: true});

        if( query.length === 0){
            dispatch({ type:'setPlaces',payload: [] });
            return [];
        }
        
        if( !state.userLocation ) throw new Error('No se encontro la ubicacion inicial');

        dispatch({ type: 'setLoadingPaces' });
        dispatch({ type:'setDelate',payload: false});
        
        // const resp = await searchApi.get<PlacesResponce>(`/${ query }.json`,{
        //     params: {
        //         proximity: state.userLocation.join(',')
        //     }
        // });

        // console.log(resp.data.features[0]);

        // return resp.data.features;

        const features:any[] = [];

        data.map( feature => {if(feature.Especialidad === query) features.push(feature)});

        dispatch({ type: 'setPlaces', payload: features});
        
        return features;   
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
