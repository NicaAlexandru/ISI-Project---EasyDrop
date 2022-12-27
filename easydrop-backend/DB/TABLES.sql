--UTILIZATOR
CREATE TABLE APP_USER (
	id_user integer PRIMARY KEY,
	email varchar(40) UNIQUE,
	user_password varchar(30),
	user_type varchar(30),
	user_name varchar(30) UNIQUE,
	phone_number text CONSTRAINT valid_phone
		CHECK (phone_number like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);

--CLIENT
CREATE TABLE CLIENT (
	id_client integer PRIMARY KEY
);

--VANZATOR
CREATE TABLE SELLER (
	id_seller integer PRIMARY KEY
);

--CURIER
CREATE TABLE COURIER (
	id_courier integer PRIMARY KEY
);

--BOX LIVRARE
CREATE TABLE DELIVERY_BOX (
	id_box integer PRIMARY KEY,
	box_name varchar(30),
	box_address varchar(120) UNIQUE
);

--COMANDA
CREATE TABLE COMMAND (
	id_command integer PRIMARY KEY,
	id_client integer REFERENCES CLIENT (id_client),
	id_seller integer REFERENCES SELLER (id_seller),
	id_courier integer REFERENCES COURIER (id_courier),
	id_box integer REFERENCES DELIVERY_BOX (id_box)
);

--DEPOZIT
CREATE TABLE STOREHOUSE (
	id_storehouse integer PRIMARY KEY,
	id_seller integer REFERENCES SELLER (id_seller)
);

--PRODUS
CREATE TABLE PRODUCT (
	id_product integer PRIMARY KEY,
	id_command integer REFERENCES COMMAND (id_command),
	id_storehouse integer REFERENCES STOREHOUSE (id_storehouse),
	product_name varchar(40),
	product_description varchar(40),
	product_price integer
);


























