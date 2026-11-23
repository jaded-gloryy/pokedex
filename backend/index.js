import express from 'express';
import cors from 'cors';
import pokemonRouter from './routes/pokemon.js';
import movesRouter from './routes/moves.js';


const app = express();
const PORT = 3000


app.use(cors());
app.use(express.json());
app.use('/pokemon', pokemonRouter);
app.use('/moves', movesRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});