import React, { useState, useEffect } from 'react';

function Details({ name, link }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const cacheData = sessionStorage.getItem(name);
        if (cacheData) {
            console.log("Cache hit for:", name);
          setPokemonDetails(JSON.parse(cacheData));
          setLoading(false);
          return;
        } else{
            const response = await fetch(`${link}${name}`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPokemonDetails(data);
            sessionStorage.setItem(name, JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      fetchPokemonDetails();
    } else {
      setLoading(false);
    }
  }, [name, link]);

  return (
    <div className="details">
      {loading ? (
        <p>Loading...</p>
      ) : pokemonDetails ? (
        <div className="details-content">
          <h3>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h3>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <p><strong>Height: </strong>{pokemonDetails.height}</p>
          <p><strong>Weight: </strong>{pokemonDetails.weight}</p>
          <p>
            <strong>Types: </strong>
            {pokemonDetails.types?.map((type) => type.type.name).join(", ")}
          </p>
        </div>
      ) : (
        <p>No Pokemon selected.</p>
      )}
    </div>
  );
}

export default Details;
