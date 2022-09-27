

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
        
    })
    
    
    // setInterval(() => {
        
    //     front.send('data_home');
    // }, 1000);

    
    
});


// ketika data home datang...
let count=0
front.on('res_data_home', function(res){
    count = count+1
    $('.re-count').html(count)
    $('title').html(res.mfhw_version)
    console.log(res);
    $('.carrier-name').html(res.network_provider)
    $('.csq_value').html(res.csq_value)
    $('.band-info').html(res.band_main)
    $('.mnc').html(res.mnc)
    $('.mcc').html(res.mcc)
    $('.cellid').html(res.cellid)
    $('.rssi').html(res.rssi)
    $('.sinr').html(res.sinr)
    $('.lte_rsrp').html(res.lte_rsrp)
    $('.rsrq').html(res.rsrq)
    $('.ppp-stat').html((res.ppp_status=='ppp_disconnected')?'Data Not Connected' :'Data Connected')
    $('.duration').html(moment.utc(res.realtime_time*1000).format('HH:mm:ss'))
    $('.rl_tx').html(angka_koma(Math.round(res.realtime_tx_bytes/1000000)))
    $('.rl_rx').html(angka_koma(Math.round(res.realtime_rx_bytes/1000000)))

})



function angka_koma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}