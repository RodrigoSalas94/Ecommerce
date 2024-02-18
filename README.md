### Proyecto Ecommerce ###

# Proyecto E-commerce en TypeScript
## Objetivo:
Desarrollar una API-Rest para un sistema de E-commerce que permita a los usuarios realizar compras y ventas de productos. El sistema deberá contar con autenticación de usuarios para proteger las operaciones sensibles.

### Requisitos:
### Autenticación de Usuarios:

Implementar un sistema de registro y login para los usuarios.
Utilizar tokens JWT para gestionar la autenticación.
Asegurar que solo los usuarios autenticados puedan realizar operaciones de compra y venta.
###  Gestión de Productos:

Crear, leer, actualizar y eliminar productos.
Cada producto debe tener al menos los siguientes campos: nombre, descripción, precio, y cantidad disponible.
Implementar un endpoint para obtener la lista de productos disponibles.
###  Operaciones de Compra:

Permitir a los usuarios agregar productos a un carrito de compras.
Implementar un endpoint para realizar la compra, deduciendo la cantidad correspondiente de productos disponibles.
Validar que los usuarios autenticados sean los únicos que puedan realizar compras.

### Manejo de Inventarios:

Implementar un sistema de inventario que actualice automáticamente la cantidad disponible de productos después de cada compra o venta.

### Tecnologias a usar:

- Postgres SQL para almacenar la información. Las tablas y diseño te lo dejo a tu criterio.
- MongoDB (NoSQL) para almacenar los tickets de compra de los usuarios cuando realizan compras.
- Ademas de usar MongoDB como cache, para los usuarios que se logeen al sistema.
- Typescript
