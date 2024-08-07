commandos para rodar o banco mysql com docker
docker exec -it mysql_db /bin /bash
 ira aparecer uma msg no terminal bash-5.1# e acrescente o codigo abaixo
 mysql -u root -p

a senha para conectar é rootpassword

Comando npm run start:dev para rodar o projeto


#Rotas


POST http://localhost:3000/clientes/criar     Criar um Cliente


DELETE http://localhost:3000/ordemServicos/Id   Deletar uma ordem de serviço


POST http://localhost:3000/ordemServicos      Criar uma nova ordem de serviço


GET  http://localhost:3000/ordemServicos      Busca todos os serviços


PUT http://localhost:3000/ordemServicos/atualizar-status  Atualiza o status do serviço


GET http://localhost:3000/ordemServicos/cliente/Id Busca todos os serviços de um cliente


GET http://localhost:3000/clientes  Busca todos os clientes
