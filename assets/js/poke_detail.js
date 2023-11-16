const Poke_Details = {};

const selected_pokemon = document.getElementById('pokemons_card');
const details_page = document.getElementById('show_pokemon_page');
const details_pokedex_button = document.getElementsByClassName('see_more_pokedex_button');

details_page.addEventListener("click", function(e) {

    if(e.target.closest("#back")){
        details_page.style.display = "none";
        details_page.innerHTML = "";
        // console.log("O elemento com o id " + e.target.id + " foi clicado.");
    }
})

details_pokedex_button[0].addEventListener('click', function(e) {

    const details_id = details_pokedex_button[0].id;
    load_Poke_Page(details_id);
})

selected_pokemon.addEventListener('click', function(e) {

    if(e.target.closest(".pokemon").id)
    {
        const id = e.target.closest(".pokemon").id;
        load_Poke_Page(id);
    }
})

Poke_Details.get_Details = (id) => {
    const poke_url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    return fetch(poke_url)
            .then((response) => response.json())
            .then( async (body) => {
                body.forms = body.forms.concat(await show_gender(body.id))
                return body
            })
            .then(convert_2_PokeModel)
}

async function load_Poke_Page(id){
    details_page.style.display = "block";

    Poke_Details.get_Details(id).then((pokemon) => {
        pokemon = show_page(pokemon);
        details_page.innerHTML = pokemon;
    })
}

const fetch_gender = async (id, page) => {
    const url_w_id = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const ApiResp = await fetch( `https://pokeapi.co/api/v2/gender/${page}/`);

    const ApiJson = await ApiResp.json();
    
    let i = 0;
    while(ApiJson.pokemon_species_details[i] != null)
    {
        if(ApiJson.pokemon_species_details[i].pokemon_species.url == url_w_id){
            return ApiJson.pokemon_species_details[i].rate
        }
        i++
    }
} 

const show_gender = async (id) => {
    let page = 1;
    let gender = undefined;

    while(gender == undefined){
        gender = await fetch_gender(id, page);
        page++;
    }
    
    return gender
    console.log(gender);
}
// show_gender(384)

const show_gender_html = (gender) => {
    console.log(gender)
    console.log(details_page)
    if(gender == undefined){
        const genders = details_page.closest(".gender_list").className[0];
        console.log(genders)
        genders.style.display = 'none';
    }
    else{
        const genders = details_page.closest(".undefined_output").className[0];
        console.log(genders)
        genders.style.display = 'none';
    }
}

function show_page(Pokemon_card){
    return ` 
    <div class="poke_page_content">
    <div id="card_details" class="pokemon_page_content ${Pokemon_card.type}" style="box-shadow: 0px 0px 5px var(--${Pokemon_card.type}-color);">
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
            <img src="${Pokemon_card.img3D}" alt="Imagem ${Pokemon_card.name}">
        </div>

        <div class="poke_details">
            <h2>Base Status</h2>
            <ul class="poke_status_list">
                <li>
                    <span>HP</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.hp}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="hp_stats">${Pokemon_card.hp}/100</span>
                </li>
                <li>
                    <span>ATK</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.atk}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="atk_stats">${Pokemon_card.atk}/100</span>
                </li>
                <li>
                    <span>DEF</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.def}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="def_stats">${Pokemon_card.def}/100</span>
                </li>
                <li>
                    <span>SATK</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.satk}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="satk_stats">${Pokemon_card.satk}/100</span>
                </li>
                <li>
                    <span>SDEF</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.sdef}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="sdef_stats">${Pokemon_card.def}/100</span>
                </li>
                <li>
                    <span>SPD</span>
                    <div class="barra_externa">
                        <div class="barra_interna ${Pokemon_card.type}" style="width: ${Pokemon_card.spd}%;">
                            <div class="efeito_interno"></div>
                        </div>
                    </div>
                    <span class="spd_stats">${Pokemon_card.spd}/100</span>
                </li>
            </ul>

            <h2 class="about_details">About</h2>
            <ul class="caracteristic_list">
                <li>
                    <span class="caracteristic_name">Altura:</span>
                    <span class="caracteristc_number">${Pokemon_card.height}m <aside>( ${(Pokemon_card.height /10).toFixed(2)}cm )</aside></span>
                    
                </li>
                <li>
                    <span class="caracteristic_name">Peso:</span>
                    <span class="caracteristc_number">${Pokemon_card.weight}Kg <aside>( ${(Pokemon_card.weight *1000).toFixed(2)}g )</aside></span>
                    
                </li>
                <li class="li_genders">
                    <span class="caracteristic_name">Gender:</span>
                    <div class="gender_list ${Pokemon_card.gender_m}">
                        <span class="material-symbols-outlined gender_m">male</span>
                        <span class="caracteristc_number">${Pokemon_card.gender_m}%</span>
                        <span class="material-symbols-outlined gender_f">female</span>
                        <span class="caracteristc_number">${Pokemon_card.gender_f}%</span>
                    <div>
                </li>
            </ul>

            <h2 class="abilities_details">Abilities</h2>
            <ul class="abilities_list">
                ${Pokemon_card.abilities.map((abilitie) => `<li style="background-color: color-mix(in srgb, var(--${Pokemon_card.type}-color) 65%, white);">${abilitie}</li>`).join('')}
            </ul>
        </div>
    </div>
    </div>
    `
}