This is my ecommerce next js app

## Start:

Use PNPM: pnpm install

Branch agnosticTemplate has all the views but static, it has no state management

# DOCKER & DB MONGO

Para correr localmente se necesita la base de datos.

```
docker-compose up -d
```

<!-- -d significa __detached__ -->

## configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los modulos de node y levantar Next

```
pnpm install
pnpm run dev
```

## Llenar la base de datos con informacion de pruebas

Llamar a:

```
http://localhost:3000/api/seed
```
