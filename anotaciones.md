## Promesas
* En el codigo sincronico el flujo de ejeucion se detiene hasta que se completa la tarea.
* En el codigo asincronico permite que el flujo de ejecucion continue mientras se espera a que se complete una determinada tarea.

Las **promesas** son objetos que representan la eventual finalizacion o fracaso de una operacion asincronica y su valor resultante

* .then() se utiliza para manejar el resultado exitoso de una promesa, mientras que .catch() se utiliza para manejar cualquier error que pueda ocurrir durante la ejecucion de la promesa

* **async/await** es una sintaxis que permite escribir codigo asincronico de manera mas legible y facil de entender
* async se utiliza para declarar una funcion asincronica, mientras que await se utiliza para esperar a que una promesa se resuelva antes de continuar con la ejecucion del codigo
* async y await van de la mano, es para que sea una funcion asincronica


**Cada operacion de base de datos DEBE ser asincronica**

## ORM
Mapea el codigo de js para poder hacer consultas en la base de datos
* clase a tablas
* objetos a filas
* atributos a columnas
* relaciones entre objetos a relaciones entre tablas



## Manejo de errores
* El try catch captura el error y hace algo, para que si se rompe la app no se caiga, sino que mande un mensaje de error

    
--------------------------------------------------------------------------
## Estructura básica de las carpetas
![Estructura](est-carpetas.png)
* Models: un archivo por cada tabla
    * Contine la estructura de cada tabla, las relaciones entre tablas, y los detalles de cada columna
* Routes: un archivo por cada recurso (producto, categoria, usuario...)
    * Contiene los path(endpoints) y el metodo http (get, post, put, delete) de cada tabla
    * Contiene el middleware de validacion de cada endpoint
    * Contine los controladores de cada endpoint
* Controllers: un archivo por cada recurso (producto, categoria, usuario...)
    * Contiene la logica de cada endpoint, interactua con la base de datos a traves de los modelos
* Schemas: un archivo por cada recurso (producto, categoria, usuario...)
    * Contiene los esquemas de validaciones de cada recurso, con JOI
* Middlewares: un archivo por cada recurso (producto, categoria, usuario...)
    * Contiene las funciones de validacion de cada recurso, que utilizan los esquemas de validacion
    * Manejan errores de validacion y devuelven mensajes de error personalizados
* Index.js: Definir las relaciones, exportar los modelos

***RESUMEN SENCILLO:***
* Rutas(path,middleware, controlador)
* Schemas --> Define los tipos de los datos
* Widdlewares --> Validaciones usando funciones que pueden usar los schemas para validar los datos que manda el usuario, y manejar errores de validacion
* Controladores --> Funciones que interactuan con la bdd, ya habiendo pasado las validaciones
-----------------------------------------------------------------------------------
### Importante:

#### Carpeta node_modules
* Es la carpeta donde se instalan los paquetes que usamos en el proyecto, como express, sequelize, sqlite3, etc
* ES IMPORTANTE NO SUBIRLA AL GITHUB
* Para eso creamos un archivo .gitignore en la raiz del proyecto y dentro de ese archivo escribimos el nombre de la carpeta que queremos ignorar, en este caso node_modules y las variables de entorno que vamos a crear despues, quedando asi:
```
node_modules/
.env
```
***NOTA: podemos agregar al .gitignore cualquier archivo o carpeta que no queramos subir al github***

### Variables de entorno
* Son variables que se definen fuera del codigo, en un archivo .env, para guardar informacion sensible como contraseñas, claves de API, etc
* Para eso creamos un archivo .env en la raiz del proyecto y dentro de ese archivo definimos nuestras variables de entorno, por ejemplo:
```
PORT=3000
```
***NOTA: podemos tener otro datos como DB_USERNAME=dev_username o DB_PASSWORD=dev_password***
* Si agregamos el .env y ponemos el puerto tenemos que cambiar la app.js 
* Primero instalamos el paquete dotenv para poder usar las variables de entorno
```bash
npm i dotenv
```

* Leemos el .env e
```js
require("dotenv").config();
```
* para que use la variable de entorno PORT en vez de un numero fijo, quedando asi:
```js
const PORT = process.env.PORT || 3000; // si no se define la variable de entorno PORT, se usa el puerto 3000 por defecto
```
#### Cambiar de BDD
* Si queremos cambiar de bdd, por ejemplo a mysql, tenemos que cambiar el dialect en el config.json y agregar los datos de conexion a la bdd, quedando asi:
```json
{
  "development": {
    "database": "tienda",
    "username": "root",
    "password": null,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  ....
}
```
#### Todos los paquetes a instalar:
* Dependecias:
    * joi (para las validaciones)
    * express (para crear la app y definir las rutas)
    * sequelize (para interactuar con la bdd)
    * sqlite3 (para usar sqlite como bdd)
    * dotenv (para usar variables de entorno)
* DevDependecias:
    * nodemon (para reiniciar la app cuando hay cambios)
    * sequelize-cli (para crear modelos, migraciones, seeders, etc)

* Se instalan con:
```bash
npm i joi express sequelize sqlite3 dotenv
npm i -D nodemon sequelize-cli
```
* Así joi, express, sequelize, sqlite3 y dotenv van a dependencies, y nodemon y sequelize-cli van a devDependencies.



* Despues de instalar los paquetes, en el package.json en la parte de scripts agregamos:
```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```
* y en el config/config.json cambiamos el dialect a sqlite y agregamos el storage para definir donde va a estar nuestro archivo de bdd, quedando asi:
```json
"development": {
    "database": "tienda",
    "storage": "./data/data.sqlite",
    "dialect": "sqlite"
  }
```

---------------------------------------

### Crear proyecto de cero

**Inicializar proyecto de Node**
```bash
npm init -i
```
***NOTA: si da error instalar la misma version de node, por ejemplo:***
```bash
nvm install 20
nvm use 20
```
esto crea el package.json

**Instalar los packetes: express, equelize y sqlite**
```bash
npm i express sequelize sqlite3
```

**Instalar Nodemon**
* Reinicia la aplicacion cuando hay cambios, es un packete de desarrollo
```bash
npm i -D nodemon
```

Despues de esto en el package.json se crea un nuevo atributo de dependencias(dependencies) con los packetes instalados que tengo que instalar si o si cuando pase a produccion para que la app funcione, las devDependencies(como nodemon) no son necesarias en produccion

**Instalar Sequelize-cli**
* Inicializa el proyecyo con la estructura tipica de sequelize
* Crea Seeders, llena la tabla de base de datos con ejemplos para hacer pruebas 
* Crea migraciones, hace un historial de los cambios que hago en las tablas
* Crea modelos, cada modelo es una tabla en la base de datos
```bash
npm i -D sequelize-cli
```

* despues de instalar los paquetes en el package.json en la parte de scrips  agregamos:
```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```
* ***NOTA: se puede poner el nombre que quieras en vez de start o dev en las .json***
* ***JSON es un formato de datos comúnmente utilizado por los desarrolladores web para transferir información entre un servidor y una aplicación web.***
* start es para correr la aplicacion en produccion
* dev es para nosotros como desarrolladores podamos hacer el start como queramos 

**Corer sequelize-cli init**

```bash
npx sequelize-cli init
```
***NOTA:npm para instalar paquetes, npx paa ejecutar comandos de los paquetes***
* Con esto inicializamos squelize

* en config/config.json va a estar los datos para que pueda desde la aplicacion conectarme a la bdd
    * tenemos que cambiar el development:dialect por el que usemos, en nuestro caso sqlite 
    * como es sqlite que no necesesita ni usuario ni contraseña podemos borrar el username y el password
    * en database va el nombre de mi bbd
    * y en sqlite en vez de host usamo storage, ahi decimos donde va a estar mi archivo quedando storage:./data/data.sqlite ***NOTA:(tenenemos que solamente crear la carpeta data, el archivo se va a crear solo)***

Asi deberia quedar(para sqlite):
```json
"development": {
    "database": "tienda",
    "storage": "./data/data.sqlite",
    "dialect": "sqlite"
  }
```

* el config.json tiene diferentes entornos(development, test, production), segun el entorno donde trabajemos podemos conectarnos a diferentes bdd

-----------------------------------------

### Orden:
1. Crear modelo con sus atributos y relaciones (con el comando)
2. Crear las rutas del modelo (creamos el archivo a mano) --> elegimos los nombres de los middlewares y los controladores que vamos a crear
3. Creamos los middlewares de validacion (creamos el archivo a mano)
4. Creamos los controladores (creamos el archivo a mano)
5. Agregamos las rutas a la app.js

-------------------------------------------
# Models

## Crear un modelo
Creamos el modelo producto que se va a traducir en nuestra tabla, usamos sequelize-cli para generarla automaticamente
```bash
npx sequelize-cli model:generate --name Producto --attributes nombre:string,precio:float,stock:integer
```
* --name Producto --> nombre de la tabla

* --attributes nombre:string,precio:float,stock:integer --> nombre de los campos con sus tipos

***NOTA: nombre:string,precio:float,stock:integer  tiene que estar todo junto***

* En cada modelo tenemos la estrutura de lo que seria una tabla en bdd pero en codigo js
    * class Producto extends Model   //creamos la clase producto que en la bdd va a ser la tabla Producto
    * static associate(models)  // aca van las relaciones entre Producto con las demas 
    * Producto.init //aca definimos las columnas, podemos hacer cambios o ponerle mas detalles como opcional o no

* el models/index.js exporta el modelo a la app
    * const env = process.env.NODE_ENV || 'development'; // usa por defecto el development que definimos en package.json
    * sequelize = new Sequelize(process.env[config.use_env_variable], config); //inicia la conexion con la bbd y usa el config.json
    * fs.forEach(file => { // recorre la carpeta models y agrega al objeto db definido mas arriba cada modelo, esto hace que cuando trabaje en la app.js no necesite importar cada modelo, solo importo el bd para tener todos los modelos


* para correr la app con node usamos 
```bash
npm start //(porque asi lo definimos en el package)
```

* si queremos correr con nodemon usamos el 
```bash
npm run dev //(porque asi lo definimos en el package)
```

* Si queremos agregar mas caracteristicas o restricciones a un atributo(columna) tenemos que crear un objeto con las caracteristicas del atributo, por ejemplo para el nombre del producto que es un string y no puede ser nulo:
```js
Etiqueta.init({
    nombre: { // podemos agregar mas campos a atributo creando un objeto con las caracteristicas del atributo
      type: DataTypes.STRING,
      allowNull: false
    },
  }
```
***NOTA: el id de cada modelo(tabla) es un campo que se crea automaticamente, no es necesario definirlo***

* El allowNull: false es para que el campo sea obligatorio, no puede ser nulo, si el usuario no lo manda o lo manda vacio va a dar error de validacion
* Tambien podemos existen:
    * unique que es para que no pueda haber dos etiquetas con el mismo nombre
    * defaultValue para poner un valor por defecto si el usuario no lo manda

## Relaciones
* **Regla general:**
    * `hasOne` / `hasMany` → va en el modelo "padre" (el nombre del modelo es la fk)
    * `belongsTo` → va en el modelo "hijo"
    * `belongsToMany` → va en **ambos** modelos, y siempre necesita `through` con el nombre de la tabla intermedia
<br>
***NOTA: en todos los modelos hay que indicar la clave foranea aunque no sea quien la lleve***
* 1:1 — Un registro se relaciona con exactamente uno de otro modelo
```js
Persona.hasOne(Pasaporte)       // Persona tiene un Pasaporte
Pasaporte.belongsTo(Persona)    // Pasaporte pertenece a una Persona
```


* 1:N — Un registro se relaciona con muchos de otro modelo
```js
Categoria.hasMany(Producto)     // Categoria tiene muchos Productos // es el 1
Producto.belongsTo(Categoria)   // Producto pertenece a una Categoria // es el N
```
***NOTA: la clavea foranea seria categoriaId***
* N:M — Muchos se relacionan con muchos (tabla intermedia)
```js
Producto.belongsToMany(Etiqueta, { through: 'ProductoEtiqueta' })
Etiqueta.belongsToMany(Producto, { through: 'ProductoEtiqueta' })
```
* 0:N o 1:0..M — Un registro puede no tener ninguno o muchos de otro modelo, igual que el 1:N pero se controla con allowNull en la clave foránea del modelo hijo(Producto):
```js
// Si fuera 0:N, la categoria es opcional (allowNull: true es el valor por defecto)
categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true
}

// Si fuera 1:N, la categoria seria obligatoria
categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
}
```
***NOTA: la clave foranea (categoriaId) normalmente la agrega Sequelize automaticamente cuando definimos el belongsTo, pero si queremos controlar el allowNull la definimos nosotros explicitamente en el init del modelo***
* Las relaciones van a ir en el ***static associate*** de cada modelo
```js
class Producto extends Model { 

    static associate(models) { 
        // aca van las relaciones entre Producto con las demas tablas
    }
  }
```

* Para las tablas intermedias como ProductoEtiqueta que es la tabla que relaciona los productos con las etiquetas, tenemos que definir los campos de la tabla intermedia, en este caso productoId y etiquetaId, ambos son enteros y no pueden ser nulos porque son claves foraneas
```js
ProductoEtiqueta.init({
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etiquetaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
```
***NOTA: productoId y etiquetaId son claves primarias en su respectiva tabla y en la tabla intermedia son claves foraneas***
### M a M
* En las M a M no es necesario definir las asociaciones en el modelo intermedio, se definen en los modelos principales con belongsToMany
```js
//En el modelo Producto:

Producto.belongsToMany(models.Etiqueta, {
    through: models.ProductoEtiqueta,
    foreignKey: "productoId",
    otherKey: "etiquetaId",
    as: "etiquetas",
});
```
* through: models.ProductoEtiqueta --> le decimos que la relacion es a traves de la tabla intermedia ProductoEtiqueta
* tenemos que indicar la clave foranea, foreignKey: "productoId" --> le decimos que la clave foranea en la tabla intermedia es productoId(para el modelo Producto)
* como hay dos claves foraneas, tenemos que indicar la otra con otherKey: "etiquetaId" --> le decimos que la otra clave foranea en la tabla intermedia es etiquetaId(para el modelo Etiqueta)
* Es importate el orden de las claves foraneas:
```js
foreignKey: "productoId", // aca va la del modelo actual (Producto)
otherKey: "etiquetaId", //aca va la del modelo al que se relaciona (Etiqueta)
```
* El as es para el alias que es opcional, como es la relacion para etiquetas entonces el alias es etiquetas

* Al crear relaciones de M a M sequeliza genera automaticamente los metodos para trabajar con las relaciones
* Por ejemplo para asignar etiquetas a un producto, una vez que tenemos el producto y las etiquetas que queremos asignar, usamos el metodo setEtiquetas que se genera automaticamente por la relacion de M a M entre Producto y Etiqueta
```js
await producto.setEtiquetas(etiquetas); 
```
***NOTA: el producto que ya buscamos le asignamos las etiquetas encontradas con el metodo setEtiquetas que se genera automaticamente por la relacion de muchos a muchos entre Producto y Etiqueta, este metodo reemplaza las etiquetas actuales del producto por las nuevas etiquetas que le pasamos como parametro***

* Para ignorar los atributos de la tabla intermedia en el resultado de una consulta, usamos el **through** con un objeto vacio dentro del include del modelo relacionado
```js
include: {
    model: Etiqueta,
    as: "etiquetas",
    attributes: ["id", "nombre"],
    through: {
        attributes: [],
    },
},
```
-------------------------------------
## App.js

* const db = require('./models/index') o './models/' es lo mismo, automaticamente importa el index

* tenemos que sincronizar nuestros modelos squelize con la bdd sqlite
    * para eso dentro del app.listen hacemos a la conexion con la bdd con el metodo sync para sincronizar nuestros modelos con la bdd
    ```js
    db.sequelize.sync()
    ```
    ***IMPORTANTE: TODAS LAS OPERACIONES CON LA BDD TIENEN QUE SER ASINCRONICAS, POR LO TANTO: USAMOS EL AWAIT Y EL ASYNC***
    ```js
    app.listen(PORT, async()=>{
    await db.sequelize.sync()  // PARA PODER USAR EL AWAIT TENEMOS QUE DEFINIR ASYNC A NUESTRA FUNCION
    })
    ```
    Una vez que corramos esto con el run dev en la carpeta data va a a crear el archivo data.sqlite y ejecuta los modelos que tengamos en el models 
    ***NOTA: esto es porque hicimos la conexion con el db que en el index.js le vamos pasando todos los models que creemos*** 

    * SQLite Viewer es la extencion para ver la bdd
-------------------------------------------
# CONTROLLERS

### DEFINIMOS LOS ENDPOINTS:

## SI LOS DEFINIMOS DESDE LA CARPETA CONTROLLERS:
* Lo mejor es que las funciones controladoras esten lo mas limpias posibles, que no tengan ifs

* importamos los modelos para poder interactuar con la bdd
```js
const { Producto, Categoria } = require('../models')
```
* Como la definimos para la app.js pero ahora la vamos a definir en el controlador, entonces no le pasamos el path ni el metodo http, sola la definimos, mantenemos la asincronia y el req y res
```js
const obtenerProductos = async (req,res) => {
```
* Despues es misma estructura que antes
```js
try {
        //LISTAR PRODUCTOS
        const productos = await Producto.findAll({ // a la funcion le pasamos un obj para filtrar los atributos que queres mostrar
            attributes: ["nombre","precio","stock"]
        }) //devuelve un array de objetos donde cada uno es un producto
        // ahora podemos mandar la respuesta:
        res.status(200).json(productos) //respuesta: mandamos un json con los productos
    } catch (error) {
        res.status(500).json({message: "Error al obtener los productos"}) //respuesta de error
    }
```
* Si queremos incluir otro modelo dentro de la consulta lo hacemos despues de definir los atributos:
```js
include: { // para incluir la categoria a la que pertenece el producto
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"] // solo queremos mostrar el nombre de la categoria    
            }
```
***NOTA: EL INCLUDE FUNCIONA COMO UN JOIN EN SQL***
* Si queremos recibir un argumento de un middleware de validacion lo recibimos por el req

```js
const producto = req.producto // el producto que se encontro en el middleware de validacion de id
```
### POST - Asignar etiquetaS a un producto
* Lo hicimos por el body
```js
const producto = req.producto; // recibimos el producto del body y lo guardamos en la constante
const { etiquetasIds } = req.body; // recibimos del body un array de ids de etiquetas para asignar al producto
```

* Como son varias etiquetas es un array de ids
```js
const etiquetas = await Etiqueta.findAll({ //buscamos las etiquetas en la base de datos con los ids recibidos
      where: {
        id: etiquetasIds,
      },
    })
```

* Para asignar etiquetas a un producto, una vez que tenemos el producto y las etiquetas que queremos asignar y creamos el modelo de tabla intermedia ProductoEtiqueta, usamos el metodo setEtiquetas que se genera automaticamente por la relacion de M a M entre Producto y Etiqueta
```js
await producto.setEtiquetas(etiquetas); 
```
***Nota: esto lo podemos hacer tanto en el controlador de productos como en el controlador de etiquetas***
* En postman para probar esto, tenemos que mandar un array de ids de etiquetas que queremos asignar al producto
* con http://localhost:3000/productos/2/etiquetas
```json
{
    "etiquetasIds": [1, 2, 3]
}
```
* entonces para el producto con id 2 se van a asignar las etiquetas con id 1, 2 y 3, si el producto ya tenia otras etiquetas asignadas, estas se van a reemplazar por las nuevas etiquetas que le estamos asignando
```js
const producto = req.producto; // recibimos el producto del body y lo guardamos en la constante
const { etiquetasIds } = req.body; // recibimos del body un array de ids de etiquetas para asignar al producto
```
### POST - Asociar etiqueta a un producto
* Lo hicimos por el parametro(params) 
```js
const producto = req.producto;
const { etiquetaId } = req.params; // es por parametro no por el body
```

* como es una sola etiqueta es un solo id
```js
 const etiqueta = await Etiqueta.findByPk(etiquetaId); // buscamos la etiqueta por su id
```

* y le asignamos la etiqueta al producto con el metodo addEtiqueta que se genera automaticamente por la relacion de M a M entre Producto y Etiqueta
```js
await producto.addEtiqueta(etiqueta);
```

* en postman para probar esto, tenemos que mandar el id de la etiqueta que queremos asignar al producto por el parametro de la url
```
http://localhost:3000/productos/2/etiquetas/1
```
* entonces para el producto con id 2 se va a asignar la etiqueta con id 1

---

## SI LOS DESFINIMOS DESDE LA APP.JS: *(enfoque viejo)*
### GET - listar productos
```js
app.get('/productos', (req,res)=>{ 
``` 
* cuando a la app le llega una peticoin de productos ejecuta una funcion que contiene a la peticion y una respuesta

estas son dos formas de hacer lo mismo: 
```js
const {Producto} = require('./models') // importa el modelo producto

Producto //accedemos al modelo producto
```
```js
bd.producto
```
SELECT en sql:
```js
Producto.findAll()
```
* esto devuelve un array de objetos (que son nuestros productos)
* como es una operacion en bdd usamos el ASYNC AWAIT:
```js
app.get('/productos', async (req,res)=>{ 
    //LISTAR PRODUCTOS
    const productos = await Producto.findAll() 
})
```
* y luego hacemos la respuesta:
```js
res.status(200).json(productos) //respuesta: mandamos un json con los productos
```
***NOTA: status(200) todo OK***
* TRY - CATCH
```js
try {
        // bloque de codigo que intentamos ejecutar
    } catch (error) {
        // si salta error no rompemos la ejecucion y hacemos "algo"
    }

```
***NOTA: el catch tiene el parametro error, que es un objeto con el error que ocurre, puedo verlo si hago message:error.mesagge como respuesta***

* Instalamos la extension POSTMAN
* Probamos el GET
    * Primero tiene que estar corriendo la app: npm run dev
    * New HTTP Request
    * como get ponemos  y mandamos SEND

* Si para un mismo modelo tenemos dos vinculaciones con otro modelo como Producto con Categoria y Etiquetas en el include podemos crear un array de objetos para incluir ambos modelos
```js
include: [
                { // para incluir la categoria a la que pertenece el producto, es como un JOIN en SQL
                    model: Categoria,
                    as: "categoria",
                    attributes: ["nombre"] // solo queremos mostrar el nombre de la categoria    
                },
                {// para incluir las etiquetas que tiene el producto, es como un JOIN en SQL
                    model: Etiqueta,
                    as: "etiquetas",
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ]
```
*** NOTA: el through es para las relaciones de muchos a muchos, le decimos que no queremos mostrar ningun atributo de la tabla intermedia***


### GET - obtener datos de un producto determinado por id

```js
app.get('/productos/:id', async (req,res)=>{ 
```
* /id --> Parametro en la URL:
```
http://localhost:3000/productos/unId
```
* Mismas formas de hacer lo mismo:
```js
const {idProducto} = req.params 
```
```js
req.params.id
```
* El params va a ser el parmetro que mande el usuario

* FindOne es como findAll pero en vez de devoler una lista devuelve el primer registro que cumpla la condicion si lo hubiera
```js
Producto.findOne({
    where: {
        id: idProducto
    }
})
```
* Para primary keys findByPk es un metodo mas especifico y mejor
```js
Producto.findByPk(idProducto)
```
* Si queremos devolver una respusta si el producto con el id petido no existe:
```js
if(!producto){
    return res.status(404).json({message:"El producto no existe"})
}
```
 ***NOTA: Recordar el return para los if sin else***      
* Como es peticion a la bdd usamos async await
```js
app.get('/productos/:idProducto', async (req,res)=>{ // cuando a la app le llegue una peticion de tipo get ejecuta la funcion
    try {
        const {idProducto} = req.params //params para leer los parametros que va a pasar el usuario
        const producto = await Producto.findByPk(idProducto)
        res.status(200).json(producto)

    }
```
* Probamos el GET
    * Primero tiene que estar corriendo la app: npm run dev
    * New HTTP Request
    * como get ponemos http://localhost:3000/productos/unId y mandamos SEND

### GET - Con filtros
* A la funcion tenemos que pasarle un objeto de esta forma:
```js
{
    where: {...}
}
```
* O tambien podemos hacerlo de esta forma:
```js
{
    attributes: ["nombreDelCampo1","nombreDelCampo2"...]
}
```
***NOTA: El where lo podemos usar como condicion de filtro para otras cosas por lo que podemos tener un attributes con un where juntos***



### POST - Crear productos
* req.body --> el body es el lugar donde el usuario manda los datos para crear un producto, entonces para poder leer esos datos tenemos que usar el req.body

* arriba de todo pero abajo de los const ponemos esto para que al hacer el req.body la app pueda leer el JSON que va a mandar el usuario
```js
app.use(express.json())
```

* El req (request) es un objeto que representa la peticion del usuario
* Dentro de la peticion el usuario tiene que mandar el nombre, el precio y el stock por el body
```js
req.body.nombre
req.body.precio
req.body.stock
```
Podemos escribirlo mejor como:
```js
const{nombre, precio, stock} = req.body   // a esto se le llama Desestructuracion en js
```
***NOTA: Si el if no tiene else usamos el return***
```js
if(!nombre || precio == null || !stock){ // difentes formas de escribir que no tienen valor
           return res.status(400).json({message:"Faltan campos obligatorios"}) //el return es porque no tiene else
        }
```
* Creamos un producto interactuando con la bdd
* INSERT de SQL:
```js
Producto.create({})
```
* Con esto entonces creamos el producto
```js
const producto = Producto.create({
            nombre,
            precio,
            stock
        })
```
* con el create({}) no solo creamos un producto sino que lo devuelve por eso lo guardamos en la const producto

***NOTA: al crear un producto le pasamos claves de clave-valor pero como se llaman igual aca no es necesario***
```js
const producto = Producto.create({
            nombre: nombre, // clave nombre : valor de la const nombre
            precio: precio,
            stock: stock
        })

const producto = Producto.create({
            nombre,
            precio,
            stock
        })
```

* Respuesta de creacion con exito:
```js
res.status(201)
```
* Como toda operacion con la bdd necesitamos el await
```js
const producto = await Producto.create({})
```

* Probamos el POST
    * Primero tiene que estar corriendo la app: npm run dev
    * New HTTP Request
    * como POST ponemos http://localhost:3000/productos/ 
    * completamos en el body con los datos
    * elegimos raw y JSON
    * llenamos con este formato
    ```json
    [
        {
            "nombre": "un nombre en string",
            "precio": un int,
            "stock": un int
        },
        {
            ......
        },
        {
            .....
        }
    ]
    ```
    o para uno solo:
    ```json
    {
        "nombre": "un nombre en string",
        "precio": un int,
        "stock": un int
    }
    ```

    ***NOTA: va a crear el id(primarykey) automaticamente***
    * y mandamos SEND`

# RUTAS

**Para cada modelo vamos a crear un archivo de rutas**

* Importamos el router de express para definir las rutas de productos, los middlewares de validacion y los controladores para manejar las peticiones
```js
const { Router } = require('express') 
const productosController = require('../controllers/productos.controllers') 
const { validarProducto, validarProductoIdConCategoria, validarProductoId } = require('../middlewares/validarProductoId')
```
Pasos:
1. Importar el router express: const {Router} = require('express')
2. Importar los controladores: const productosController = require('../controllers/productos.controllers')
3. Importar los middlewares de validacion: const { validarProducto, validarProductoIdConCategoria, validarProductoId } = require('../middlewares/validarProductoId')


* Creamos una instancia del Router para definir las rutas de productos
```js
const router = Router()
```

* En las rutas definimos el path, el metodo http, el middleware de validacion y el controlador
* Usamos las instancia de router seguida por un punto del metodo http, luego el path, luego el/los middleware de validacion y por ultimo el controlador.

```js
router.get('/', productosController.obtenerProductos) // '/' es la ruta base para los productos
router.get('/:id', validarProductoIdConCategoria, productosController.obtenerProducto) // el :id es un parametro dinamico que va a recibir el id del producto que queremos obtener, el middleware validarProductoIdConCategoria se encarga de validar que el id exista y que el producto tenga una categoria asociada, si no cumple con la validacion devuelve un error, si cumple con la validacion pasa al controlador para devolver el producto encontrado
router.post('/', validarProducto, productosController.crearProducto)
router.put('/:id', validarProductoId, validarProducto, productosController.actualizarProducto)
router.delete('/:id', validarProductoId, productosController.eliminarProducto)
```


*  Para poder usar estas rutas en la app.js tenemos que exportarlas
```js
module.exports = router
```

* Para las relaciones M a M NO cremaos un nuevo archivo para la tabla intermedia, las rutas pueden ir en cualquiera de los archivos de rutas de los modelos relacionados, podemos ponerlo si queremos en la ruta del modelo que nos parezca mas importante

* Si queremos agregar varias etiquetas a un producto a traves de un array:
```js
router.post("/:id/etiquetas", ....);
```
* Si queremos una etiqueta determinada a un producto por medio del id de la etiqueta:
```js
router.post("/:id/etiquetas/:etiquetaId", ...);
```


----------------------------------
## Exportar e importar funciones:
Si exportamos la funcion de esta forma tenemos que importar asi:
```js
module.exports = validarProducto // exportamos


const validarProducto = require('../middlewares/validarProductoId') // importamos
```
pero si exportamos usando un objeto debemos usar la desestructuracion para importar:
```js
module.exports = {   // exportamos
    validarProductoIdConCategoria,
    validarProductoId
}

const { validarProductoIdConCategoria, validarProductoId } = require('../middlewares/validarProductoId') // importamos 
```
-----------------------------------------

# SCHEMAS - JOI
* Es una bibloteca para validar datos
* Define reglas
* Valida estrutura, formato y tipo de datos
* Valida que los datos sean correctos

* Se define un esquema de como tienen que ser lo datos y JOI compara este esquema con los datos mandados por el usuario en el body

* Primero instalamos el paquete
```bash
npm i joi
```


## Carpeta Schema
* Importamos el paquete Joi

```js
const Joi = require('joi')
```
* Creamos un esquema de validacion
```js
const schemaProducto = Joi.object({ 
    //campos
})
```
Definimos como deben ser los datos que mande el usuario en el body


```js
const schemaProducto = Joi.object({ // tiene que ser un objeto
    nombre: Joi.string().min(3).max(100).required(),
    precio: Joi.number().integer().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    idCategoria: Joi.number().integer().positive().required()
})
```
* .string()--> de tipo string
* .min(3) --> minimo 3 caracteres
* .max(100)--> maximo 100 caracteres
* .required() --> es obligatorio
* number() --> de tipo numero
* .integer() --> tiene que ser un numero entero
* .positive() --> tiene que ser un numero positivo
* la diferencia entre el .positive() y el .min(0) es que el positive no acepta el 0, mientras que el min(0) si lo acepta
* .precision(2) --> para numeros decimales, le digo que tenga 2 decimales como maximo
* . default() --> para poner un valor por defecto si el usuario no lo manda

* Por ultimo importamos el esquema

```js
module.exports = schemaProducto
```
## Carpeta Schema
* Podemos personalizar los mensajes de error que devuelve JOI, para eso usamos el metodo .messages({}) despues de definir las reglas de validacion, dentro del messages le pasamos un objeto con el tipo de error y el mensaje personalizado que queremos mostrar
```js
nombre: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({ // personalizacion de los mensajes de error
            "string.base": "El nombre debe ser un texto",
            "string.empty": "El nombre no puede estar vacio",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre no puede tener mas de 100 caracteres",
            "any.required": "El nombre es obligatorio"

        }),
```
* Puedo tener un schema dentro del otro

```js
const schemaCategoria = Joi.object({ // esquema de validacion para la categoria
    idCategoria: Joi.number()
        .integer()
        .positive()
        .required()
})

const schemaProducto = Joi.object({ 
    categoria: schemaCategoria.required(),
    .....
})

```

# MIDDLEWARE
* VALIDACIONES
* Recibe peticiones y manda una respuesta
* Entre la peticion y la app --> Preprocesamiento
* Entre la app y la respusta --> Postprocesamiento
* La funcion de preprocesamiento va a hacer algo con la solicitud antes de llegar al destino, por ej: verificar que el usuario este autenticado, registrar la solicitud de un archivo.
* Es como un filtro para solicitudes o respuestas y decide si pasa a otro filtro o responde directamente
* Ocurre antes de ejecutar el controlador, son validaciones antes del controlador


## App.js:
```js
app.use(express.json()) 
```
esto es un Middleware armado en express, se lo conoce middleware a nivel aplicacion porque se ejecuta antes de las rutas

```js
app.use(express.json())

app.use('/productos', routerProductos)
app.use('/categorias', routerCategoria)
```
* La funcion de preprocesamiento lee el json que manda el usuario en el body y lo convierte en un objeto en js

* En las rutas van despues del path y antes del controlador
```js
router.post('/', validarProducto, productosController.crearProducto)
```
* Entonces cuando quiero crear un producto primero va a ejecutar la funcion para validar un producto(que mando el usuario por el body)
    * si es exitosa ejecuta el next propia de la funcion y va a pasar al controlador

**ENTONCES EN VEZ DE QUE LOS CHEQUEOS/VALIDACIONES LOS HAGA EL CONTROLADOR LOS VA A HACER EL MIDDLEWARE**

## Carpeta Middleware
* Creamos una nueva carpeta en el proyecto llamada middlewares
* Vamos a crear funciones con esta estructura
```js
const validarProducto = (req,res,next) => {
    // validacion
    next()
}
```
Al ejecutar next() va a pasar a la fucion controladora para poder crear el producto
Son parecidas a las funciones controladoras pero con un tercer parametro next

* Ahora podemos hacer que el middleware se encargue las validaciones, entonces podemos pasar los ifs que teniamos en el controlador
```js
const validarProducto = (req,res,next) =>{ 
    const{nombre, precio, stock, categoriaId} = req.body // van a tener los valores que mande el usuario
        // si NO mando alguno de los campos
        if(!nombre || precio == null || stock == null, !categoriaId){ // difentes formas de escribir que no tienen valor
           return res.status(400).json({message:"Faltan campos obligatorios"}) //el return es porque no tiene else
        }
        if(precio <=0){
            return res.status(400).json({message: "El precio debe ser mayor a 0"})
        }
        // Si pasa la validacion
        next()
}
```

* Para poder utilizar esta funcion debemos exportarla
```js
module.exports =  validarProducto
```
* y en las rutas importarla
```js
const validarProducto = require('../middlewares/validarProducto')
```
* la podemos utilizar asi, respetando que se ejecute antes del controlador
```js
router.post('/', validarProducto, productosController.crearProducto)
```

* Si queremos pasarle un argumento a un controlador desde el middleware
```js
req.producto = producto // guardamos el producto en el objeto req para que pueda ser usado en el controlador
```

## Carpeta Middleware
* Importamos el esquema

```js
const schemaProducto = require('../schemas/producto.schema')
```
* Validamos el request body con el esquema que realizamos

```js
const {error} = schemaProducto.validate(req.body) 
```
* Si hay un error de validacion devolvemos el mensaje del primer error encontrado, el details es un array con todos los errores encontrados, el message es el mensaje de error que se genero

```js
if(error){ 
        return res.status(400).json({message: error.details[0].message}) 
    }  
```
* Al final del middleware si pasa la validacion ejecutamos el next para que pase al controlador
```js
next()
```
