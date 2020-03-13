/*
Desenvolver um webapp de uma biblioteca para realizar as operações:
    Listar todos os autores disponíveis e seus livros;
    Cadastrar, editar e excluir autor;
    Cadastrar, editar e excluir livro;

Além das funcionalidades, serão considerados os extras:
    Busca
    Paginação
    Usabilidade
    Organização do código
    Utilização de Docker para deploy
*/


const express = require('express') //importacao do pacote

const app = express() //instanciando express

const authors = [
    {
        first_name: 'Author',
        last_name: 'One'
    },
    {
        first_name: 'Author',
        last_name: 'Two'
    },
    {
        first_name: 'Author',
        last_name: 'Three'
    },
    {
        first_name: 'Author',
        last_name: 'Four'
    }
  ]

app.get('/api/author/', function (req, res) { //endereco da requisicao onde e retornado hello world
  res.send(authors)
})

app.listen(3000) //execucao do servidor