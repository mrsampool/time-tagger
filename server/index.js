const {app} = require('./app');
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

app.listen(process.env.PORT, ()=> {
  if (process.env.NODE_ENV !== 'production'){
    console.log(`\nI'm listening on PORT ${process.env.PORT}! 👂\n`);
  }
});