'use strict';

console.log('>> Ready :');

//Variables

const inputElement = document.querySelector('.js_input_element');
const searchBtn = document.querySelector('.js_search');
const resetBtn = document.querySelector('.js_reset_btn');
const listFavourite = document.querySelector('.js_favorite');
const listCocktail = document.querySelector('.js_list_cocktail');
const margatitaUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

let listCocktailData = [];
let listFavouriteData = [];

//Fetch obtener los datos

fetch(margatitaUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCocktailData = data.drinks;
    renderCocktails(listCocktailData);
  });

/*function renderCocktailsLis(listCocktailData) {
  listCocktail.innerHTML = '';
  for (const cocktail of listCocktailData) {
    listCocktail.innerHTML += renderCocktails(cocktail);
  }
}*/

//Pinta todos los elementos de la lista

function renderListFavourite(listFavouriteData) {
  listFavourite.innerHTML = '';
  for (const cocktail of listFavouriteData) {
    listFavourite.innerHTML += renderCocktails(cocktail);
  }
}

//pintar la lista

function renderCocktails(cocktails) {
  for (const cocktail of cocktails) {
    listCocktail.innerHTML += `<li>
    <article class='cocktail js-li-cocktail' id=${cocktail.idDrink}>
        <img src="${cocktail.strDrinkThumb}" alt="Cocktail img" class="cocktail_img">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <ul class="cocktail__colorslist">`;
  }
}

//Guardar los favoritos

function handleClick(ev) {
  ev.currentTarget.classList.toggle('selected'); // modificar por add y remove

  const idSelected = ev.currentTarget.id;

  //find : devuelve el primer elemento que cumpla una condición

  const selectedCocktail = listFavouriteData.find(
    (cocktail) => cocktail.id === idSelected
  );
  //findeIndex: la posición donde está el elemento, o -1 sino está en el listado
  const indexCocktail = listFavouriteData.findIndex(
    (cocktail) => cocktail.id === idSelected
  );
  if (indexCocktail === -1) {
    listFavouriteData.push(selectedCocktail);
  } else {
    listFavouriteData.splice(indexCocktail, 1);
  }
  //Pintar en el listado HTML de favoritos:
  renderListFavourite(listFavouriteData);
}

inputElement.addEventListener('click', handleClick);
