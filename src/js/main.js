'use strict';

//Variables

const inputElement = document.querySelector('.js_input_element');
const searchBtn = document.querySelector('.js_search');
//const resetBtn = document.querySelector('.js_reset_btn');
const listFavourite = document.querySelector('.js_favorite');
const listCocktail = document.querySelector('.js_list_cocktail');
const margatitaUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

let listCocktailData = [];
let listFavouriteData = [];

//Fetch obtener los datos de la lista de margaritas al abrir la página.

fetch(margatitaUrl)
  .then((response) => response.json())
  .then((data) => {
    listCocktailData = data.drinks;
    renderCocktails(listCocktailData);
  });

//creo una funcion donde hacer click en burcar la usuaria pueda buscar en la API cualquier coctel.

function handleClickBtn(ev) {
  ev.preventDefault();
  const selectCocktails = inputElement.value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectCocktails}`
  )
    .then((response) => response.json())
    .then((data) => {
      listCocktailData = data.drinks;
      listCocktail.innerHTML = '';
      renderCocktails(listCocktailData);
    });
}
//creo un funcion que mediante un for...of recorremos la lista de los cocteles.

function renderCocktails(cocktails) {
  for (const cocktail of cocktails) {
    listCocktail.innerHTML += `<li>
    <article class='cocktail js-li-cocktail' id=${cocktail.idDrink}>
        <img src="${cocktail.strDrinkThumb}" alt="Cocktail img" class="cocktail_img">
        <h3 class="cocktail_title">${cocktail.strDrink}</h3>
        <ul class="cocktail__colorslist">`;
  }
  addEventToCocktails();
}

function handleClickElementLi(ev) {
  const idSelected = ev.currentTarget.id;
  const slcCocktails = listCocktailData.find(
    (cocktail) => cocktail.strDrink === idSelected
  );
  const indexCocktail = listFavouriteData.findInde(
    (cocktail) => cocktail.id === idSelected
  );
  if (indexCocktail === -1) {
    ev.currentTarget.classList.add('select');
    listFavouriteData.push(slcCocktails);
  } else {
    ev.currentTarget.classList.remove('select');
    listFavouriteData.splice(indexCocktail, 1);
  }

  renderListFavourite(listFavouriteData);
  localStorage.setItem('itemCocktails', JSON.stringify(listFavouriteData));
}

function renderListFavourite(favCocktails) {
  listFavourite.innerHTML = '';
  for (const favCocktail of favCocktails) {
    listFavourite.innerHTML += renderCocktails(favCocktail);
  }
}
//Creamos la función que va a sacar todos los LI (mediante bucle)
function addEventToCocktails() {
  const elementLi = document.querySelectorAll('.js-elementLi');
  for (const li of elementLi) {
    li.addEventListener('click', handleClickElementLi);
  }
}
//evento asociado a la busqueda de la usuaria
searchBtn.addEventListener('click', handleClickBtn);
