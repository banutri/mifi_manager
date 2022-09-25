var base_url = 'http://localhost:1234/'

$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false
    });
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();


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
    
    get_home_info()
    setInterval(() => {
        get_home_info()
    }, 3000);

    
    
});

function get_home_info(){
    let cmd_list_multi = ['signalbar','network_type','realtime_tx_bytes','realtime_rx_bytes']
    // ajax multi
    $.ajax({
        type: "get",
        url: base_url+"api/get",
        data: {
            cmd:cmd_list_multi.toString(),
            multi_data:1,
        },
        dataType: "json",
        success: function (response) {
            $('.rl_tx').html(angka_koma(Math.round(response.realtime_tx_bytes/1000)))
            $('.rl_rx').html(angka_koma(Math.round(response.realtime_rx_bytes/1000)))
        }
    });
    
    
    $.ajax({
        type: "get",
        url: base_url+"api/get",
        data: {
            cmd:"GOFORM_GET_NET_OPER"
        },
        dataType: "json",
        success: function (response) {
            $('.carrier-name').html(response.network_provider)
        }
     });
    $.ajax({
        type: "get",
        url: base_url+"api/get",
        data: {
            cmd:"get_band_info"
        },
        dataType: "json",
        success: function (response) {
            $('.band-info').html(response.band_main)
        }
     });
    }
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
function angka_koma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}