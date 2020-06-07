let num = 1
const url = `http://localhost:3000/monsters/?_limit=50&_page=${num}`

const createMonsterDiv = document.querySelector('#create-monster')
const createMonsterForm = document.createElement('form')
const MonsterContainerDiv = document.querySelector('#monster-container')
const btnFwd = document.querySelector('#forward')
const btnBack = document.querySelector('#back')

createNewMonster();

fetch(url)
  .then(res => res.json())
  .then(monstersJson => {
    for(const monsObj of monstersJson) {
      addMonsterToDOM(monsObj)
    }
  });

//make each monster
function addMonsterToDOM(monsObj) {
  const h2 = document.createElement('h2')
  const h4 = document.createElement('h4')
  const p = document.createElement("p")
  const monsObjDiv = document.createElement('div')

  h2.innerHTML = monsObj.name
  h4.innerHTML = monsObj.age
  p.innerHTML = monsObj.description

  MonsterContainerDiv.append(monsObjDiv)
  monsObjDiv.append(h2, h4, p)

};

//create monster form
function createNewMonster(){
  createMonsterDiv.append(createMonsterForm)

  const inputName = document.createElement('input')
  const inputAge = document.createElement('input')
  const inputDesc = document.createElement('input')
  const btnSubmit = document.createElement('button')

  inputName.placeholder = 'Name'
  inputAge.placeholder = 'Age'
  inputDesc.placeholder = 'Description'
  btnSubmit.innerText = 'Submit'

  createMonsterForm.append(inputName, inputAge, inputDesc, btnSubmit)

//POST new monster
  btnSubmit.addEventListener('click', e =>{
    e.preventDefault();

    const inputNameValue = inputName.value
    const inputAgeValue = inputAge.value
    const inputDescValue = inputDesc.value

    const options = {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify ({
        name: inputNameValue,
        age: inputAgeValue,
        description: inputDescValue
      })
    };

    fetch (url, options)
    .then(res => res.json())
    .then(monsObj => {
      addMonsterToDOM(monsObj);
      createMonsterForm.reset();
    });

  });

};

//forward and back button functionality
btnFwd.addEventListener('click', e=> {
  e.preventDefault();

  MonsterContainerDiv.innerHTML = ''

  //increase page number
  ++num

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(res => res.json())
    .then(monstersJson => {
      for (const monsObj of monstersJson) {
        addMonsterToDOM(monsObj)
      }
    });

});

btnBack.addEventListener("click", (e) => {
  e.preventDefault();

  MonsterContainerDiv.innerHTML = ''

  //decrease page number

  --num

  if (num === 0){
    num = 1
  }

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(res => res.json())
    .then(monstersJson => {
      for (const monsObj of monstersJson) {
        addMonsterToDOM(monsObj)
      }
    });

});
