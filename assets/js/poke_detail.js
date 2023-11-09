const Poke_Details = {};

const selected_pokemon = document.getElementById('pokemons_card');
const details_page = document.getElementById('show_pokemon_page');

details_page.addEventListener("click", function(e) {

    if(e.target.closest("#back")){
        details_page.style.display = "none";
        details_page.innerHTML = "";
        // console.log("O elemento com o id " + e.target.id + " foi clicado.");
    }
})

selected_pokemon.addEventListener('click', function(e) {

    if(e.target.closest(".pokemon").id)
    {
        details_page.style.display = "";

        const id = e.target.closest(".pokemon").id;
        load_Poke_Page(id);
    }
})

Poke_Details.get_Details = (id) => {
    const poke_url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(poke_url)
            .then((response) => response.json())
            .then(convert_2_PokeModel)
}

function load_Poke_Page(id){
    Poke_Details.get_Details(id).then((pokemon) => {
        pokemon = show_page(pokemon);
        details_page.innerHTML = pokemon;
    })
}


function show_page(Pokemon_card){
    return ` 
    <div id="card_details" class="pokemon_page_content ${Pokemon_card.type}" style="box-shadow: 0px 0px 10px var(--${Pokemon_card.type}-color);">
        <header class="pokemon_page_header">
            <nav class="interaction_header">
                <span id="back" class="material-symbols-outlined">arrow_back</span>
                <span class="number">#${Pokemon_card.number}</span>
                <span id="favorite" class="material-symbols-outlined">favorite</span>
            </nav>

            <div class="pokemon_page_id">
                <span class="name">${Pokemon_card.name}</span>
                <ul class="poke_types">
                    ${Pokemon_card.types.map((type) => `<li>${type}</li>`).join('')}
                </ul>
            </div>
        </header>
    
        <div class="poke_image">
            <img src="${Pokemon_card.img}" alt="Imagem ${Pokemon_card.name}">
        </div>

        <div class="poke_details">
            <h1>Base Status</h1>
            <ul class="poke_status_list">
                <li id="teste1">
                    <span>HP</span>
                    <div class="barra_externa">
                        <div id="hp_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.hp}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>ATK</span>
                    <div class="barra_externa">
                        <div id="atk_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.atk}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>DEF</span>
                    <div class="barra_externa">
                        <div id="def_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.def}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>SATK</span>
                    <div class="barra_externa">
                        <div id="satk_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.satk}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>SDEF</span>
                    <div class="barra_externa">
                        <div id="sdef_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.sdef}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>SPD</span>
                    <div class="barra_externa">
                        <div id="spd_stats" class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.spd}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `
}