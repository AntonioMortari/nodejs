const express = require('express')
const app = express()

app.get('/', (req,res) =>{
    res.send('Home')
})

app.get('/sobre', (req,res) =>{
    res.send('Sobre')
})

app.get('/contato', (req,res) =>{
    res.send('Contato')
})


port = 5000
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})