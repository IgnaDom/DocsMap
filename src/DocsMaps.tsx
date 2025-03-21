import { MapProvider,PlacesProvider } from "./context"
import { HomeScreen } from "./screens"

import './style.css';

export const DocsMap = () => {
    return(
        <PlacesProvider>
            <MapProvider>

                <HomeScreen></HomeScreen>

            </MapProvider>
        </PlacesProvider>
    )
}