const divMonsters = document.querySelector('#monster-container');
const monsterCont = document.querySelector('#create-monster');
let num = 2;
let url = `http://localhost:3000/monsters/?_limit=5&_page=${num}`;
fetchMons(url);

function fetchMons(url){
  fetch(url)
  .then(res => res.json())
  .then(json => {
    for (const mons of json) {
      allMons(mons);
    }
    createMons();
  })
  // pageBtn();
}

function allMons(mons) {

  const h2 = document.createElement('h2');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');

  h2.innerText = mons.name;
  h4.innerText = mons.age;
  p.innerText = mons.description;

  divMonsters.append(h2, h4, p)
}

function createMons(json) {
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputAge = document.createElement('input');
  const inputDesc = document.createElement('input');
  const btnSubmit = document.createElement('button');

  inputName.placeholder ='name';
  inputAge.placeholder = 'age';
  inputDesc.placeholder= 'description';
  btnSubmit.innerText = 'Create Monster';
  btnSubmit.type = 'submit';
  form.append(inputName, inputAge, inputDesc, btnSubmit)
  monsterCont.append(form)

  form.addEventListener('submit', e => {
    e.preventDefault();
    const resultName = inputName.value;
    const resultAge = inputAge.value;
    const resultDescription = inputDesc.value;
    
    fetch('http://localhost:3000/monsters', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: resultName,
        age: resultAge,
        description: resultDescription
      })
    })
    .then(res => res.json())
    .then(json => {
      allMons(mons)
      form.reset();

    })

  })
}
// function pageBtn(){
//     divMonsters.innerHTML = "";

//   const btnBack = document.querySelector('#back');
//   const btnForward = document.querySelector('#forward');

//   // btnBack.addEventListener('click', e => {
//   //   let num = --num;
//   //   let url = `http://localhost:3000/monsters/?_limit=5&_page=${num}`;
//   // })
//   btnForward.addEventListener('click', e => {
//   num = num + 1
//   url = `http://localhost:3000/monsters/?_limit=5&_page=${num}`;
//   // window.location.href = url
//   console.log(url)
//   fetchMons(url);
//   })
  
// }

// function clearDiv() {
//   divMonsters.innerHTML = "";
// }


// <h1>Monstr Inc.</h1>
// <div id='create-monster'></div>
// <div id='monster-container'></div>
// <button id="back"><=</button>
// <button id="forward">=></button>
