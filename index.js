const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const setupWebSocket = require('./webSocket/webSocket'); 
const http = require("http");
//middlewares
const goodReq = require('./middleware/validateLoginRequests');

// controllers
const {login , register} = require('./controllers/userAuth');

const app = express();
const server = http.createServer(app);
setupWebSocket(server)

app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,        
  };
  
  app.use(cors(corsOptions));


  app.use(bodyParser.json());
  app.get('/',(req,res)=>res.send('hello'))
  app.post('/login', [goodReq,login,]);
  
  app.post('/register',[goodReq,register])
  app.post('/logout', (req, res) => {
    // Clear the cookie, even if there's no body
    res.clearCookie("token", { httpOnly: true, path: '/' });
    res.status(200).json({ message: "Logout successful" });
  });
app.use('/vendor',require('./Routes/vendorRoutes'));
app.use('/reserv',require('./Routes/reservRoutes'));
app.use('/search',require('./Routes/searchRoutes'))
app.use('/review',require('./Routes/reviewRoutes'));
app.use('/restaurant', require('./Routes/restaurantRoutes'));
app.use('/table', require('./Routes/tableRoutes'));


const PORT = 3500;
server.listen(PORT, () =>
    console.log(`server running on :\n http://localhost:${PORT}/`)
);