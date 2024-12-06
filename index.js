const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const setupWebSocket = require('./webSocket/webSocket'); 
const http = require("http");
//middlewares
const goodReq = require('./middleware/validateLoginRequests');

// controllers
const {login , register} = require('./controllers/userAuth');

const app = express();
const server = http.createServer(app);
setupWebSocket(server)

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res)=>res.send('hello'))
app.post('/login', [goodReq,login,]);
app.post('/register',[goodReq,register])

app.use('/vendor',require('./Routes/vendorRoutes'));
app.use('/reserv',require('./Routes/reservRoutes'));
app.use('/search',require('./Routes/searchRoutes'))
app.use('/feedback',require('./Routes/feedbackRoutes'));
app.use('/restaurant', require('./Routes/restaurantRoutes'));
app.use('/table', require('./Routes/tableRoutes'));


const PORT = 3500;
server.listen(PORT, () =>
    console.log(`server running on :\n http://localhost:${PORT}/`)
);