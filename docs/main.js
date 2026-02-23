const criarSala = document.getElementById('criar-sala')
const deletaSala = document.getElementById('deletar-sala')
const criaNomeSala = document.getElementById('nameCreateRoom')
const criaSenhaSala = document.getElementById('passCreateRoom')
const deletaNomeSala = document.getElementById('nameDeleteRoom')

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