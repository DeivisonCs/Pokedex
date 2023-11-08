
const pokeApi = {};

function convert_2_PokeModel(pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetails.name
    // console.log(pokemon.name);
    pokemon.id = pokemonDetails.id
    pokemon.number = ("000" + pokemonDetails.id).slice(-3)

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`

    pokemon.hp = get_base_stats(pokemonDetails.stats[0].base_stat);
    // console.log(pokemon.hp);
    pokemon.atk = get_base_stats(pokemonDetails.stats[1].base_stat);
    pokemon.def = get_base_stats(pokemonDetails.stats[2].base_stat);
    pokemon.satk = get_base_stats(pokemonDetails.stats[3].base_stat);
    pokemon.sdef = get_base_stats(pokemonDetails.stats[4].base_stat);
    pokemon.spd = get_base_stats(pokemonDetails.stats[5].base_stat);

    return pokemon;
}

//Caso o status passe de 100
function get_base_stats(status){
    if(status > 100) return 100;
    else return status;
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
