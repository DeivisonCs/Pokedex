
const pokemons_card = document.getElementById('pokemons_card')
const loadMore = document.getElementById('loadMore');
const nextPage = document.getElementById('nextPage');
const prevPage = document.getElementById('prevPage');
const limit = 9
let offset = 0

function Pokemon_2_Li(Pokemon_card){
    return ` 
    <li class="pokemon ${Pokemon_card.type}">
        <span class="number">#${Pokemon_card.id}</span>
        <span class="name">${Pokemon_card.name}</span>

        <div class="about">
            <ol class="types">
                ${Pokemon_card.types.map((type) => `<li>${type}</li>`).join('')}
            </ol>
            <img src="${Pokemon_card.img}" alt="${Pokemon_card.name}">
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
    
    if(offset != 0 && (offset -= limit) != 0)
        offset -= limit
        Load_Pokemons_New_Page(offset, limit)
})