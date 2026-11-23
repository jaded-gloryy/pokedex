import { isValidName, isValidPokemonId } from "./validation.js";

const pokeBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonData = {
    id: Number,
    name: String,
    imageUrl: String,
    types: Array
}


const searchByName = ( name ) => {
    if (isValidName(name)){
        const matchingPokemon = pokemonArray.find((p) => p.name.toLowerCase() === name.toLowerCase());
        return matchingPokemon ? matchingPokemon : null;
    }
    return;
}

// fake pokemon array for now. will be replaced with db later
let pokemonArray = []

// function to fetch pokemon data from the pokeapi
const fetchPokemonDataExternal = async (id) => {
    try {
        const response = await fetch(`${pokeBaseUrl}${id}`);

        if (response.ok) {
            const data = await response.json();
            const pokemonData = {
                id: data.id,
                name: data.name,
                imageUrl: data.sprites.front_default,
                types: data.types.map((t) => {
                    return { 'name': t.type.name, 'url': t.type.url }
                })
            }
            return pokemonData;

        }
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}


export const getPokemon = async (req, res) => {
    // if theres a name in the query call searchbyname
    const name = req.query.name
    console.log('getting by name..')

    if (name) {
        const foundPokemon = getPokemonByName(name)
        if (foundPokemon){
            res.status(200).send(foundPokemon)
            return;
        }
        res.status(404).send({error: 'Pokemon not found'})
        return;
    }
    // else just return the pokeArray (or db later)
    res.status(200).send(pokemonArray)
}

const getPokemonByName = (name) => {
    const foundPokemon = searchByName(name);
    return foundPokemon
};

// get pokemon by id
export const getPokemonById = async (req, res) => {
    const id = req.params.id;

    if (!isValidPokemonId(id)) {
        console.log('not valid.....')
        res.status(400).send({ error: 'Invalid Pokemon ID. Please provide an integer between 0 and 150.' });
        return;
    }

    const foundPokemon = pokemonArray.find((p) => p.id == id)
    console.log('found by id: ', foundPokemon)
    res.status(200).send(foundPokemon)
};


export const addPokemonToPokedex = async (req, res) => {
    const id = req.body.id;

    if (!isValidPokemonId(id)) {
        res.status(400).send({ error: 'Invalid Pokemon ID. Please provide an integer between 0 and 150.' });
        return;
    }

    if (pokemonArray.some(pokemon => pokemon.id == id)) {
        res.status(400).send({ error: 'Pokemon already exists in your collection.' });
        return;
    } else {
        const pokemonData = await fetchPokemonDataExternal(id);
        if (pokemonData) {
            pokemonArray.push(pokemonData);
            res.status(201).send(pokemonData);
        } else {
            res.status(404).send({ error: 'Pokemon not found in the external API.' });
        }
    }
};

export const removePokemonFromPokedex = async (req, res) => {
    const id = req.params.id;

    if (!isValidPokemonId(id)) {
        res.status(400).send({ error: 'Invalid Pokemon ID. Please provide an integer between 0 and 150.' });
        return;
    }

    // try to delete the id. if you cant, return a message saying you haven't encountered that pokemon
    const index = pokemonArray.findIndex(pokemonArray => pokemonArray.id == id);
    if (index !== -1) {
        pokemonArray.splice(index, 1);
        res.status(200).send({ message: 'Pokemon deleted successfully.' });
    } else {
        res.status(404).send({ error: 'You have not encountered that Pokemon. Cannot delete.' });
    }
};