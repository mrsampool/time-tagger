const {app} = require('./app');
if (process.env.ENV !== 'PROD'){
  require('dotenv').config();
}

console.log(process.env);

app.listen(process.env.PORT, ()=> {
  if (process.env.ENV === 'DEV'){
    console.log(`\nI'm listening on PORT ${process.env.PORT}! 👂\n`);
  }
});