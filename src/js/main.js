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

//buscar y guardar listado fav en localstorage

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

//función para recorrer y pintar los li  en html y si no encuentra la imagen pone una por defecto.
function renderResultCocktail(listCocktail) {
  listCocktail.innerHTML = '';
  for (const cocktail of listCocktailData) {
    const indexCocktail = listFavouriteData.findIndex(
      (cocktailFav) => cocktail.idDrink === cocktailFav.idDrink
    );
    if (indexCocktail === -1) {
      listCocktail.innerHTML += `<li class="js_liElement" id=${cocktail.idDrink}>
    <h2 class="js_title">${cocktail.strDrink}</h2>
    <img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
    </li>`;
    } else {
      listCocktail.innerHTML += `<li class="js_liElement selected" id=${cocktail.idDrink}>
    <h2 class="js_title">${cocktail.strDrink}</h2>
    <img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
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

//funcion selected para dar click sobre imagen e incluirla en lista de favoritos, aquí es donde la imagen se pone de un color diferente.
//falta que se quede en ese color al cambiar de cocktail y volver a la misma lista???

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
  location.reload();
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
/*listCocktail.innerHTML += `<li class="js_liElement" id=${cocktail.idDrink}>
<h2 class="js_title">${cocktail.strDrink}</h2>
<img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
</li>`;*/
