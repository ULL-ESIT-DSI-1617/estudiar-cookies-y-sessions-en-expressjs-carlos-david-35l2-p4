# Direccionamiento

Ejemplo de una ruta muy básica.

```js
app.get('/', function (req, res) {
  res.send('root')
})

```
Esta vía de acceso de ruta coincidirá con las solicitudes a /about.



```js
app.get('/about', function (req, res) {
  res.send('about')
})
```


Esta vía de acceso de ruta coincidirá con las solicitudes a /random.text.


```js
app.get('/random', function (req, res) {
  res.send('random.txt')
})

```
Esta vía de acceso de ruta coincidirá con acd y abcd.


```js
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
```
Esta vía de acceso de ruta coincidirá con butterfly y dragonfly, pero no con butterflyman, dragonfly man, etc.


```js
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```



```js
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

```
Una función de devolución de llamada individual puede manejar una ruta.

Por ejemplo:
```js
app.get('/example/a', function (req, res) {

    res.send('Hello from A!')

    })
  ```  

Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto next).

Por ejemplo:


```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

Una matriz de funciones de devolución de llamada puede manejar una ruta.

Por ejemplo:


```js
var cb0 = function(req, res, next) {
    console.log('CB0')
    next()
}



var cb1 = function(req, res, next) {
    console.log('CB1')
    next()
}



var cb2 = function(req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

app.get('/example/d', [cb0, cb1], function(req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function(req, res) {
    res.send('Hello from D!')
})
```
