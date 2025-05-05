import React, {useEffect, useState} from "react";
import Details from "./Details";
import ErrorBoundary from "./ErrorBoundary";

function DropDown() {

    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const URL = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        fetch(`${URL}?limit=100`)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(data.results);
                console.log(data.results);  
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleChange = (event) => {
        setSelectedPokemon(event.target.value);
        console.log("Selected Pokemon:", event.target.value);
    };


    return (
        <>
            <div className="dropdown">
                <select className="dropdown-select" id="dropdown-select" onChange={handleChange}>
                    <option value="">Select any pokemon</option>
                    {pokemons.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                        </option>
                    ))}
                </select>
            </div>
            <ErrorBoundary>
                <Details name={selectedPokemon} link={URL} />
            </ErrorBoundary>
            
        </>
    )
}

export default DropDown;