import { useEffect, useState } from "react";
import { isValidPokemonId, isValidName } from "~/utils/validation";

export function Welcome() {

  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [userInput, setUserInput] = useState< string >("");
  const [pokemonNotFound, setPokemonNotFound] = useState(false);
  
  const baseUrl = 'http://localhost:3000'
  
  type Pokemon = {
    id: number;
    name: string;
    imageUrl: string;
    types: { name: string, url: string }[];
  }
  
  useEffect(() => {
    setCurrentPokemon(pokemon && pokemon.length > 0 ? pokemon[pokemon.length - 1] : null);
    setPokemonNotFound(false);
  }, [pokemon]);
  
  const fetchPokemon = async ( id?: string, name?: string) => {
    try {
      const queryParams = name ? new URLSearchParams({ name }) : ''
      const reqByName = `pokemon?${queryParams}`
      const reqById = `pokemon/${id}`
      const reqUrl = name ? reqByName : reqById
      const response = await fetch(`${baseUrl}/${reqUrl}`);
      
      
      if (!response.ok) {
        setPokemonNotFound(true)
        return;
      }
      const data = await response.json();
      setCurrentPokemon(data);
      return data;

    } catch (error) {
      console.error(`Error fetching Pokemon with id ${name}:`, error);
      throw error;
  }
  }


  const encounterPokemon = async (id: number) => {

    try {
      const response = await fetch(`${baseUrl}/pokemon`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id })
    })

      if (!response.ok) {
        throw new Error(`Failed to encounter Pokemon with id ${id}. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Encountered Pokemon: ${data}`);
      setPokemon([...(pokemon || []), data]);
      console.log(`Updated pokemon array: ${pokemon?.map(p => p.name)}`);

    } catch (error) {
      console.error(`Error encountering Pokemon with id ${id}:`, error);
      throw error;
    }
  }


  const handleClick = async () => {
    // generate random number between 0 and 150
    const randomId = Math.floor(Math.random()* 151);
    console.log(`Encountering Pokemon with id ${randomId}`);
    encounterPokemon(randomId);
  }

  const handleSearchPokedex = async () => {

    const isPokemonId = Number(userInput)
    const isValidPokemonName = isValidName(userInput)

    isPokemonId || isValidPokemonName ? setCurrentPokemon(await fetchPokemon(userInput)) 
    : alert("Please enter a valid Pokemon ID between 0 and 150.")
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
       <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
          Welcome to your Pokedex!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
          
        </p>
        <div className="max-w-[800px] w-full space-y-6 px-4">
          {pokemonNotFound && (
            <div className="flex gap-4">
            <button 
              className="w-full rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleClick}
            >
              Encounter Random Pokemon
            </button>
            <input className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              min="0"
              max="150"
              placeholder="Search Pokedex"
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="rounded bg-green-500 px-4 py-2 text-white"
              onClick={handleSearchPokedex}
            >
              Search Pok  edex
            </button>
            </div>
          )}
          {pokemonNotFound && (
            <div className="flex flex-col items-center gap-4">
              <img src='https://www.freeiconspng.com/uploads/file-pokeball-png-0.png' alt="Pokeball" className="w-32 h-32 mx-auto" />
              <h2 className="text-red-500 text-center">You've never seen this pokemon. Go catchem all!</h2>
              </div>)} 

          {currentPokemon && !pokemonNotFound &&
          (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
                {currentPokemon.name}
              </h2>
              <img src={currentPokemon.imageUrl} alt={currentPokemon.name} className="w-32 h-32" />
              <ul className="flex gap-2">
                {currentPokemon.types.map((t, idx) => (<li key={idx}>{t.name}</li>))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
