const express = require('express')
const app = express();
const port = 3000 ;


app.listen(port, function(error){
  if(error){
    console.log('we got an error', error)
  } else {
    console.log('server work properly')
  }

  
})