"use strict";

console.log(">> Ready :");

//Variables

const inputElement = document.querySelector(".js_input_element");

const searchBtn = document.querySelector(".js_search");

const resetBtn = document.querySelector(".js_reset_btn");
const ulFav = document.querySelector(".js_favorite");
const listCocktel = document.querySelector(".js_list_cocktail");
const url =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

let listCocktelData = [];

//Fetch obtener los datos

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listCocktelData = data.cocktels;
    renderCocktelList(listCocktelData);
  });

//Pinta todos los elementos de la lista

function renderCocktelList(listCocktelData) {
  for (const cocktel of listCocktelData) {
    listCocktel.innerHTML += renderCocktel(cocktel);
  }
}

//Pintar un elemento de la lista

function renderCocktel(cocktel) {
  let html = `<li>

<article class= 'cocktel js_li_cocktel'>
<h3 class= 'cocktel_title'>${item.name} </h3>
<img class= 'img_cocktel' src=${url} alt= 'cocktel'/>
<ul class= 
</article>
</li>`;

  return html;
}

ev.currentTarget.classList.toggle("selected");
