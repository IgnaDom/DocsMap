import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";

export const SearchBar = () => {

    const debounceRref = useRef<NodeJS.Timeout>(null);
    const { searchPlacesByTerm } = useContext(PlacesContext)

    const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
            if( debounceRref.current ){
                clearTimeout(debounceRref.current);
            }

            debounceRref.current = setTimeout(()=>{
                searchPlacesByTerm(event.target.value);
            }, 350)

    }

    return (
        <div className="search-container">
            <input 
                type="text" 
                className="form-control"
                placeholder="Buscar lugar..."
                onChange={onQueryChanged}
            />
        </div>
    )
}