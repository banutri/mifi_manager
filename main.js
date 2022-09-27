
var back = require('androidjs').back;
const axios = require('axios');


// let arr_result=[]
// back.on('data_home',function(){
//     let url_multi = "http://192.168.8.1/reqproc/proc_get?multi_data=1&cmd=realtime_tx_thrpt,ppp_status,realtime_rx_bytes,realtime_rx_thrpt,sub_network_type,SSID1,rssi,lte_rsrp,mfsw_version,mfhw_version,fw_version,MAX_Access_num,modem_main_state,sta_count,loginfo,signalbar,network_type,sub_network_type,battery_charging,battery_pers,wifi_cur_state,realtime_tx_bytes,realtime_time,imei,sim_imsi,cr_version,mcc,mnc,net_select"
//     axios.get(url_multi).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })

//     let url_opsel = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_NET_OPER"
//     axios.get(url_opsel).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })
//     let url_ziccid = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_ZICCID_INFO"
//     axios.get(url_ziccid).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })
    
//     let url_band_info = "http://192.168.8.1/reqproc/proc_get?cmd=get_band_info"
//     axios.get(url_band_info).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })
//     let url_get_csq_info = "http://192.168.8.1/reqproc/proc_get?cmd=get_csq_info"
//     axios.get(url_get_csq_info).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })
//     let url_crrrsp = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_CRRRSP_INFO"
//     axios.get(url_crrrsp).then((results)=>{
//         let res = results.data
//         arr_result.push(res)
        
//     })

//     let merg_ar_obj = {...arr_result[0],...arr_result[1],...arr_result[2],...arr_result[3],...arr_result[4]}
//     back.send('res_data_home', merg_ar_obj)
//     arr_result=[]
// })
// auto send data ke depan setiap 1 detik

back.on('login', function(encoded_pass){
    let login_url = "http://192.168.8.1/reqproc/proc_post?isTest=false&goformId=LOGIN&password="+encoded_pass
    axios.post(login_url, {}).then((response) => {
        back.send('res_login',response.data)
      }, (error) => {
        back.send('res_login',error)
      });
})

back.on('logout', function(){
    let logout_url = "http://192.168.8.1/reqproc/proc_post?isTest=false&goformId=LOGOUT"
    axios.post(logout_url, {}).then((response) => {
        back.send('res_logout',response.data)
      }, (error) => {
        back.send('res_logout',error)
      });
})

let arr_result=[]
setInterval(() => {
    let url_multi = "http://192.168.8.1/reqproc/proc_get?multi_data=1&cmd=realtime_tx_thrpt,ppp_status,realtime_rx_bytes,realtime_rx_thrpt,sub_network_type,SSID1,rssi,lte_rsrp,mfsw_version,mfhw_version,fw_version,MAX_Access_num,modem_main_state,sta_count,loginfo,signalbar,network_type,sub_network_type,battery_charging,battery_pers,wifi_cur_state,realtime_tx_bytes,realtime_time,imei,sim_imsi,cr_version,mcc,mnc,net_select"
    axios.get(url_multi).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })

    let url_opsel = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_NET_OPER"
    axios.get(url_opsel).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })
    let url_ziccid = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_ZICCID_INFO"
    axios.get(url_ziccid).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })
    
    let url_band_info = "http://192.168.8.1/reqproc/proc_get?cmd=get_band_info"
    axios.get(url_band_info).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })
    let url_get_csq_info = "http://192.168.8.1/reqproc/proc_get?cmd=get_csq_info"
    axios.get(url_get_csq_info).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })
    let url_crrrsp = "http://192.168.8.1/reqproc/proc_get?cmd=GOFORM_GET_CRRRSP_INFO"
    axios.get(url_crrrsp).then((results)=>{
        let res = results.data
        arr_result.push(res)
        
    })

    let merg_ar_obj = {...arr_result[0],...arr_result[1],...arr_result[2],...arr_result[3],...arr_result[4],...arr_result[5]}

    if(Object.keys(merg_ar_obj).length>0){
        back.send('res_data_home', merg_ar_obj)
    }
    arr_result=[]
}, 1000);

