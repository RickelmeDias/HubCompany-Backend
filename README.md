<h1 align="center">🏢 BACK-END NEST JS 🌎</h1>

</br>

<div align="center"><img src="./docs/assets/HubCompany-Backend.png" /></div>

<h3 align="center"> ENGLISH </h3>

> This API was created by me (Rickelme), for a challenge , the API have a CRUD for User, Companies, Places (Company branches). You also can give permissions (responsabilites) for other users watch your Company and create their places or see your places.

<h3 align="center"> PORTUGUÊS </h4>

> Essa API foi criada por mim (Rickelme), para um desafio , a API possui um CRUD para Usuario, Empresas e Locais (Filiais da empresa). Você também pode dar permissões (responsabilidades) para outros usuários visualizarem sua Empresa e criar novos locais ou verem seus locais.

</br>
<div align="center">

<h3> Techs: </h3>
<img src="https://img.shields.io/badge/Nodejs-black?&logo=Node.js&logoColor=green" />
<img src="https://img.shields.io/badge/NestJS-black?&logo=NestJS&logoColor=red" />
<img src="https://img.shields.io/badge/Typescript-black?&logo=typescript&logoColor=blue" />
<img src="https://img.shields.io/badge/TypeORM + PostgreSQL-black?&logo=PostgreSQL&logoColor=white" />
<img src="https://img.shields.io/badge/JWT Token-black?&logo=JSON Web Tokens&logoColor=white" />
<img src="https://img.shields.io/badge/Heroku Deploy-black?&logo=Heroku&logoColor=pink" />
<img src="https://img.shields.io/badge/Swagger Documentation API-black?&logo=Swagger&logoColor=green" />
</br>
<h3> Design: </h3>
<img src="https://img.shields.io/badge/HTML-black?&logo=html5&logoColor=red" />
<img src="https://img.shields.io/badge/CSS-black?&logo=css3&logoColor=blue" />
<img src="https://img.shields.io/badge/Canva-black?&logo=canva&logoColor=blue" />
<img src="https://img.shields.io/badge/Figma-black?&logo=figma&logoColor=orange" />
</div>

</br>
<hr/>
</br>

## 🤔 ABOUT THE IDEA 🤔

🤔 [QUAL A IDEIA DO PROJETO?](#ideia-do-projeto)


</br>

## 📖 DOCUMENTATION 📖

📖 [DOCUMENTACAO EM PORTUGUES](#DOCUMENTACAO-EM-PORTUGUES)


</br>

## 🚀 RESULTS 🚀

🚀 [RESULTADOS DO PROJETO](#resultados-do-projeto)


</br>
<hr/>
</br>

## IDEIA DO PROJETO

### Do desenvolvimento a produção
A ideia do projeto é conseguir aplicar uma integração completa de CRUD e interação entre tabelas, saindo praticamente de todo o zero com algumas tecnologias determinadas, como a utilização do NEST JS, até o Deploy no Heroku.

>" A ideia do porjeto é oferecer uma solução para o cliente criar contas e relacionar essas contas de seus sócios em suas empresas e filias dando a eles permissões para interagir. "

### Qual era o desafio do escopo
O projeto era bastante aberto quanto ao escopo, apesar de ter uma meta definida, a meta é conseguir montar um CRUD de Usuarios, Empresas e Locais (Filiais da Empresa) e interagir as tabelas do banco de dados.

### Banco de dados utilizado e integração com código
Foi utilizado para esse projeto o PostgreSQL, pois já tinha conhecimento que poderia utiliza-lo também no Heroku para deploy dev de estudo. Para criar o banco de dados, tudo isso é automatizado a partir do código, utilizando TypeORM e Entities.

### Arquitetura de Software
Para o projeto busquei definir um escopo de SOLID, como o projeto é bastante desafiador, sendo um sistema completo (Back-end, Front-End, Database e Deploy) utilizei a organização de pastas por rotas e dentro delas uma organização SOLID, dessa forma fica mais escalavel para dar a manutenção guiado ao log das rotas.

### Conhecimentos absorvidos durante o projeto
Esse projeto me mostrou a importância de entender como funcionar tanto com Back-end e Front-end, sempre gostei muito de ter minhas bases bem sólidas antes de dar um próximo passo e esse projeto conseguiu agregar muito para a estruturação das minhas bases. No projeto defini um tempo bem apertado de desenvolvimento para conseguir similar um real ambiente de altas demandas, onde é necesário aprender muita coisa e aplicar o mais rápido possivel, tanto back-end quanto front-end, além do deploy, pois entenedo que é muito importante conhecer todas as áreas, apesar de manter um foco.

</br><hr/></br>

## DOCUMENTACAO EM PORTUGUES

</br>

## Configurações iniciais para rodar o serviço
Esse projeto de API é um projeto node, então fica bem fácil rodar utilizando os scripts.

***Banco de dados**

É importante que antes de rodar o projeto você tenha um banco de dados PostgreSQL rodando em sua máquina (pode ser docker também, deixei o arquivo docker-compse que utilizei na pasta `/docs` do projeto).

***.env.development**

Também iremos precisar configurar o arquivo `.env.development` e `.env.production` antes de subir a aplicação.

### Configurando .ENV.DEVELOPMENT && .ENV.PRODUCTION

```dotenv
PORT= "3333"
SECRET_JWT_KEY="YOUR_SECRET_KEY_JWT"

DB_PASS="DATABASE_PASSWORD"
DB_USER="DATABASE_USER"
DB_HOST="localhost"
DB_NAME="DATABASE_DB_NAME"
DB_PORT="DATABASE_PORT"
```

### Comandos para rodar a aplicação
Os principais comandos para rodar a aplicação são dois:

```sh
start:dev
```

Se quiser rodar em produção:

```sh
start:prod
```
Diferente do projeto [Why We Help Your Position](https://github.com/RickelmeDias/WhyWeHelpYourPosition) por questão de tempo em realação a demanda ainda não foi feito os tests, mas devo fazer com andar dos deploys.

Onde obter as credenciais? Clique na seta abaixo:

</br><hr/></br>

## API

Para a API Documentation utilizei o Swagger que traz bastante facilidade e implementa diversas funcionalidades, ao rodar a aplicação entre no end-point: `http://localhost:PORT/api`

</br><hr/></br>


## Resultados do projeto

Como uma das propostas do desafio era fazer o back-end separado do front-end, com esse projeto de service api rodando precisamos testar via Postman/Insomina/Thunder ou outro aplicativo, mas também podemos testar se subirmos o front-end que também já está desenvolvido [clique aqui para acessar o front-end](https://github.com/RickelmeDias/HubCompany-Frontend).

</br><hr/></br>

## Developer / Desenvolvedor

> Developer who created this project. 💖

<div align="center">
<p align="center">
<img src="https://avatars.githubusercontent.com/u/43411893?s=400&u=c1a306f43d649c6c7e92cda85709ba604b20406b&v=4" width=115><br>
<a href="https://github.com/RickelmeDias">Rickelme Dias</a>
</p>
<div>