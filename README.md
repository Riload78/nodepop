
# NodePOP

Develop the API that will run on the server of a service selling articles. The service maintains advertisements for the purchase or sale of items and allows you to search and filter by various criteria. El servidor da servicio a una API y a un website.

It has two forms of authentication, JWT for the API and a session system for the website part.

The website is made with EJS templates and has a translation system. In addition, it has a user area where the user's products are listed. 

For the queue services, RabbitMQ has been used, which manages the sending of emails when the user logs in and a thumbnail creation service when new products are created.

Jest and Supertest have been used for API testing

A log system has been implemented with Winston

Chache system API with Redis

![Static Badge](https://img.shields.io/badge/NODE-8A2BE2)
![Static Badge](https://img.shields.io/badge/EXPRESS-94E33B)
![Static Badge](https://img.shields.io/badge/MONGO-EDCE72)
![Static Badge](https://img.shields.io/badge/EJS-F679FC)
![Static Badge](https://img.shields.io/badge/SWAGEER-BD415B)
![Static Badge](https://img.shields.io/badge/JWT-3F7C85)
![Static Badge](https://img.shields.io/badge/JEST-00CCBF)
![Static Badge](https://img.shields.io/badge/SUPERTEST-72F2EB)
![Static Badge](https://img.shields.io/badge/RABBITMQ-747E7E)
![Static Badge](https://img.shields.io/badge/REDIS-103778)
![Static Badge](https://img.shields.io/badge/WINSTON-FF7A48)


## Run Locally

Clone the project

SSH
```bash
  git clone git@github.com:Riload78/nodepop.git
```
HTTPS
```bash
  git clone https://github.com/Riload78/nodepop.git
```

Go to the project directory

```bash
  cd nodepop
```

Install dependencies

```bash
  npm install
```

Duplicate .env.template file and rename as .env . After complete required information 

```bash
DB_HOST=
DB_PORT=
DB_NAME=
DB_TEST_NAME=
JWT_SECRET=
MAIL_FROM=
MAIL_SERVICE=
MAIL_USER=
MAIL_PASS=
AMQP_URL=
```

### Install Database

Run the two commands to install the application database and the testing database

Database for App
```bash
npm run initDB
```

### Install docker dependencies
Installing Redis and RabbitMQ
````
docker-compose up -d redis  mq
````
To access Redis via console
````
docker exec -it <Container id> /bin/sh
redis-cli
````
### RabbitMQ config
May need to be added to vhost
```
127.0.0.1 mq
```
#### Exchange Configuration
Execute the following commands through the console to start the queues

```bash
npm run publisher
```
```bash
npm run consumer
```
Access the RabbitMq dashboard and configure exchange routing
To access the RabbitMQ panel it must be done through port 8080. For example
````
http://localhost:8080/
````

Credenciales:
Username: guest - Password: guest


![Imagen 1](https://raw.githubusercontent.com/Riload78/nodepop/main/asset-github/exchange.png)
![Imagen 2](https://raw.githubusercontent.com/Riload78/nodepop/main/asset-github/queue.png)

## Start the server

```bash
  npm run dev
```

## Test

To run the tests, you must first install the test DB
Install Database for Testing
```bash
  npm run initDB:test
```
Run the testst
```bash
  npm run test
```
```bash
  npm run test:watch
```

## User Credentials for the Website
Username: user@example.com - Password: 1234


Username: user2@example.com - Password: 1234


## API Reference
When server is running, you cant access to the documentation **[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/#/Anuncios/getAnuncios)** 

#### Get all items

```http
  GET /apiv1/anuncios
```

| Parameter | Type     | Description                                                                                  | Example                         |
| :-------- | :------- | :------------------------------------------------------------------------------------------- |:------------------------------- |
| `nombre`  | `string` | Filter by name                                                                               | /apiv1/anuncios?nombre="string" |
| `tags`    | `string` | Filter by tag. To filter by more tags, separate them with a ","                              | /apiv1/anuncios?tags="string"   |
| `venta`   | `boolean`| Filter by true or false. Filter ads that are for sale (venta=true) or in search (venta=false)| /apiv1/anuncios?venta=true      |
| `precio ` | `string` | price range (min. price and max. price)                                                      | /apiv1/anuncios?precio=10-50    |
| `skip `   | `number` | Number of records to skip.                                                                   | /apiv1/anuncios?skip=8          |
| `limit `  | `number` | Max number of record to return.                                                              | /apiv1/anuncios?limit=8         |
| `short `  | `string` | Sort property. Prefix with "-" for descending. For more one sort, separate with space        | /apiv1/anuncios?short=nombre    |


#### Get item

```http
  GET /apiv1/anuncios/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Get Ad by id                     |


#### Create item

```http
  POST /api/anuncios
```


#### Update item

```http
  POST /api/anuncios/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Create new Ad                     |

#### Delete item

```http
  DELETE /api/anuncios/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Remove Ad by id                        |


#### Get all tags

```http
  GET /apiv1/tags
```



## Author

- [Riload78](https://github.com/Riload78)



## Roadmap
In progress
- Delegate LOGS to microservices

- Improve API performance


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://riload78.github.io/portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


