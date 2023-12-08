const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRouter = require('./handler/register-handler');
const loginRouter = require('./handler/login-handler');
const userRouter = require('./handler/user-handler');
const formInputHandlerRouter = require('./handler/formInput-handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', registerRouter);
app.use('/api/auth', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/form', formInputHandlerRouter);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
