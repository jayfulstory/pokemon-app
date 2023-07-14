import { Loading } from './components/Loading';
import { Card } from './components/Card';
import { Navbar } from './components/Navbar';
import { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css';

function App() {
  const URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [previousURL, setPreviousURL] = useState('');

  useEffect(() => {
    const fetchPokemonDate = async () => {
      let res = await getAllPokemon(URL);
      loadPokemon(res.results);
      setPreviousURL(res.previous); //null
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonDate();
  }, []);

  const loadPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(pokemon => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if (previousURL === null) {
      alert('最初のページです。');
      return;
    }
    setLoading(true);
    let data = await getAllPokemon(previousURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPreviousURL(data.previous);
    setLoading(false);
  };
  const handleNextPage = async () => {
    if (nextURL === null) {
      alert('最後のページです。');
      return;
    }
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPreviousURL(data.previous);
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <Loading />
        ) : (
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}></Card>;
            })}
          </div>
        )}
        <div className='btn'>
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;
