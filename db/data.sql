CREATE SCHEMA proyectoIntegrador;

use proyectoIntegrador;

CREATE TABLE usuarios(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50),
    contrasenia VARCHAR (100) NOT NULL,
    fecha_nacimiento DATE,
    dni INT,
    foto_perfil TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );
    
CREATE TABLE productos(
	producto_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNSIGNED,
    nombre_archivo_producto TEXT,
    nombre_producto TEXT,
    descripcion_producto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
    
CREATE TABLE comentarios(
	comentario_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	producto_id INT UNSIGNED,
    usuario_id INT UNSIGNED,
    comentario TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
 
 select * from usuarios;
 
 INSERT INTO usuarios (id, email, nombre_usuario, contrasenia, fecha_nacimiento, dni, foto_perfil)
 VALUES (DEFAULT, 'armandorojas@gmail.com', 'ArmandoRojas', 'Arma2804', '1987-04-28', 30789323, 'https://i.pinimg.com/474x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg');
 
 INSERT INTO usuarios (id, email, nombre_usuario, contrasenia, fecha_nacimiento, dni, foto_perfil)
 VALUES (DEFAULT, 'juanroman@gmail.com', 'JuanRoman', 'Roman2402', '1979-02-24', 26735526, 'https://i.pinimg.com/474x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg');
 
INSERT INTO usuarios (id, email, nombre_usuario, contrasenia, fecha_nacimiento, dni, foto_perfil)
VALUES (DEFAULT, 'sarah123@gmail.com','Sarah', 'Sarah1508', '1990-08-15', 34567890, 'https://i.pinimg.com/474x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg');

INSERT INTO usuarios (id, email, nombre_usuario, contrasenia, fecha_nacimiento, dni, foto_perfil)
VALUES (DEFAULT, 'john_doe@gmail.com', 'JohnDoe', 'Doe1005', '1985-05-10', 29875901, 'https://i.pinimg.com/474x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg');

INSERT INTO usuarios (id, email, nombre_usuario, contrasenia, fecha_nacimiento, dni, foto_perfil)
VALUES (DEFAULT, 'emily_smith@gmail.com','EmSmith' ,'Smith3011', '1982-11-30', 28654321, 'https://i.pinimg.com/474x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg');


select * from productos;
INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 1, 'https://media.toyota.com.ar/a5b0d72b-55af-4553-b365-aca16a6a7be8.png', 'Toyota Corolla Cross', 'El Toyota Corolla Cross es un SUV compacto con un diseño elegante y versátil. Ofrece un interior espacioso, tecnología avanzada y opciones eficientes de motorización. Confortable en la ciudad y capaz en terrenos variados, es una opción popular para familias y aventuras urbanas.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 3, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_2abcf17dcdc94ff1a86173be1522f430.jpg', 'Ford Mustang', 'El Ford Mustang es un ícono del automovilismo con un diseño deportivo y un rendimiento impresionante. Potente, elegante y emocionante, redefine la experiencia de conducción.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 5, 'https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2019-cruze-premier/colorizer/enero-21/colorizer-preto-ouro-negro.jpg?imwidth=960', 'Chevrolet Cruze', 'El Chevrolet Cruze es un sedán moderno y sofisticado, con un diseño aerodinámico y tecnología avanzada. Eficiente en combustible y cómodo, es perfecto para la vida urbana.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 3, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_954423484bfa4837a2348a759b5cf69e.jpg', 'Volkswagen Tiguan', 'El Volkswagen Tiguan es una SUV versátil y espaciosa, con un diseño moderno y características de seguridad avanzadas. Confortable en carretera y listo para la aventura, es el compañero perfecto para la familia.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 1, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_b87005cb6e834d03bf2bb24213d13450.jpg', 'BMW Serie 3', 'El BMW Serie 3 es un sedán de lujo con un equilibrio perfecto entre rendimiento y elegancia. Con tecnología innovadora y un diseño distintivo, ofrece una experiencia de conducción incomparable.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 2, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_e4109132de26436da739fd86d5b715d0.jpg', 'Mercedes-Benz Clase C', 'El Mercedes-Benz Clase C es un sedán de lujo con un diseño elegante y características de vanguardia. Confortable y sofisticado, ofrece un rendimiento excepcional y tecnología intuitiva.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 2, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_9342358986924c01862e144a55d896a6.jpg', 'Audi Q5', 'El Audi Q5 es una SUV premium con un diseño impresionante y tecnología de vanguardia. Con tracción en las cuatro ruedas y un interior lujoso, ofrece una combinación perfecta de estilo y rendimiento.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 1, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_10741a5538cc4106835033f1ff9007f0.jpg', 'Renault Kwid', 'El Renault Kwid es un compacto urbano con un diseño audaz y características prácticas. Ágil en la ciudad y eficiente en combustible, es ideal para la vida cotidiana.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 3, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_13a028d0467e4ca78d0102ea504c7741.jpg', 'Peugeot 208', 'El Peugeot 208 es un hatchback moderno y elegante, con un diseño distintivo y tecnología avanzada. Confortable y eficiente, ofrece una experiencia de conducción dinámica.');

INSERT INTO productos (producto_id, usuario_id, nombre_archivo_producto, nombre_producto, descripcion_producto)
VALUES (DEFAULT, 4, 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_06a4c33100714be1af0e8328f7645596.webp', 'Nissan Versa', 'El Nissan Versa es un sedán compacto con un diseño moderno y amplio espacio interior. Equipado con tecnología inteligente y eficiencia de combustible, es una opción versátil para la conducción diaria.');

select * from comentarios;
INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 1, 1, '¡Genial!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 1, 1, '¡Me encanta este auto!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 1, 3, '¿Aún está disponible?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 2, 4, '¡Qué buena oferta!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 2, 2, '¡Quiero uno igual!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 2, 1, '¡Excelente precio!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 3, 2, '¿Tiene garantía?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 3, 4, 'Me encantaría hacer una prueba de manejo.');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 3, 5, '¡Increíble diseño!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 4, 5, '¿Aceptan tarjeta de crédito?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 4, 2, '¿Cuántos kilómetros tiene?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 4, 3, '¡Me encantaría tenerlo en mi garaje!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 5, 1, '¿Puedo obtener más información?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 5, 4, '¿Tiene sistema de navegación?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 5, 1, '¡Qué bonito color!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 6, 3, '¿Es negociable el precio?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 6, 5, '¡Me gusta mucho!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 6, 2, '¿Tiene sistema de sonido premium?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 7, 3, '¿Hay opciones de financiamiento?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 7, 4, '¡Es exactamente lo que estaba buscando!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 7, 1, '¿Puedo ver más fotos del interior?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 8, 4, '¿Está disponible en otros colores?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 8, 2, '¡Quiero uno para mí!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 8, 3, '¿Hacen envíos a domicilio?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 9, 5, '¡Espectacular!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 9, 4, '¿Cuál es el consumo de combustible?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 9, 2, '¡Me encanta el modelo!');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 10, 1, '¿Tiene sistema de frenado automático?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 10, 3, '¿Puedo obtener un descuento por pago al contado?');

INSERT INTO comentarios (comentario_id, producto_id, usuario_id, comentario)
VALUES (DEFAULT, 10, 5, '¡Me lo llevo!');