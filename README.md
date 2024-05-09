# Prueba e-commerce Linktic

## Descripción
Este proyecto es una prueba técnica para la empresa Linktic. Consiste en una aplicación web de e-commerce que permite a los usuarios administradores visualizar, crear, editar y eliminar productos. Además, los usuarios comunes pueden agregar productos al carrito de compras y realizar una compra.

## Tecnologías
- Frontend: Sveltekit, TailwindCSS
- Backend: Node.js, Express.js
- Base de datos: PostgreSQL

## Instalación
Para este proyecto se utilizó el monorepo de pnpm. Por lo que para realizar una instalación simple, se debe tener instalado pnpm. Luego, se debe ejecutar el siguiente comando en la raíz del proyecto:
```bash
pnpm install
```

En caso de no tener pnpm instalado, entrar con la consola a la carpeta `apps/frontend` y `apps/backend` de forma individual y ejecutar el comando de instalación de tu gestor de paquetes preferido.

## Ejecución
Para ejecutar el proyecto de forma local, se debe ejecutar el siguiente comando en la raíz de los proyectos:
```bash
cd apps/backend
pnpm dev
```
```bash
cd apps/frontend
pnpm dev
```

## Demo
Para visualizar una demo del proyecto, se puede acceder al siguiente enlace: [Demo](https://prueba-linktic.vercel.app/)

Se han creado dos usuarios de prueba para facilitar la visualización de la aplicación:
- Usuario administrador:
  - Nombre de usuario: admin
  - Contraseña: 123456
- Usuario común:
  - Nombre de usuario: user
  - Contraseña: 123456
  
## Documentación
Para visualizar la documentación de la API, se ha creado la documentación de Postman en la carpeta `apps/backend/docs/postman.json`. Tambien se han añadido las queries de creación de la base de datos en la carpeta `apps/backend/docs/queries.sql`.

## Notas
En este apartado detallare algunas notas adicionales sobre el proyecto, aclaraciones sobre decisiones tomadas y posibles mejoras.

### Backend
- En la documentación de la prueba se solicitó un CRUD de los productos. Tanto para facilitar la implementación, como para simplificar el manejo tanto del frontend como del backend, se decidió la creación de solicitudes idempotentes para la creación y actualización. Esto conlleva a que estas solicitudes se realicen con el metodo `PUT` en lugar de `POST` y `PATCH` respectivamente. Esto, en la practica no afecta el funcionamiento de la aplicación y entregaria ventajas a nivel de arquitectura en caso de ser una implementación real. Ya que facilita el manejo de implementaciones offline, algo importante en aplicaciones de e-commerce.

- Para las solicitudes de eliminación, también se decidió utilizar la misma solicitud `PUT`, con un campo adicional llamado `enabled` en la entidad de productos. Esto se realizó de esta forma debido a que en muchas normativas, los datos no deben ser eliminados y se deben almacenar durante un tiempo determinado. Por lo que, en lugar de eliminar el producto, se deshabilita y se mantiene en la base de datos.

- En este lado de la aplicación se podrian aplicar tanto mejoras de seguridad, ya que, no se ha implementado una sanitización de los datos. También podrian aplicarse mejoras en la validación de los datos de las entidades, ya que, por temas de tiempo, se han implementado unicamente entidades de dominio anémicas.

- Otra mejora que podria implementarse es el manejo correcto de los errores en la aplicación. Actualmente, se manejan los errores de forma básica y sin proporcionar demasiada información al frontend.

### Frontend
- En la documentación de la prueba habia un apartado donde se solicitaba el manejo de autenticación. Por lo que se creo un Log In simple para el manejo de usuarios comunes y administradores. Sin embargo, no ha sido posible implementar una validación real de roles de usuario. Por otro lado, tambien podria añadirse un manejo de sesiones para mantener la sesión activa, esta implementación se realizo de forma simple y no es la mejor practica.

- Se ha intentado seguir una buena practica a nivel de manejo de estados en la aplicación. Pero debido al tiempo, no se ha podido ahondar en las mejores practicas de Sveltekit. Por lo que, se podrian realizar mejoras en la implementación de estados globales y locales.

### Despliegue
- Para el despliegue de la aplicación se ha utilizado Vercel para el frontend y Render para el backend. Se ha utilizado Vercel para el frontend debido a que es una plataforma que facilita el despliegue de aplicaciones Sveltekit. Por otro lado, se ha utilizado Render debido a que actualmente es una de las pocas plataformas que permite el despliegue de aplicaciones Node.js de forma gratuita y sencilla.


## Autor
- [Luciano Morales](https://github.com/luc-mo)
