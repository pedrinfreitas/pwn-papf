# METODOS

- GET - buscar
- POST - inserir
- PUT - alterar
- PATCH - alterar um campo especifico
- DELETE - deletar

# PARAMETROS

- Route params - indentificar um recurso
- Query params - paginação, filtro
- Body params - objetos inserção/alterção

https://pwn-papf.herokuapp.com/api/produtos

criar: npx knex migrate:make nome_migration
rodar: npx knex migrate:latest

criar: npx knex seed:make 01_users
rodar: npx knex seed:run
