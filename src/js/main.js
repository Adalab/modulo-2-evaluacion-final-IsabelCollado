'use strict';

//Variables y constantes

const inputElement = document.querySelector('.js_input_element');
const searchBtn = document.querySelector('.js_search');
const resetBtn = document.querySelector('.js_reset_btn');
const listFavourite = document.querySelector('.js_favorite');
const listCocktail = document.querySelector('.js_list_cocktail');
const margatitaUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

//array para guardar los cocteles de la lista
let listCocktailData = [];

//array para guardar los cocteles de favoritos
let listFavouriteData = [];

//Fetch obtener los datos de la lista de margaritas al abrir la página.

fetch(margatitaUrl)
  .then((response) => response.json())
  .then((data) => {
    listCocktailData = data.drinks;
    renderCocktails(listCocktailData);
  });

//creo una funcion donde hacer click en burcar, la usuaria pueda buscar en la API cualquier coctel.

function handleClickBtn(ev) {
  //para que no refresque la página
  ev.preventDefault();
  const inputValue = inputElement.value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputElement.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      listCocktailData = data.drinks;
      listCocktail.innerHTML = '';
      renderCocktails(listCocktailData);
    });
}

function handleClickBtnReset(ev) {
  ev.preventDefault();
  if (listFavouriteData !== null) {
    listFavouriteData = [];
    listFavourite.innerHTML = '';
    inputElement.value = '';
  }
}

//funcion para recoger los diferentes cocteles y pintarlos
//Y si no tuviese foto saldría una por defecto.
function renderCocktails(listCocktailData) {
  for (const cocktail of listCocktailData) {
    if (cocktail.strDrinkThumb) {
      listCocktail.innerHTML += renderStructCocktails(cocktail);
    } else {
      let html = `<li class="js_liElement selected" id=${cocktail.idDrink}><h2 class="js_title">${cocktail.strDrink}</h2></li>
  <img src= https://via.placeholder.com/210x295/ffffff/666666/?text=TV /> title="${cocktail.strDrink} class="cocktail_img" />`;

      return html;
    }
  }
  addEventToCocktails();
}
//creo funcion para la estructura del li html (ya que se repite) y los pinte.

function renderStructCocktails(cocktail) {
  let html = `<li class="js_liElement" id=${cocktail.idDrink}>
  <h2 class="js_title">${cocktail.strDrink}</h2>
  <img src=${cocktail.strDrinkThumb} class="cocktail_img" title="${cocktail.strDrink}"/>
  </li>`;
  return html;
}

//guardar los favoritos
//Creamos la función manejadora del evento al hacer click sobre la imagen.

function handleClick(ev) {
  const idSelected = ev.currentTarget.id;

  //find devuelve el primer elemento
  const selectedCocktail = listCocktailData.find(
    (cocktail) => cocktail.idDrink === idSelected
  );

  //findIndex devuelve la posición donde está un elemento o -1 si es que no está
  const indexCocktail = listFavouriteData.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  //aquí se comprueba si tiene
  if (indexCocktail === -1) {
    //push para guardar en el listado
    ev.currentTarget.classList.add('selected');
    listFavouriteData.push(selectedCocktail);
  } else {
    //splice elimina el elemento de desde una posición.
    ev.currentTarget.classList.remove('selected');
    listFavouriteData.splice(indexCocktail, 1);
  }

  //pintar favoritos
  renderListFavourite(listFavouriteData);
}

// funcion para guardar favoritos

function renderListFavourite(favCocktails) {
  listFavourite.innerHTML = '';
  for (const Cocktail of favCocktails) {
    listFavourite.innerHTML += renderStructCocktails(Cocktail);
  }
}

//esta funcion nos da la informacion de cada li.
function addEventToCocktails() {
  const lielementList = document.querySelectorAll('.js_liElement');
  for (const li of lielementList) {
    li.addEventListener('click', handleClick);
  }
}

//evento asociado a la busqueda de la usuaria
searchBtn.addEventListener('click', handleClickBtn);
resetBtn.addEventListener('click', handleClickBtnReset);
