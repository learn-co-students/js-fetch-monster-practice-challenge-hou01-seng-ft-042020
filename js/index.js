let num = 1
const url = `http://localhost:3000/monsters/?_limit=50&_page=${num}`
const monsDiv = document.querySelector('#monster-container')
const newMonsDiv = document.querySelector('#create-monster')
const newMonsForm = document.createElement('form')
const btnBack = document.querySelector('#back')
btnBack.addEventListener('click',(e) => {
  monsDiv.innerHTML = ''
  if (num > 1){
    num = num - 1
  }
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
  .then(res => res.json())
  .then(monsJson => {
    for (const monster of monsJson){
      getMonster(monster);
    }
  })
})

const btnForward = document.querySelector('#forward')
btnForward.addEventListener('click',(e) => {
  monsDiv.innerHTML = ''
  num = num + 1
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
  .then(res => res.json())
  .then(monsJson => {
    for (const monster of monsJson){
      getMonster(monster);
    }
  })
})



fetch(url)
.then(res => res.json())
.then(monsJson => {
  for (const monster of monsJson){
    getMonster(monster);
  }
  addMonster(monsJson);
})


// <h1>Monstr Inc.</h1>
// <div id='create-monster'></div>
// <div id='monster-container'></div>
// <button id="back"><=</button>
// <button id="forward">=></button>

//{
// "name": "13",
// "age": 13,
// "description": "131313",
// "id": 1001
//},


function getMonster(monster){
  const h2Name = document.createElement('h2')
  const h3Age = document.createElement('h3')
  const pDesc = document.createElement('p')

  h2Name.innerText = monster.name
  h3Age.innerText = monster.age
  pDesc.innerText = monster.description

  monsDiv.append(h2Name, h3Age, pDesc)
} 

function addMonster(newMoster){
  const inputName = document.createElement('input')
  const inputAge = document.createElement('input')
  const inputDesc = document.createElement('input')
  const btnSubmit = document.createElement('button')

  inputName.placeholder = 'Name'
  inputAge.placeholder = 'Age'
  inputDesc.placeholder = 'Description'
  btnSubmit.innerText = 'Create Monster'
  btnSubmit.type = 'submit'

  newMonsForm.append(inputName, inputAge, inputDesc, btnSubmit)
  newMonsDiv.append(newMonsForm)

  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let name = inputName.value
    let age = inputAge.value
    let description = inputDesc.value

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    })
    .then(res => res.json())
    .then(newMons => {
      getMonster(newMons)
      newMonsForm.reset()
    })
  })
}

