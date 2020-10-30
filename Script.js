const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function getUser(user){
      const resp = await fetch(APIURL + user);
      const respData = await resp.json();

      createUserCard(respData);
}

function createUserCard(user){
    const card = document.createElement("div");
    card.classList.add("card");

   const cardHTML = `
        <div class="card">  
           
            <div>
                <img class ="avatar" src ="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <hr />
               
                <p>${user.bio} </p>
          
                <ul class="info">
                    <li><Strong>Followers</strong> ${user.followers} </li>
                    <li><strong>Following</strong> ${user.following} </li>
                    <li><strong>Github Repos</strong> ${user.public_repos}</li>
                </ul>
                <p class="icon"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </p>
                  <p>(<i>${user.location})</i></p>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML; 
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);
        search.value = " ";
    }
});