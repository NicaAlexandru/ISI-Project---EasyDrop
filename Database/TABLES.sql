CREATE TABLE UTILIZATOR (
	id_utilizator integer PRIMARY KEY,
	email varchar[40],
	parola varchar[30],
	tip_utilizator varchar[30] UNIQUE, 
	nume varchar[30] UNIQUE,
	telefon text CONSTRAINT telefon_valid
		CHECK (telefon like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);

CREATE TABLE CLIENT (
	id_client integer PRIMARY KEY
);

CREATE TABLE VANZATOR (
	id_vanzator integer PRIMARY KEY
);

CREATE TABLE TRANSPORTATOR (
	id_transportator integer PRIMARY KEY
);

CREATE TABLE BOX_LIVRARE (
	id_box_livrare integer PRIMARY KEY,
	nume_box varchar[30],
	adresa varchar[120]
);

CREATE TABLE COMANDA (
	id_comanda integer PRIMARY KEY,
	id_client integer REFERENCES CLIENT (id_client),
	id_vanzator integer REFERENCES VANZATOR (id_vanzator),
	id_transportator integer REFERENCES TRANSPORTATOR (id_transportator),
	box_livrare integer REFERENCES BOX_LIVRARE (id_box_livrare)
);

CREATE TABLE DEPOZIT (
	id_depozit integer PRIMARY KEY,
	id_vanzator integer REFERENCES VANZATOR (id_vanzator)
);

CREATE TABLE PRODUS (
	id_produs integer PRIMARY KEY,
	id_comanda integer REFERENCES COMANDA (id_comanda),
	id_depozit integer REFERENCES DEPOZIT (id_depozit),
	nume varchar[40],
	descriere varchar[160],
	pret integer
);




























