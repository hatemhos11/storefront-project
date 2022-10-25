CREATE TABLE productOrder (
    id serial PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) NOT Null,
    order_id BIGINT REFERENCES orders(id) NOT Null,
    quantity FLOAT
);
