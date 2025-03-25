import { useContext, useEffect, useReducer } from "react"
import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from "mapbox-gl"

import { MapContext } from "./MapContext"
import { MapReducer } from "./MapReducer"

import { PlacesContext } from "../";

import { directionApi } from "../../apis";
import { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean,
    map?: Map;
    markers: Marker[];
    kms: number,
    minutes: number
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
    kms: 0,
    minutes: 0
} 

interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

export const MapProvider = ( { children }:Props ) => {

    const [ state , dispatch ] = useReducer(MapReducer,INITIAL_STATE);

    const { places, delate } = useContext( PlacesContext);

    if(state.map?.getLayer('RouteString') && delate === true) {
        state.map?.removeLayer('RouteString');
        state.map?.removeSource('RouteString');
    }

    useEffect(()=>{
        state.markers.forEach( marker => marker.remove());

        dispatch({type: 'setKms',payLoad: 0});
        dispatch({type: 'setMinutes',payLoad: 0});

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text }</h6>
                    <p>${ place.place_name }</p>
                `);
            const newMarker = new Marker({color: '#007bff'})
                    .setPopup( popup )
                    .setLngLat( [ lng, lat ] )
                    .addTo( state.map! );

            newMarkers.push( newMarker );
        }

        dispatch( {type: 'setMarkers' , payLoad: newMarkers });

    },[places]); 

    const setMap = ( map: Map ) => {

        // Añado un Popup cuando se selecciona el puntero de la ubicacion
        const myLocationPopup = new Popup()
            .setHTML(`
            <h4 class="mt-3">Aquí estoy</h4>
            `)

        // Map.getCenter obtiene la posicion inicial del marcador (Tu ubicacion)
        new Marker({
            color: '#000'
        })
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );

        dispatch( { type: 'setMap', payLoad: map } )

    }

    const getRouteBetweenPoints = async(start: [number,number], end: [number,number]) => {
        const resp = await directionApi.get<DirectionsResponse>(`/${ start.join('%2C') }%3B${ end.join('%2C') }`);
        const { distance, duration, geometry} = resp.data.routes[0];

        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms = kms / 100;

        const minutes = Math.floor(duration / 60);

        
        dispatch( {type: 'setKms', payLoad: kms});
        dispatch( {type: 'setMinutes', payLoad: minutes});

        const { coordinates:coords } = geometry;

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord:[ number, number ] = [ coord[0] , coord[1] ];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds( bounds, {
            padding: 100
        } );

        // Polyland
        const sourceData: SourceSpecification = {
            type: 'geojson',
            data:{
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties:{},
                    geometry:{
                        type: 'LineString',
                        coordinates: coords
                    }
                }]
            }
        }

        if( state.map?.getLayer('RouteString')){
            state.map?.removeLayer('RouteString');
            state.map?.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });

    }

    return (
        <MapContext.Provider value={{
            ...state,

            // Methods

            setMap,
            getRouteBetweenPoints,
        }}>
            { children }
        </MapContext.Provider>
    )
}
