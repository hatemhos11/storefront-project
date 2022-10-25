# API Requirements
These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Get `/products` [GET][token required]
- GetOne `/products/:id` [GET][token required]
- Insert `/products/add` [POST] [token required]
- Update `/products/:id` [PUT] [token required]
- Delete `/products/:id` [DELETE] [token required]

#### Users
- Get `/users` [GET] 
- GetOne `/users/:id` [GET]
- Auth `/users/login` [post]
- Insert `/users/add` [POST] 
- Update `/users/:id` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]

#### Orders
- Get `/orders` [GET] [token required]
- GetOne `/orders/:id` [GET] [token required]
- Insert `/orders/add` [POST] [token required]
- Update `/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]

## Data Shapes
#### Product
Table: *products*
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `FLOAT`
- quantity `FLOAT`

#### User
Table: *users*
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- password `VARCHAR`
- email `VARCHAR`


#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `varchar`

Table: *order_products*
- order_id `INTEGER` `REFERENCES orders(id)` 
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
