
const pokemons_card = document.getElementById('pokemons_card')
const loadMore = document.getElementById('loadMore');
const nextPage = document.getElementById('nextPage');
const prevPage = document.getElementById('prevPage');
const pokedex_search = document.getElementById('forms_pokedex');
const limit = 9
let offset = 0
const MaxPokemons = 225

pokedex_search.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById("pokemon_identify");
    const pokemon_gif = document.getElementsByClassName("add_gif");
    
    get_Pokemon_Gif(id.value).then((response) => {
        if(response)
        {
            pokemon_gif[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${response.id}.gif`;
            pokemon_gif[1].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${response.id}.gif`;
        }
    })
})

async function get_Pokemon_Gif(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`)
                .then((response) => response.json())
                .catch(error => console.log('Erro na Requisição / Pokemon Inválido'))
}

function Pokemon_2_Li(Pokemon_card){
    return ` 
    <li id="${Pokemon_card.id}" class="pokemon ${Pokemon_card.type}">
        <span class="number">#${Pokemon_card.number}</span>
        <span class="name">${Pokemon_card.name}</span>

        <div class="about">
            <ol class="types">
                ${Pokemon_card.types.map((type) => `<li>${type}</li>`).join('')}
            </ol>
            <div class="img_pokemon">
                <img src="${Pokemon_card.img}" alt="${Pokemon_card.name}">
            </div>
        </div>
    </li>
    `
}

function Load_pokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemon_List = []) => {
        const NewHTML = pokemon_List.map(Pokemon_2_Li).join("");
        pokemons_card.innerHTML += NewHTML;
    })
}
Load_pokemons(offset, limit)

function Load_Pokemons_New_Page(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemon_List = []) => {
        const NewHTML = pokemon_List.map(Pokemon_2_Li).join("");
        pokemons_card.innerHTML = NewHTML;
    })
}

loadMore.addEventListener('click', () => {
    offset += limit
    Load_pokemons(offset, limit)
    
})

nextPage.addEventListener('click', () => {
    offset += limit
    Load_Pokemons_New_Page(offset, limit)
    
})

prevPage.addEventListener('click', () => {
    if((offset != 0) && (offset - limit >= 0)){
        offset -= limit
        Load_Pokemons_New_Page(offset, limit)
    }
})

//Limita os pokemons caso necessário
function get_Max_Pokemons() {
    if(offset + (2*limit) <= MaxPokemons)
        return true
    else
        return false
}