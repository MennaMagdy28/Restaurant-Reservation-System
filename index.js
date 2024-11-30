const express = require("express");
const {login , register} = require('./controllers/userAuth');
const goodReq = require('./middleware/validateLoginRequests');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.get('/',(req,res)=>res.send('hello'))
app.post('/login', [goodReq,login,]);
app.post('/register',[goodReq,register])


const PORT = 3500;
app.listen(PORT, () =>
    console.log(`server running on :\n http://localhost:${PORT}/`)
);
