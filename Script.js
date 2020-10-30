const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("vbudithi");

async function getUser(username){
      const resp = await fetch(APIURL + username);
      const respData = await resp.json();

      createUserCard(respData);

      getRepos(username);
}

 async function getRepos(username){
     const resp = await fetch(APIURL + username + "/repos");
     const respData = await resp.json();

     addReposToCard(respData);
 }

function createUserCard(user){
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

                <h4>Repos:</h4>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML; 
}

function addReposToCard(repos){
    const reposE1 = document.getElementById
    ("repos");

    repos
        .sort((a,b) => a.stargazers_count - b.stargazers_count)
        .slice(0,10)
        .forEach(repo =>{
            const repoE1 = document.createElement('a');
            repoE1.classList.add('repo');

            repoE1.href = repo.html_url;
            repoE1.target="_blank";
            repoE1.innerText = repo.name;

            reposE1.appendChild(repoE1);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);
        search.value = " ";
    }
});