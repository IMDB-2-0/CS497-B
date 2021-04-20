const OrientDBClient = require('orientjs').OrientDBClient

   OrientDBClient.connect({
    host: "localhost",
    port: 2424
  }).then(client => {

    client.session({ name: "imdb2-0", username: "root", password: "root" })
      .then((session) => {
        session.query('select * from V')
          .on('data', data => {
            console.log(data)
          })
          .on('error', (err) => {
            console.log(err)
          })
          .on('end', () => {
            console.log('End of the stream');
            session.close().then(()=>{
              return client.close()
            }).then(()=>{
                console.log('Client closed')
            });
          })

      })

  })

var express = require('express')
var app = express()


app.get('/', function (req, res) {
    OrientDBClient.connect({
        host: "localhost",
        port: 2424
      }).then(client => {
    
        client.session({ name: "imdb2-0", username: "root", password: "root" })
          .then((session) => {
            session.query('select * from V')
              .on('data', data => {
                console.log(data)
                res.send(data);
              })
              .on('error', (err) => {
                console.log(err)
              })
              .on('end', () => {
                console.log('End of the stream');
                session.close().then(()=>{
                  return client.close()
                }).then(()=>{
                    console.log('Client closed')
                });
              })
    
          })
    
      })
  });