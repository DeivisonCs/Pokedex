
const selected_pokemon = document.getElementById('pokemons_card');
const return_button = document.getElementById('back');
const details_page = document.getElementById('show_pokemon_page');

return_button.addEventListener("click", () => {
   details_page.style.display = "none";
})


selected_pokemon.addEventListener('click', function(e) {
    if(e.target.closest(".pokemon").id)
        details_page.style.display = "";
    // console.log(e.target.closest(".pokemon").id);
})
// console.log("teste");