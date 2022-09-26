

var base_url = 'http://192.168.8.101:3456/'
// global toast seetalert
const Toast = Swal.mixin({
    toast: true,
    // heightAuto:false,
    position: 'bottom-right',
    iconColor: 'black',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    // timer: 1500,
    timerProgressBar: true
  })
  

$(document).ready(function () {

    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false
    });
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();


    $('.btn-pwr').on('click',function(){
        console.log('clicked!');
        get_home_info()
        
       
        
    })
    
    let count = 0

    get_home_info()
    setInterval(() => {
        $('.re-count').html(count)
        count = count+1
        get_home_info()
    }, 1000);

    
    
});

function get_home_info(){
    let cmd_list_multi = ['signalbar','network_type','realtime_tx_bytes','realtime_rx_bytes']

    

        // get opsel
    front.send('api_get', 0,'GOFORM_GET_NET_OPER');
        front.on('results', function(res){
            $('.carrier-name').html(res.network_provider)
            return
        })

        // get band info
        front.send('api_get',0,'get_band_info');
        front.on('results',function(res){
            $('.band-info').html(res.band_main)
            return
        })

        front.send('api_get', 1,cmd_list_multi);
        front.on('results', function(res){
            let tx = parseInt(res.realtime_tx_bytes)
            let rx = parseInt(res.realtime_rx_bytes)
            
            $('.rl_tx').html(angka_koma(Math.round(tx/1000000)))
            $('.rl_rx').html(angka_koma(Math.round(rx/1000000)))
            // $('.rl_tx').html(tx)
            // $('.rl_rx').html(rx)
            return
        })

    return
    
}

function angka_koma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}