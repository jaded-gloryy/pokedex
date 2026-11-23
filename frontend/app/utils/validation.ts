export const isValidPokemonId = ( id: number ) => {
    if (!Number.isInteger(id)) return false
    return id >= 0 && id <= 150;
}

export const isValidName = ( name: string ) => {
    // check that name only contains letters, no numbers or special chars
    return  /^[A-Za-z]+$/.test(name)
}