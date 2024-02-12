var PORT = process.env.PORT || 3000
const http = require('./app');

http.listen(PORT, () =>{
    console.log('Servidor en el puerto 3000');
})