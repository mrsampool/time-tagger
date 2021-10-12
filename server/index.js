const {app} = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, ()=> {
  if (process.env.ENV === 'DEV'){
    console.log(`\nI'm listening on PORT ${process.env.PORT}! 👂\n`);
  }
});