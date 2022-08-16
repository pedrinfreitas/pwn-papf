curl --request GET \
 --url https://pwn-papf-v3.herokuapp.com/api/alunos/1

curl --request GET \
 --url https://pwn-papf-v3.herokuapp.com/api/alunos

curl --request POST \
 --url https://pwn-papf-v3.herokuapp.com/api/alunos \
 --header 'Content-Type: application/json' \
 --data ' {  
 "nome": "Nome de teste",
"email": "email-teste@gmail.com",
"celular": "24123451234",
"idade": 18,
"objetivo": "hipertrofia",
"peso": "60"
}'

curl --request DELETE \
 --url https://pwn-papf-v3.herokuapp.com/api/alunos/2

curl --request PUT \
 --url https://pwn-papf-v3.herokuapp.com/api/alunos/2 \
 --header 'Content-Type: application/json' \
 --data ' {  
 "nome": "Nome de teste 2",
"email": "email-teste2@gmail.com",
"celular": "24123451234",
"idade": 19,
"objetivo": "hipertrofia",
"peso": "70"
}'

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

https://pwn-papf.herokuapp.com/api/alunos

criar: npx knex migrate:make nome_migration
rodar: npx knex migrate:latest
deletar: npx knex migrate:down

criar: npx knex seed:make 01_users
rodar: npx knex seed:run
