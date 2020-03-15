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

import app from './src/app'

const port = process.env.PORT || '8000'

app.listen(port)

console.log(`Listening on port ${port}`)