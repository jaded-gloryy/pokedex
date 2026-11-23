export const isValidPokemonId = ( id ) => {
    // what if i get number as a string?
    const idNum = Number(id)
    // console.log(`id num: ${idNum}`)
    console.log(`num is int? :${Number.isInteger(idNum)}`)
    if (!Number.isInteger(idNum)) {
        console.log('its not an int, so its not valid')
        return false}
    return id >= 0 && id <= 150;
}

export const isValidName = ( name ) => {
    // check that name only contains letters, no numbers or special chars
    return  /^[A-Za-z]+$/.test(name)
}