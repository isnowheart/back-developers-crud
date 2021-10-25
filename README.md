# back-developers-crud
 
## Backend para CRUD de desenvolvedores


Este projeto foi desenvolvido com base nos requisitos do [processo seletivo](https://gitlab.com/felipe.furtuoso538/pontential-crud) da empresa Gazin.

Cheque a [página online](https://github.com/isnowheart/frontend-developers-crud) para frontend.

Cheque a [página online](https://github.com/isnowheart/back-developers-crud) para backend.
## Tecnologias Utilizadas
 
Abaixo as tecnologias utilizadas neste projeto.
 

  *  body-parser       version 1.19.0
  *  class-validator   version 0.13.1
  *  http              version 0.0.1
  *  nest-router       version 1.0.9
  *  pg                version 8.7.1
  *  typeorm           version 0.2.38 
 
## Serviços Utilizados
 
* Github
 
## Configuração inicial do Projeto
```
yarn install
```

### Compile e recarregue o ambiente para desenvolvimento

```
docker-compose up
```
### Compile e recarregue o ambiente de testes

```
yarn docker:test
```




## Iniciando

* Antes de começar, faça uma cópia do "env.example" e renomeie para ".env".

* Execute o ***yarn install*** para instalar as bibliotecas necessárias.

* Execute o ***docker-compose up*** para iniciar o bd.

* Após a base de dados iniciar, execute a migration, com o comando 
 ```
 yarn docker:migration:run
 ```
* Para fazer um POST para a API, é necessário enviar os seguintes campos:


 ```
 Content-Type: application/json

{
  "name": "Nome",
  "gender": "m",
  "hobby": "Hobby",
  "birthdate": "yyyy-mm-dd"
}
 ```

* As requisições são efetuadas a partir do endereço: 
***http://localhost:3000/developers***

#

## Autor
 
* **EDGAR SANTOS**: @ISNOWHEART (https://github.com/isnowheart)