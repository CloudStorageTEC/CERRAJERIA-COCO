--CREATE DATABASE cerrajeria;
--CREAR LA BD MEDIANTE LA INTERFAZ DE PGADMIN 


CREATE TABLE usuario(
ClaveUsu SERIAL PRIMARY KEY,
Nombre VARCHAR(50) NOT NULL,
Email VARCHAR(35) NOT NULL,
Password VARCHAR(25) NOT NULL
);

CREATE TABLE administrador(
ClaveUsu INTEGER PRIMARY KEY REFERENCES usuario,
Rfc VARCHAR(13) NOT NULL
);

CREATE TABLE cliente(
ClaveUsu INTEGER PRIMARY KEY REFERENCES usuario,
Cp NUMERIC(5,0),
Direccion VARCHAR (80) NOT NULL,
TelCelular NUMERIC(10,0)
);

CREATE DOMAIN Tipo_Serv varchar (14)check( value in ('Aperturas','Cerraduras','Instalaciones', 'Reparaciones', 'Sustituciones'));

CREATE TABLE servicio(
ClaveServ SERIAL PRIMARY KEY,
Tipo Tipo_Serv NOT NULL,
Descripcion VARCHAR(50) NOT NULL,
Precio NUMERIC(10,2) NOT NULL
);

INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Apertura de puertas de todo tipo(con o sin rotura)', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Apertura de Cajas fuertes', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Apertura de Vehiculos', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Aperura de taquillas', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Apertura de Armarios', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Aperturas', 'Aperura de Candados', 150);

INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Cerraduras', 'Cambio de cerraduras', 250);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Cerraduras', 'Cambio de cerraduras con barras', 250);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Cerraduras', 'Cambio de cerraduras embutidas', 250);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Cerraduras', 'Cambio de cerraduras sobrepuestas', 250);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Cerraduras', 'Cambio de cerrojos', 250);

INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de bombines', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de cerraduras cilindricas', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones demanivelas', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de pomos', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de puertas con mirillas', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de bisagras', 300);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Instalaciones', 'Instalaciones de cerrojos', 300);


INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Reparaciones', 'Reparaciones de bombines', 160);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Reparaciones', 'Reparacion de cerraduras', 160);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Reparaciones', 'Reparacion de cerrojos', 160);

INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de bombines', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de cerraduras con barras', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de cerraduras embutidas', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de cerraduras sobrepuestas', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de cerrojos', 150);
INSERT INTO servicio (Tipo, Descripcion, Precio) values ('Sustituciones', 'Sustituciones de muelles automaticos', 150);
