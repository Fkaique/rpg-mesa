const serverState = document.getElementById('server-state')
const criarSala = document.getElementById('criar-sala')
const deletaSala = document.getElementById('deletar-sala')
const criaNomeSala = document.getElementById('nameCreateRoom')
const criaSenhaSala = document.getElementById('passCreateRoom')
const deletaNomeSala = document.getElementById('nameDeleteRoom')

let state = "Conectando ao servidor..."

function checkServer() {
    serverState.textContent = "Conectando ao servidor..."

    fetch("https://rpg-mesa-q0t2.onrender.com/health")
        .then(res => {
            if (!res.ok) throw new Error()
            serverState.textContent = "Servidor online"
        })
        .catch(() => {
            serverState.textContent = "Conectando ao servidor..."
        })
}

checkServer()
setInterval(checkServer, 5000)

criarSala.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('https://rpg-mesa-q0t2.onrender.com/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: criaNomeSala.value,
            pass: criaSenhaSala.value
        })
    })
        .then(res => res.json())
        .then(data => console.log("Criado:", data))
})

deletaSala.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch(`https://rpg-mesa-q0t2.onrender.com/rooms/${deletaNomeSala.value}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => console.log("Deletado", data))
})


fetch('https://rpg-mesa-q0t2.onrender.com/rooms')
    .then(res => res.json())
    .then(data => console.log("Lista:", data))

//