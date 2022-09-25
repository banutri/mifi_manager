const http = require('http');
var querystring = require('querystring')
const axios = require('axios');

const fs = require('fs');
const url = require('url');

http.createServer(function (req, server_res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;


    if(req.method=='GET'){
        if(q.pathname=='/' || q.pathname=='index.html')
        {
            fs.readFile('./views/index.html', function(err, data) {
                if (err) {
                server_res.writeHead(404, {'Content-Type': 'text/html'});
                return server_res.end("404 Not Found");
                } 
                server_res.writeHead(200, {'Content-Type': 'text/html'});
                server_res.write(data);
                return server_res.end();
            });
        }
        else
        {
            if(q.pathname=='/api/get'){
                let params = q.query
                // return console.log(params);
                let url_search = q.search
                let par_length = Object.keys(params).length;
                if(par_length>0 && "cmd" in params){

                    if("multi_data" in params){
                        http.get("http://192.168.8.1/reqproc/proc_get"+url_search+"&multi_data=1", (result) => {
                        result.on('data', (d) => {
                            server_res.write(d)
                            server_res.end()
                        });
                        }).on('error', (e) => {
                            server_res.end(e)
                        });
                    }
                    else{
                        http.get("http://192.168.8.1/reqproc/proc_get"+url_search, (result) => {
                        result.on('data', (d) => {
                            server_res.write(d)
                            server_res.end()
                        });
                        }).on('error', (e) => {
                            server_res.end(e)
                        });
                    }
                    
                    
                }
                else{
                    server_res.writeHead(404, {'Content-Type': 'text/html'});
                    return server_res.end("404 Not Found");
                }
                
                
            }

            else{
                fs.readFile('./'+filename, function(err, data) {
                    if (err) {
                    server_res.writeHead(404, {'Content-Type': 'text/html'});
                    return server_res.end("404 Not Found");
                    } 
                    // server_res.writeHead(200, {'Content-Type': 'text/html'});
                    server_res.write(data);
                    return server_res.end();
                });
            }
            
            
        }
    }
    else if(req.method=='POST'){
        
        if(q.pathname=='/api/post'){

            req.on('data',(data)=>{
                // hasil data post berupa stream buffer
                // convert dulu ke json
                data = chunk_to_json(data)
                // return console.log(data);

                let dat_length = Object.keys(data).length
                if(dat_length>0 && "goformId" in data){
                   
                    let data_param = new URLSearchParams(data).toString()
                    axios.post("http://192.168.8.1/reqproc/proc_post?"+data_param,{}).then((response) => {
                        console.log(response.data);
                        server_res.write(JSON.stringify(response.data))
                        server_res.end()
                      }, (error) => {
                        server_res.end(error)
                      });
                    
                }

            });
            


            // if(par_length>0 && "goformId" in params){
                
            //     http.get("http://192.168.8.1/reqproc/proc_post", (result) => {
            //         result.on('data', (d) => {
            //             server_res.write(d)
            //             server_res.end()
            //         });
            //     }).on('error', (e) => {
            //         server_res.end(e)
            //     });
            // }
            // else{
            //     server_res.writeHead(404, {'Content-Type': 'text/html'});
            //     return server_res.end("404 Not Found");
            // }
        }
        else{
            server_res.writeHead(404, {'Content-Type': 'text/html'});
            return server_res.end("404 Not Found");
        }
    }
    
    
    
  }).listen(1234); //the server object listens on port 1234

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

 function post_to_server(json_data) {
    // Build the post string from an object
    var post_data = querystring.stringify({
        'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
        'output_format': 'json',
        'output_info': 'compiled_code',
          'warning_level' : 'QUIET',
          'js_code' : json_data
    });
  
    // An object of options to indicate where to post to
    var post_options = {
        host: '192.168.8.1',
        port: '80',
        path: '/reqproc/proc_post',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
  
    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
  
    // post the data
    post_req.write(post_data);
    post_req.end();
  
  }