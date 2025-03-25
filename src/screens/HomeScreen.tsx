import { MapView, BtnMyLocation, FlorenciaLogo, SearchBar} from "../components"
import { DistanceMinutes } from '../components/DistanceMinutes';

export const HomeScreen = () => {
    return (
        <div>
            <MapView></MapView>
            <BtnMyLocation></BtnMyLocation>
            <FlorenciaLogo></FlorenciaLogo>
            <SearchBar></SearchBar>
            <DistanceMinutes></DistanceMinutes>
        </div>
    )
}