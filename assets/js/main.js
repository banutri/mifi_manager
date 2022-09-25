var base_url = 'http://192.168.8.1'

$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false
    });
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();

    // ambil data nama opsel
    // $.ajax({
    //     type: "get",
    //     url: base_url+"/reqproc/proc_get",
    //     data: {
    //         isTest:false,
    //         cmd:"GOFORM_GET_NET_OPER"
    //     },
    //     dataType: "jsonp",
    //     beforeSend: function(request) {
    //         // request.setRequestHeader();
    //     },
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
    fetch(base_url, {
        mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin':'*'
        // }
      })
        .then(function(resp){
            console.log(resp);
        })

    $('.carrier-name').html('TELKOMTOL')
    
});