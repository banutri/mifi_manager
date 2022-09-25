var base_url = 'http://localhost:1234/'

$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false
    });
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();

    $.ajax({
            type: "get",
            async:false,
            url: base_url+'api/get',
            data: {
                cmd:'imei,network_provider'
            },
            dataType: "json",
            success: function (response) {
                
                let opsel = response.network_provider
                $('.carrier-name').html(opsel)
            },
            error:function(){
                $('.carrier-name').html('Server gak jalan')
            }
        });

    $('.btn-pwr').on('click',function(){
        console.log('clicked!');
        // ambil data nama opsel
        // $.ajax({
        //     type: "get",
        //     async:false,
        //     url: base_url+'cell_info',
        //     data: "",
        //     dataType: "json",
        //     success: function (response) {
        //         let opsel = response.network_provider
        //         $('.carrier-name').html(opsel)
        //     },
        //     error:function(){
        //         $('.carrier-name').html('Server gak jalan')
        //     }
        // });

        
    })
    

    
    
});
// $.ajax({
//     type: "get",
//     url: base_url+"/reqproc/proc_get",
//     data: {
//         isTest:false,
//         cmd:"GOFORM_GET_NET_OPER"
//     },
//     dataType: "json",
//     beforeSend: function(request) {
//         // request.setRequestHeader();
//     },
//     success: function (response) {
//         console.log(response);
//     }
// });