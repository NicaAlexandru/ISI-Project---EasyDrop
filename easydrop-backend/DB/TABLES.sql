--UTILIZATOR
CREATE TABLE APP_USER (
	id_user varchar(60) PRIMARY KEY,
	email varchar(40) UNIQUE,
	user_password varchar(30),
	user_type varchar(30),
	user_name varchar(30) UNIQUE,
	phone_number text
);

--CLIENT
CREATE TABLE CLIENT (
	id_client varchar(60) UNIQUE REFERENCES APP_USER (id_user)
);

--VANZATOR
CREATE TABLE SELLER (
	id_seller varchar(60) UNIQUE REFERENCES APP_USER (id_user)
);

--CURIER
CREATE TABLE COURIER (
	id_courier varchar(60) UNIQUE REFERENCES APP_USER (id_user),
	x_coord varchar(20),
	y_coord varchar(20)
);

--BOX LIVRARE
CREATE TABLE DELIVERY_BOX (
	id_box varchar(60) PRIMARY KEY,
	box_name varchar(30),
	box_address varchar(120) UNIQUE
);

--COMANDA
CREATE TABLE COMMAND (
	id_command varchar(60) PRIMARY KEY,
	id_client varchar(60) REFERENCES CLIENT (id_client),
	id_seller varchar(60) REFERENCES SELLER (id_seller),
	id_courier varchar(60) REFERENCES COURIER (id_courier),
	id_box varchar(60) REFERENCES DELIVERY_BOX (id_box)
);

--DEPOZIT
CREATE TABLE STOREHOUSE (
	id_storehouse varchar(60) PRIMARY KEY,
	id_seller varchar(60) REFERENCES SELLER (id_seller),
	storehouse_name varchar(240),
	x_coord varchar(20),
	y_coord varchar(20),
	img_url varchar(200)
);

--PRODUS
CREATE TABLE PRODUCT (
	id_product varchar(60) PRIMARY KEY,
	id_command varchar(60) REFERENCES COMMAND (id_command),
	id_storehouse varchar(60) REFERENCES STOREHOUSE (id_storehouse),
	product_name varchar(40),
	product_description varchar(40),
	product_price integer
);


























