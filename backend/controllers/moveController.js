const moveBaseUrl = 'https://pokeapi.co/api/v2/move/';

const moveData = {
  id: Number,
  name: String,
  accuracy: Number,
  power: Number,
  pp: Number,
  type: Object,
  target: String
}

const typeData = {
  id: Number,
  name: String,
  damage_relations: Object
}

// const damage_relations < will be an object with keys: double_damage_from, double_damage_to, half_damage_from, half_damage_to, no_damage_from, no_damage_to. Each key will have an array of type objects with name and url properties.
// for 'half_damage_to' and 'double_damage_to' keys, search for the type we're battling. if found, return the amt of damage dealt. else damage = 0.

const fetchMoveFromPokeAPI = async (id) => {
    
    try {
        const response = await fetch(`${moveBaseUrl}/${id}`)
        if (response.ok){
            data = response.json()
            const moveData = {
                id: data.id,
                name: data.name,
                accuracy: data.accuracy,
                power: data.power,
                pp: data.pp,
                target: data.target,
                type: data.type.keys().map(() => {})

            } 
        }
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }

    }
}

// get/:id
const getMove = async (req, res) => {
    const id = req.param.id

}