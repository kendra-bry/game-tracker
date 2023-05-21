// import DataSource from './modules/DataSource.mjs';
// import GameListing from './modules/GameList.mjs';

// const dataSource = new DataSource();
// const cardHolder = document.querySelector('#card-holder');

// const gameList = new GameListing(dataSource, cardHolder);
// gameList.init();
console.log(import.meta.env);
const baseURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
console.log({ baseURL });