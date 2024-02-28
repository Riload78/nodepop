
# NodePOP

Develop the API that will run on the server of a service selling articles
second. The service maintains advertisements for the purchase or sale of items and allows you to search and filter by various criteria

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
SERVER=
DB_NAME=
```

Install Database

```bash
  npm run initDB

```

Start the server

```bash
  npm run dev
```


## API Reference
[See Documentation --> http://localhost:3000/api-docs/#/Anuncios/getAnuncios](http://localhost:3000/api-docs/#/Anuncios/getAnuncios)
#### Get all items

```http
  GET /apiv1/anuncios
```

| Parameter | Type     | Description                                                     | Example                         |
| :-------- | :------- | :-------------------------------------------------------------  |:------------------------------- |
| `nombre`  | `string` | Filter by name                                                  | /apiv1/anuncios?nombre="string" |
| `tags`    | `string` | Filter by tag. To filter by more tags, separate them with a "," | /apiv1/anuncios?tags="string"   |
| `nombre` | `string` | **Required**. Your API key |
| `nombre` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /apiv1/anuncios/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Create item

```http
  POST /api/anuncios
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Get all tags

```http
  GET /apiv1/tags
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |





http://localhost:3000/apiv1/anuncios?tags=deportes,hogar&venta=true

http://localhost:3000/apiv1/anuncios?tags=deportes,hogar&venta=false
## Author

- [Riload78](https://github.com/Riload78)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Roadmap

- Additional browser support

- Add more integrations


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


