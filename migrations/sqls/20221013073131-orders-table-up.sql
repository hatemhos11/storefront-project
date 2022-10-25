CREATE TABLE orders (
    id serial PRIMARY KEY,
    totalPrice float,
    status VARCHAR(15) DEFAULT 'active',
    orderDate DATE ,
    user_id BIGINT REFERENCES users(id) NOT Null
);