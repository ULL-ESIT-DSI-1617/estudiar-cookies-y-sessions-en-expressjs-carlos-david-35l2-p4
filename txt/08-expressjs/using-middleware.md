# Utilización del middleware

Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de\_middleware\_son funciones que tienen acceso al[objeto de solicitud](http://expressjs.com/es/4x/api.html#req\)\(`req`\), al[objeto de respuesta]\(http://expressjs.com/es/4x/api.html#res\)\(`res`\) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada`next`.

Las funciones de middleware pueden realizar las siguientes tareas:

* Ejecutar cualquier código.
* Realizar cambios en la solicitud y los objetos de respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Invocar la siguiente función de middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar`next()`para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

## Middleware de nivel de aplicación {#middleware.application}

Este ejemplo muestra una función de middleware sin ninguna vía de acceso de montaje. La función se ejecuta cada vez que la aplicación recibe una solicitud

```js
app.use(function(req, res, next) {

    console.log('Time:', Date.now())
    res.send('Printando hora en la consola del server')
    next()

})
```

Este ejemplo muestra una función de middleware montada en la vía de acceso /user/:id. La función se ejecuta para cualquier tipo de solicitud  
HTTP en la vía de acceso /user/:id.

```js
app.use('/user/:id', function (req, res, next) {

  console.log('Request Type:', req.method)
  next()

})
```

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso /user/:id.

```js
app.get('/user/:id', function(req, res, next) {

    console.log('ID:', req.params.id)
    next()

}, function(req, res, next) {

    res.send('User Info')

})



app.get('/user/:id', function(req, res, next) {

    res.end(req.params.id)

})


app.use('/ip', function(req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Tu dirección ip es, ' + ip);
    res.write('<h1>Tu dirección ip es, ' + ip + '</h1>');

})
```



