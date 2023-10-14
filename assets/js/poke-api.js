
const pokeApi = {};

function convert_2_PokeModel(pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetails.name
    pokemon.id = ("000" + pokemonDetails.id).slice(-3)

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.img = pokemonDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convert_2_PokeModel)

}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
            .then( (response) => response.json()) //arrowfunction, versão simplificada de função
            .then( (jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getDetails))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonDetails) => pokemonDetails)                                       
}
