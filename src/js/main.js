'use strict';

//Variables y constantes

const inputElement = document.querySelector('.js_input_element');
const searchBtn = document.querySelector('.js_search');
const resetBtn = document.querySelector('.js_reset_btn');
const resetBtnFav = document.querySelector('.js_reset_fav');
const listFavourite = document.querySelector('.js_favorite');
const listCocktail = document.querySelector('.js_list_cocktail');
const margatitaUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

//array para guardar los cocteles de la lista
let listCocktailData = [];

//array para guardar los cocteles de favoritos
let listFavouriteData = [];

//buscar en localstorage

const cocktailStored = JSON.parse(localStorage.getItem('favoriteCocktail'));
if (cocktailStored) {
  listFavouriteData = cocktailStored;
  renderFavorite(listFavourite);
}

//Fetch obtener los datos de la lista de margaritas al abrir la página.

const listDataStored = JSON.parse(localStorage.getItem('coctail'));
if (listDataStored) {
  listCocktailData = listDataStored;
  renderResultCocktail(listCocktail);
} else {
  fetch(margatitaUrl)
    .then((response) => response.json())
    .then((data) => {
      listCocktailData = data.drinks;
      renderResultCocktail(listCocktail);
      localStorage.setItem('coctail', JSON.stringify(listCocktailData));
    });
}
//creo una funcion manejadora del bonton buscar, hacer click la usuaria pueda buscar en la API cualquier coctel.
//para que no refresque la página

function handleClickBtn(ev) {
  ev.preventDefault();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputElement.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      listCocktailData = data.drinks;
      inputElement.value = '';
      renderResultCocktail(listCocktail);
    });
}

//función para pintar el resultado en html.
function renderResultCocktail(listCocktail) {
  listCocktail.innerHTML = '';
  for (const cocktail of listCocktailData) {
    if (cocktail.strDrinkThumb) {
      listCocktail.innerHTML += `<li class="js_liElement" id=${cocktail.idDrink}>
    <h2 class="js_title">${cocktail.strDrink}</h2>
    <img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
    </li>`;
    } else {
      listCocktail.innerHTML += `<li class="js_liElement" id=${cocktail.idDrink}>
    <h2 class="js_title">${cocktail.strDrink}</h2>
    <img src="https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg" class="cocktail_img" title="${cocktail.strDrink}"/>
    </li>`;
    }
    addEventToCocktails();
  }
}

//funcion lista favoritos.

function renderFavorite(listFavourite) {
  listFavourite.innerHTML = '';
  for (const cocktail of listFavouriteData) {
    listFavourite.innerHTML += `<li class="js_liElement" id=${cocktail.idDrink}>
    <h2 class="js_title">${cocktail.strDrink}</h2>
    <img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
    </li>`;
  }
}

//function handleClickFavouriteX(ev) {}

function handleClick(ev) {
  const idSelectedCocktail = ev.currentTarget.id;
  const selectedCocktail = listCocktailData.find(
    (cocktail) => cocktail.idDrink === idSelectedCocktail
  );
  const indexCocktail = listFavouriteData.findIndex(
    (cocktail) => cocktail.idDrink === idSelectedCocktail
  );
  //aquí se comprueba si esta en fav, -1 es no.
  if (indexCocktail === -1) {
    //push para guardar en el listado
    ev.currentTarget.classList.add('selected');
    listFavouriteData.push(selectedCocktail);
  } else {
    //splice elimina de fav.
    ev.currentTarget.classList.remove('selected');
    listFavouriteData.splice(indexCocktail, 1);
  }
  renderFavorite(listFavourite);

  localStorage.setItem('favoriteCocktail', JSON.stringify(listFavouriteData));
}

//esta funcion nos da la informacion de cada li.
function addEventToCocktails() {
  const lielementList = document.querySelectorAll('.js_liElement');
  for (const li of lielementList) {
    li.addEventListener('click', handleClick);
  }
}

//funcion boton reset, debe quitar elementos del input donde la usuaria busca su cocktail.
function handleClickBtnReset(ev) {
  ev.preventDefault();
  inputElement.value = '';
  location.reload(); //lleva la pagina a default.
}

//funcion para que al dar a la basurita se elimine la lista de favoritos y queda la pagina por defecto
function handleClickResetBtnFav(ev) {
  ev.preventDefault();
  listFavouriteData = [];
  listFavourite.innerHTML = '';
  localStorage.removeItem('favoriteCocktail');
  inputElement.value = '';
  location.reload();
}

//eventos
searchBtn.addEventListener('click', handleClickBtn);
resetBtn.addEventListener('click', handleClickBtnReset);

resetBtnFav.addEventListener('click', handleClickResetBtnFav);
