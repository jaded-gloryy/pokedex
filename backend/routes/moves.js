import express from 'express';
import { fetchMoveFromPokeAPI } from '../controllers/moveController.js';

const movesRouter = express.Router();


movesRouter.get('/:name', fetchMoveFromPokeAPI);

export default movesRouter;