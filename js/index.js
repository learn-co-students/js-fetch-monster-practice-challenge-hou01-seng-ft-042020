let num = 1
const monstersURL = "http://localhost:3000/monsters"
const monsterPanel = document.getElementById("monster-container")
const createDiv = document.getElementById("create-monster")
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward")

function monsterForm() {
    const mForm = document.createElement("form")
    mForm.id = "monster-form"
    mForm.method = "post"
    mForm.action = "submit"

    const labelName = document.createElement("label")
    labelName.innerText = "Name"
    const inputName = document.createElement("input")
    inputName.type = "text"
    inputName.name = "name"
    inputName.placeholder = "name"

    const labelAge = document.createElement("label")
    labelAge.innerText = "Age"
    const inputAge = document.createElement("input")
    inputAge.type = "text"
    inputAge.name = "age"
    inputAge.placeholder = "age"

    const labelDesc = document.createElement("label")
    labelDesc.innerText = "Description"
    const inputDesc = document.createElement("input")
    inputDesc.type = "text"
    inputDesc.name = "description"
    inputDesc.placeholder = "description"

    const inputSubmit = document.createElement("input")
    inputSubmit.type = "submit"
    inputSubmit.value = "Submit"

    mForm.append(labelName, inputName, labelAge, inputAge, labelDesc, inputDesc, inputSubmit)
    createDiv.append(mForm)

    mForm.addEventListener("submit", e => {
        e.preventDefault()
        createMonster(e)
        e.target.reset()
    })
}

function createMonster(e) {
    const newName = e.target[0].value
    const newAge = e.target[1].value
    const newDesc = e.target[2].value
    newMonsterToDb(newName, newAge, newDesc)
    
}

function newMonsterToDb(newname, newage, newdesc) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: newname,
            age: newage,
            description: newdesc
        })
    };
    return fetch(monstersURL, options)
        .then(res => res.json())
        .then(newObj => {
            displayMonsters(newObj)
        })
        
}

function buttonClicks() {
    backBtn.addEventListener("click", () => {
        monsterPanel.innerText = ""
        if (num > 1) {
            num--
            getMonsters(num)
        } else {
            getMonsters(num)
        }
    })
    forwardBtn.addEventListener("click", () => {
        monsterPanel.innerText = ""
        num++
        getMonsters(num)
    })
}

function main() {
    monsterForm()
    getMonsters(num)
    buttonClicks()
}

function getMonsters(newnum) {
    return fetch(monstersURL + `/?_limit=50&_page=${newnum}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(displayMonsters))
}

function displayMonsters(monster) {
    const mDiv = document.createElement("div")
    const mName = document.createElement("h3")
    const mAge = document.createElement("p")
    const mDescription = document.createElement("p")

    mName.innerText = monster.name
    mAge.innerText = monster.age
    mDescription.innerText = monster.description

    mDiv.append(mName, mAge, mDescription)
    monsterPanel.append(mDiv)

}

main()


