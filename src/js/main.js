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

//Fetch obtener los datos

fetch(margatitaUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCocktailData = data.drinks;
    renderCocktailsLis(listCocktailData);
  });

function renderCocktailsLis(listCocktailData) {
  //listCocktail.innerHTML = "";

  for (const cocktail of listCocktailData) {
    listCocktail.innerHTML += renderCocktails(cocktail);
  }
}

//pintar la lista

function renderCocktails(cocktail) {
  let html = `<li class="cocktail_list">
        <article>
            <img src="${cocktail.strDrinkThumb}" alt="Cocktail img" class="cocktail_img">
            <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        </article>
    </li> `;
  return html;
}
