import { useReducer } from "react"
import { Map, Marker, Popup } from "mapbox-gl"

import { MapContext } from "./MapContext"
import { MapReducer } from "./MapReducer"


export interface MapState {
    isMapReady: boolean,
    map?: Map
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
} 

interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

export const MapProvider = ( { children }:Props ) => {

    const [ state , dispatch ] = useReducer(MapReducer,INITIAL_STATE);

    const setMap = ( map: Map ) => {

        // Añado un Popup cuando se selecciona el puntero de la ubicacion
        const myLocationPopup = new Popup()
            .setHTML(`
            <h4 class="mt-3">Aquí estoy</h4>
            <p>Mar del plata</p>
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

    return (
        <MapContext.Provider value={{
            ...state,

            // Methods

            setMap
        }}>
            { children }
        </MapContext.Provider>
    )
}
