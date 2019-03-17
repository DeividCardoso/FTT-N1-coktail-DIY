const urlAPICocktail = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// const urlAPIIngredient = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="; 
const urlAPICocktailId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const btnHome = document.querySelector('#home-button');
const btnSearch = document.querySelector('#search-button');
const conteudoPrincipal = document.querySelector('#conteudo-principal');


btnHome.addEventListener('click', e => {
    e.preventDefault();
    home();
})

btnSearch.addEventListener('click', e => {
    e.preventDefault();
    const cocktailText = document.querySelector('#search-text').value;
    btnSearch.focus();
    fetch(`${urlAPICocktail}${cocktailText}`)
        .then(response => response.json())
        .then(data => {
            conteudoPrincipal.innerHTML = "";
            data.drinks ? Array.from(data.drinks).forEach(drink => addDrink(drink)) : conteudoPrincipal.innerHTML = `Sem resultados para ${cocktailText}`;
        });
})

function home() {
    conteudoPrincipal.innerHTML = "";
    const section = document.createElement('section');
    section.classList.add('presentation');

    const h1 = document.createElement('h1');
    h1.innerText = "Cocktail DIY";

    const p1 = document.createElement('p');
    p1.innerText = "Desenvolvido por Deivid Cardoso da Silva";

    const p2 = document.createElement('p');
    p2.innerHTML = 'API: <a href="https://www.thecocktaildb.com/api.php" target="_blank">The Cocktail DB</a>';

    section.appendChild(h1);
    section.appendChild(p1);
    section.appendChild(p2);
    conteudoPrincipal.appendChild(section);
}

function addDrink(drink){
    // Cria um novo card
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', drinkDetails);
    card.setAttribute('idDrink',drink.idDrink);

    // Cria container do card
    const container = document.createElement('div');
    container.classList.add('container');
    container.setAttribute('idDrink',drink.idDrink);

    // Cria thumb do drink
    const image = document.createElement('img');
    image.src = drink.strDrinkThumb;
    image.alt = drink.strDrink;
    image.setAttribute('idDrink',drink.idDrink);


    // Cria título do drink
    const h4 = document.createElement('h4');
    h4.innerHTML = `${drink.strDrink}`;
    h4.setAttribute('idDrink',drink.idDrink);

    card.appendChild(image);
    card.appendChild(container);
    container.appendChild(h4);

    conteudoPrincipal.appendChild(card);
}

function drinkDetails(e){
    const idDrink = e.target.getAttribute('idDrink');
    fetch(`${urlAPICocktailId}${idDrink}`)
        .then(response => response.json())
        .then(data => {
            conteudoPrincipal.innerHTML = "";
            showDetails(data.drinks[0]);
        })
}

function showDetails(drink){
    
    const drinkDetail = document.createElement('div');
    drinkDetail.classList.add('drink-details');

    const drinkName = document.createElement('h3');
    drinkName.classList.add('drink-name');
    drinkName.innerText = `${drink.strDrink}`;

    const image = document.createElement('img');
    image.src = `${drink.strDrinkThumb}`;
    image.alt = `${drink.strDrink}`;

    const drinkIngredient = document.createElement('h4');
    drinkIngredient.classList.add('drink-ingredients');
    drinkIngredient.innerText = "ingredientes";

    
    drinkDetail.appendChild(drinkName);
    drinkDetail.appendChild(image);
    drinkDetail.appendChild(drinkIngredient);

    for(let i = 1; i < 10; i++){
        let str = `strIngredient${i}`;
        let str2 = `strMeasure${i}`;
        const ing = `${drink[str]}`;
        const measure = `${drink[str2]}`;
        if(ing !== ""){
            const p = document.createElement('p');
            p.innerText = `${measure} ${ing}`;
            drinkDetail.appendChild(p);
        }
    }

    const drinkInst = document.createElement('h4');
    drinkInst.classList.add('drink-instructions');
    drinkInst.innerText = "Como preparar";

    const how = document.createElement('p');
    how.innerText = `${drink.strInstructions}`;

    drinkDetail.appendChild(drinkInst);
    drinkDetail.appendChild(how);
    conteudoPrincipal.appendChild(drinkDetail);
}