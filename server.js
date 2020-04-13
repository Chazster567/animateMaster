var express = require('express');
var app = express();
var texts = 'hello';

for(i = 0; i < 10; i++) {
    texts.length
}

app.get('/', (req, res)=>{
    res.send(texts)
})

//listening for requests on port 3000
app.listen(3000, ()=> {
    console.log('Server listening on port 3000');
})