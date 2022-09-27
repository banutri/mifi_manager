

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
    
    $('.btn-login').on('click',function(){
      
        Swal.fire({
            title: 'Login Form',
            html: `
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
              
              const password = Swal.getPopup().querySelector('#password').value
              if (!password) {
                Swal.showValidationMessage(`Please enter password`)
              }
              return { password: password }
            }
          }).then((result) => {
            front.send('login',btoa(result.value.password))
            front.on('res_login',function(res){
                console.log(res);
                if(res.result=='failure'){
                    Swal.fire({
                        icon:'error',
                        text:'Error!',
                        heightAuto:false,
                    })
                }
                else if(res.result==0){
                    Swal.fire({
                        icon:'success',
                        text:'Login Berhasil!',
                        heightAuto:false,
                    })
                }
                else if(res.result>0){
                    Swal.fire({
                        icon:'error',
                        text:'Password salah! sisa percobaan '+res.result+' lagi!',
                        heightAuto:false,
                    })
                }
            })
            
          })
    })
    $('.btn-logout').on('click',function(){
        
        Swal.fire({
            title: 'Anda ingin logout?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
          }).then((result) => {
            if (result.isConfirmed) {
                front.send('logout');
                front.on('res_logout',function(res){
                    console.log(res);
                    if(res.result=='success'){
                        Swal.fire('Berhasil logout!', '', 'success')
                    }else{
                        Swal.fire('Gagal logout!', '', 'error')
                    }
                })
              
            } 
          })
    })

    
    
});


// ketika data home datang...
let count=0
front.on('res_data_home', function(res){
    count = count+1
    $('.re-count').html(count)
    $('title').html(res.mfhw_version)
    // console.log(res);
    $('.loggedin').html((res.loginfo=='ok')? 'Yes':'No')
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