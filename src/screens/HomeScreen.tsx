import { MapView, BtnMyLocation, FlorenciaLogo, SearchBar} from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView></MapView>
            <BtnMyLocation></BtnMyLocation>
            <FlorenciaLogo></FlorenciaLogo>
            <SearchBar></SearchBar>
        </div>
    )
}