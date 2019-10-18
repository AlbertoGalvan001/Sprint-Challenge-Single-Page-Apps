import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchForm from "./SearchForm";
import CharacterCard from "./CharacterCard";




export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
    Axios
      .get('https://rickandmortyapi.com/api/character/')
      .then(response => {

        const characters = response.data.results.filter(character =>
          character.name.toLowerCase().includes(search.toLowerCase())
        );
        console.log("character data", response);
        setData(characters);
      })
      .catch(err => {
        console.log("No data for you", err);
      })

  }, [search]);

  const handleInputChange = event => {
    setSearch(event.target.value);
  };
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setSearch(event.target.value);
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`submitting Name: ${search}`)
  // }

  return (
    <section className="character-list">
      <h2></h2>
      <SearchForm
        placeholder="search characters"
        value={search}
        handleChange={handleInputChange}
      // handleSubmit={handleSubmit}
      />
      {data.map(character => (
        <CharacterCard
          key={character.id}
          name={character.name}
          image={character.image}
        />
      ))}
    </section>
  );
}
