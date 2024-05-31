
# NodePOP

Develop the API that will run on the server of a service selling articles. The service maintains advertisements for the purchase or sale of items and allows you to search and filter by various criteria

![Static Badge](https://img.shields.io/badge/NODE-8A2BE2)
![Static Badge](https://img.shields.io/badge/EXPRESS-94E33B)
![Static Badge](https://img.shields.io/badge/MONGO-EDCE72)
![Static Badge](https://img.shields.io/badge/EJS-F679FC)
![Static Badge](https://img.shields.io/badge/SWAGEER-BD415B)

Wiston
RabbitMQ

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

Ejecutar los dos comandos para instalar la base de datos de la aplicacion y la de testing

Database for App
```bash
  npm run initDB
```
Install Database for Testing
```bash
  npm run initDB:test
```

### Install RabbitMQ Server and config

```
docker run -d --hostname=mq --name mq -p 8080:15672 -p 5672:5672 rabbitmq:3-management
```
Es posible que haya que anadir al nuesto vhost
```
127.0.0.1 mq
```
#### Configuracion del Exchange
Ejecutar por consola los siguientes comandos para arrancar las colas

```bash
  npm run publisher
```
```bash
  npm run consumer
```
Acceder al panel de RabbitMq 
![Imagen 1](https://raw.githubusercontent.com/Riload78/nodepop/main/asset-github/exchange.png)
![Imagen 2](https://raw.githubusercontent.com/Riload78/nodepop/main/queue.png)

Start the server

```bash
  npm run dev
```

Test

Para ejecutar los test, previamente se tiene que instalar la BBDD de test
```bash
  npm run test
```
```bash
  npm run test:watch
```


## API Reference
When server is running, you cant access to the documentation **[here](http://localhost:3000/api-docs/#/Anuncios/getAnuncios)** 

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
- Uploads Images

- Add more integrations


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://riload78.github.io/portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


