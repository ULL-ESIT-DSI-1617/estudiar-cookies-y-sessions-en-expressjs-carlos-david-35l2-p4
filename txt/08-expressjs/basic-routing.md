# Direccionamiento básico {#direccionamiento-básico}

El direccionamiento hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

La definición de ruta tiene la siguiente estructura:

```js
app.METHOD(PATH, HANDLER)
```

#### Los siguientes ejemplos ilustran la definición de rutas simples:

Responde con "GET Respuesta al apartado basic\_routing" en la página inicial.

```js
app.get('/', function (req, res) {

res.send('GET Respuesta al apartado basic_routing')

})
```

Responde a la solicitud POST en la ruta raíz \(/\), la página de inicio de la aplicación.

```js
app.post('/', function (req, res) {

  res.send('POST Respuesta al apartado basic_routing')

})
```

Responde a una solicitud PUT en la ruta raíz \(/\).

```js
app.put('/', function (req, res) {

  res.send('Got a PUT  al apartado basic_routing')

})
```

Responde a una solicitud DELETE en la ruta raíz\(/\).

```js
app.delete('/', function (req, res) {

  res.send('Got a DELETE al apartado basic_routing')

})
```
