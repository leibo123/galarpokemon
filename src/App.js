import React from 'react';
import logo from './logo.svg';
import './App.css';
import FilteredList from "./FilteredList";
import {POKEMONS, POKEMON_IMAGES, POKEMON_IMAGES_SHINY, POKEMON_TYPE_IMAGES} from "./Constants";


function App() {
  return (
    <div className="App">
      <FilteredList items={POKEMONS} images={POKEMON_IMAGES} images_shiny={POKEMON_IMAGES_SHINY} images_type={POKEMON_TYPE_IMAGES}/>
    </div>
  );
}

export default App;
