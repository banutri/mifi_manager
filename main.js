const http = require('http');
var back = require('androidjs').back;
var querystring = require('querystring')
const axios = require('axios');

const fs = require('fs');
const url = require('url');

back.on('api_get', function(type=0,cmds){
    let cmd = cmds.toString()
    if(type==1){ /// request multi data
        axios.get('http://192.168.8.1/reqproc/proc_get?multi_data=1&cmd='+cmd)
        .then((response) => {
            back.send('results', response.data);
            // console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
        });
    }
    else if(type==0){
        axios.get('http://192.168.8.1/reqproc/proc_get?cmd='+cmd)
        .then((response) => {
            back.send('results', response.data);
            // console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
        });
    }
    // return console.log(cmds);
    

    
    
});

return
// http.createServer(function (req, server_res) {
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;


//     if(req.method=='GET'){
//         if(q.pathname=='/' || q.pathname=='index.html')
//         {
//             fs.readFile('./views/index.html', function(err, data) {
//                 if (err) {
//                 server_res.writeHead(404, {'Content-Type': 'text/html'});
//                 return server_res.end("404 Not Found");
//                 } 
//                 server_res.writeHead(200, {'Content-Type': 'text/html'});
//                 server_res.write(data);
//                 return server_res.end();
//             });
//         }
//         else
//         {
//             if(q.pathname=='/api/get'){
//                 let params = q.query
//                 // return console.log(params);
//                 let url_search = q.search
//                 let par_length = Object.keys(params).length;
//                 if(par_length>0 && "cmd" in params){

//                     if("multi_data" in params){
//                         http.get("http://192.168.8.1/reqproc/proc_get"+url_search+"&multi_data=1", (result) => {
//                         result.on('data', (d) => {
//                             // return console.log(d);
//                             server_res.writeHead(200,{"Access-Control-Allow-Origin": "*"})
//                             server_res.write(d)
//                             server_res.end()
//                         });
//                         }).on('error', (e) => {
//                             server_res.end(e)
//                         });
//                     }
//                     else{
//                         http.get("http://192.168.8.1/reqproc/proc_get"+url_search, (result) => {
//                         result.on('data', (d) => {
//                             server_res.writeHead(200,{"Access-Control-Allow-Origin": "*"})
//                             server_res.write(d)
//                             server_res.end()
//                         });
//                         }).on('error', (e) => {
//                             server_res.end(e)
//                         });
//                     }
                    
                    
//                 }
//                 else{
//                     server_res.writeHead(404, {'Content-Type': 'text/html'});
//                     return server_res.end("404 Not Found");
//                 }
                
                
//             }

//             else{
//                 fs.readFile('./'+filename, function(err, data) {
//                     if (err) {
//                     server_res.writeHead(404, {'Content-Type': 'text/html'});
//                     return server_res.end("404 Not Found");
//                     } 
//                     // server_res.writeHead(200, {'Content-Type': 'text/html'});
//                     server_res.write(data);
//                     return server_res.end();
//                 });
//             }
            
            
//         }
//     }
//     else if(req.method=='POST'){
        
//         if(q.pathname=='/api/post'){

//             req.on('data',(data)=>{
//                 // hasil data post berupa stream buffer
//                 // convert dulu ke json
//                 data = chunk_to_json(data)
//                 // return console.log(data);

//                 let dat_length = Object.keys(data).length
//                 if(dat_length>0 && "goformId" in data){
                   
//                     let data_param = new URLSearchParams(data).toString()
//                     axios.post("http://192.168.8.1/reqproc/proc_post?"+data_param,{}).then((response) => {
//                         server_res.writeHead(200,{"Access-Control-Allow-Origin": "*"})
//                         console.log(response.data);
//                         server_res.write(JSON.stringify(response.data))
//                         server_res.end()
//                       }, (error) => {
//                         server_res.end(error)
//                       });
                    
//                 }

//             });
            


//             // if(par_length>0 && "goformId" in params){
                
//             //     http.get("http://192.168.8.1/reqproc/proc_post", (result) => {
//             //         result.on('data', (d) => {
//             //             server_res.write(d)
//             //             server_res.end()
//             //         });
//             //     }).on('error', (e) => {
//             //         server_res.end(e)
//             //     });
//             // }
//             // else{
//             //     server_res.writeHead(404, {'Content-Type': 'text/html'});
//             //     return server_res.end("404 Not Found");
//             // }
//         }
//         else{
//             server_res.writeHead(404, {'Content-Type': 'text/html'});
//             return server_res.end("404 Not Found");
//         }
//     }
    
    
    
//   }).listen(3456); //the server object listens on port 3456

 function chunk_to_json(data){
    // ari buffer stream convert ke string url
    data = data.toString()
    // string url ke parsed
    const parsedData = new URLSearchParams(data);
    const dataObj = {};
    // parsed ke json
    for (var pair of parsedData.entries()) {
        dataObj[pair[0]] = pair[1];
    }

    return dataObj;
 }

