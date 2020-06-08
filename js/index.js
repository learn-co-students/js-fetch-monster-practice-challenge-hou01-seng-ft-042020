document.addEventListener("DOMContentLoaded", () => {

const monstershow = document.querySelector("#monster-container")
const createmonster = document.querySelector("#create-monster")


const monsUrl = "http://localhost:3000/monsters/?_limit=50&_page=1"
function addform() {
const form = document.createElement("FORM");
const div = document.createElement("div")
const name = document.createElement("INPUT")
const age = document.createElement("INPUT")
const description = document.createElement("INPUT")
const submit = document.createElement("INPUT")
form.setAttribute("id","create-form")
submit.setAttribute("type","submit")
submit.setAttribute("name","submit")
submit.setAttribute("value","Create Monster")

name.setAttribute("type","text")
name.setAttribute("id","name-input")
name.setAttribute("placeholder","Name")
age.setAttribute("type","text")
age.setAttribute("id","age-input")
age.setAttribute("placeholder","Age")
description.setAttribute("type","text")
description.setAttribute("id","des-input")
description.setAttribute("placeholder","Description")
form.append(name,age,description,submit)
div.append(form)
createmonster.append(div)
}

addform()

fetch(monsUrl)
    .then(res => res.json())
    .then(monster => {
        for(const mon of monster) {
            addmonsters(mon)
        }
    })

function addmonsters(obj) {
    const addLi = document.createElement("div")
    const addName = document.createElement("h2")
    const addAge = document.createElement("p")
    const addDes = document.createElement("p")
    addName.innerText = obj.name
    addAge.innerText = obj.age
    addDes.innerText = obj.description
    addLi.append(addName,addAge,addDes)
    monstershow.append(addLi)
}
const create = document.querySelector("#create-form")
create.addEventListener('submit', e => {
    e.preventDefault();
    let monsterName = document.querySelector("#name-input").value
    let monsterAge = document.querySelector("#age-input").value
    let monsterDescription = document.querySelector("#des-input").value
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: monsterName,
            age: monsterAge,
            description: monsterDescription
        })
    };
        fetch(monsUrl,option)
        .then(res => res.json())
        .then(monster => {
            addmonsters(monster);
            create.reset();
        })
})



let page = 1

const fwdbutton = document.querySelector("#forward")

fwdbutton.addEventListener("click", e => {
   
    monstershow.innerText = ''
    page++
    let dynaUrl = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
    fetch(dynaUrl)
    .then(res => res.json())
    .then (monst => {
        for(const mon of monst) {
            addmonsters(mon)
        }
    })
})

    const bckbutton = document.querySelector("#back")
    bckbutton.addEventListener("click", () => {
    //      if (page === 1)
    // null
    // else
        monstershow.innerText = ''
        page--
        let dynaUrl = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
        fetch(dynaUrl)
        .then(res => res.json())
        .then (monst => {
        for(const mon of monst) {
            addmonsters(mon)
        }
    })

    })
})
