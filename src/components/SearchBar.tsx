import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResults } from ".";

export const SearchBar = () => {

    const debounceRref = useRef<NodeJS.Timeout>(null);
    const { searchPlacesByTerm } = useContext(PlacesContext)

    const onQueryChanged = ( event: ChangeEvent<HTMLSelectElement> ) => {
            if( debounceRref.current ){
                clearTimeout(debounceRref.current);
            }

            debounceRref.current = setTimeout(()=>{
                searchPlacesByTerm(event.target.value);
            }, 350)

    }

    return (
        <div className="search-container">
            {/* <input 
                id="search-container"
                type="text" 
                className="form-control"
                placeholder="Buscar lugar..."
                onChange={onQueryChanged}
            /> */}
            <select className="form-select" aria-label="Default select example" onChange={onQueryChanged}>
                <option defaultValue={""}>Seleccionar especialidad</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Psiquiatria">Psiquiatria</option>
                <option value="Nutricion">Nutricion</option>
            </select>

            <SearchResults></SearchResults>
        </div>
    )
}