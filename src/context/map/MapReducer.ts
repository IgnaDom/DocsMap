import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = 
| { type: 'setMap', payLoad: Map }
| { type: 'setMarkers', payLoad: Marker[] }
| { type: 'setKms', payLoad: number}
| { type: 'setMinutes', payLoad: number}

export const MapReducer = ( state: MapState, action: MapAction): MapState =>{
    switch ( action.type ) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payLoad
            }

        case 'setMarkers':
            return{
                ...state,
                markers: action.payLoad
            }
        case 'setKms':
            return{
                ...state,
                kms: action.payLoad
            }
        case 'setMinutes':
            return{
                ...state,
                minutes: action.payLoad
            }
        default:
            return state;
    }
}