import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"





export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext( MapContext );
    const { userLocation } = useContext( PlacesContext );

    const onClick = () => {
        if( !isMapReady ) throw new Error('Mapa no encontrado');
        if( !userLocation ) throw new Error('Ubicacion no encontrada');


        //Mueve el mapa a la posicion deseada (En este caso 'userLocation' almacena la posicion inicial)
        map?.flyTo({
            zoom: 14,
            center: userLocation
        });
    }

    return (
        <button 
            className="btn btn-dark"
            onClick={ onClick }
            style={{
                position: "fixed",
                top: '20px',
                right: '20px',
                zIndex: 1000,
            }}
        >
            <i 
                className="bi bi-crosshair" 
                style={{
                    fontSize: '20px'
                }}
            ></i>

        </button>
    )
}