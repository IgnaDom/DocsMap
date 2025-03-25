import { useContext } from "react"
import { MapContext } from "../context"


export const DistanceMinutes = () => {

    const { kms, minutes} = useContext( MapContext );

    return (
        <div className={`DistanciaMinutos-container `} style={{display:`${(kms == 0) ? 'none' : ''}`}}>
            <h4 className="text-center">Datos de la ruta</h4>
            <hr />
            <div className={`DistanciaMinutos-container-kms`}>
                <p className="text-start text-wrap">Distancia: {kms}kms</p>
            </div>
            <div className={`DistanciaMinutos-container-minutes`}>
                <p className="text-start text-wrap">Estimación: {minutes}min</p>
            </div>
        </div>
    )
}