// Elements du DOM
const cardContainer = document.getElementById("cardContainer");
// variable qui va stocker tous les pokemons
var dataPokedex = [];

// variables limiter l'affichage (range)
const rangeInput = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
let numberOfPokemonToShow = parseInt(rangeInput.value);

// variables pour trier les pokémons par nom
const btnSortNameAsc = document.getElementById("btnSortNameAsc");
const btnSortNameDesc = document.getElementById("btnSortNameDesc");

// variables pour trier les pokémons par taille
const btnSortHeightAsc = document.getElementById("btnSortHeightAsc");
const btnSortHeightDesc = document.getElementById("btnSortHeightDesc");
var sortMethod = "";

// variable pour filter les pokémons, rechercher par nom
const searchInput = document.getElementById("searchInput");
var searchTerm = "";

// récupérer les données (fetch API)
async function getDataPokedex() {
  const respone = await fetch("http://localhost:3000/pokemon");
  const data = await respone.json();
  dataPokedex = data;
  console.log("données Pokedex :", dataPokedex);
  displayPokemons();
}

// Fontion pour rechercher un pokémon
function searchPokemons() {
  searchTerm = searchInput.value.toLowerCase();
  displayPokemons();
}

// Afficher les données
function displayPokemons() {
  cardContainer.innerHTML = ""; // je vide le main
  let copiePokedex = [...dataPokedex];

  // Filtrer par texte rechercher
  if (searchTerm !== "") {
    copiePokedex = copiePokedex.filter((pokemon) => {
      const pokemonName = pokemon.name.toLowerCase();
      return pokemonName.includes(searchTerm);
    });
  }

  // Trier les pokémons par nom et par taille
  copiePokedex = copiePokedex.sort((a, b) => {
    if (sortMethod == "az") {
      return a.name.localeCompare(b.name);
    } else if (sortMethod == "za") {
      return b.name.localeCompare(a.name);
    } else if (sortMethod == "heightAsc") {
      return a.height - b.height;
    } else if (sortMethod == "heightDesc") {
      return b.height - a.height;
    }
  });

  // Limiter l'affichage
  copiePokedex = copiePokedex.slice(0, numberOfPokemonToShow);

  copiePokedex.map((pokemon) => {
    const nomPokemon = pokemon.name;
    const typePokemon = pokemon.type;
    const taillePokemon = pokemon.height;
    const imgPokemon = pokemon.image;

    cardContainer.innerHTML += `
        <div class="card">
            <h2>${nomPokemon}</h2>
            <img
            src="${imgPokemon}"
            alt="image du pokemon ${nomPokemon}"
            />
            <p>Type : <span>${taillePokemon}</span></p>
            <p>Height : <span>${typePokemon}</span></p>
        </div>
        `;
  });
}

// ajout des écouteurs événements
// bouton range : Limiter l'affichage
rangeInput.addEventListener("input", () => {
  numberOfPokemonToShow = parseInt(rangeInput.value);
  rangeValue.textContent = numberOfPokemonToShow;
  displayPokemons();
});
//

// trier les pokemons par nom dans l'ordre croissant
btnSortNameAsc.addEventListener("click", () => {
  sortMethod = "az";
  displayPokemons();
});

// trier les pokemons par nom dans l'ordre décroissant
btnSortNameDesc.addEventListener("click", () => {
  sortMethod = "za";
  displayPokemons();
});

// trier les pokémons par taille dans l'ordre croissant
btnSortHeightAsc.addEventListener("click", () => {
  sortMethod = "heightAsc";
  displayPokemons();
});

// trier les pokémons par taille dans l'ordre décroissant
btnSortHeightDesc.addEventListener("click", () => {
  sortMethod = "heightDesc";
  displayPokemons();
});

// filtrer les pokémons par nom
searchInput?.addEventListener("input", searchPokemons);

// Appelle la fonction getDataPokedex()
getDataPokedex();
