import express from 'express';
import {  
    getPokemonById, 
    getPokemon,
    addPokemonToPokedex ,
    removePokemonFromPokedex
    } from '../controllers/pokemonController.js';

//define the router
const pokemonRouter = express.Router();

// define all routes
pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getPokemonById);
pokemonRouter.post('/', addPokemonToPokedex);
pokemonRouter.delete('/:id', removePokemonFromPokedex)

export default pokemonRouter;