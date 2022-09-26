const http = require('http');
var back = require('androidjs').back;
const axios = require('axios')

axios.get('http://192.168.8.1/reqproc/proc_get?multi_data=1&cmd=realtime_tx_bytes')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
return

http.get("http://192.168.8.1/reqproc/proc_get?multi_data=1&cmd=realtime_tx_bytes", (result) => {
        result.on('data', (d) => {
            console.log(d);
            // back.send('result', 'success'+d);
        });
        }).on('error', (e) => {
            console.log('error');
            console.log(e);
            // back.send('result', 'error '+e);
        });