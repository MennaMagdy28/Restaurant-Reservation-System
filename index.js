const express = require("express");
const bodyParser = require('body-parser');

//middlewares
const goodReq = require('./middleware/validateLoginRequests');

// controllers
const {login , register} = require('./controllers/userAuth');

const app = express();

app.use(bodyParser.json());
app.get('/',(req,res)=>res.send('hello'))
app.post('/login', [goodReq,login,]);
app.post('/register',[goodReq,register])

app.use('/vendor',require('./Routes/vendorRoutes'))

const PORT = 3500;
app.listen(PORT, () =>
    console.log(`server running on :\n http://localhost:${PORT}/`)
);
