var socket = io.connect();
$(document).ready(function(){
// Active tab đầu tiên khi trang web được chạy
// activeTab($('.congcu li:first-child'));
$('#thongbaotaomoi').css('display','block');

function onoff(param){
  $('#nut_on').click(function(){
    if(param[0].attr('id').toString() == $('#name_device').text().toString()){
      if($('#name_device').text().toString() == 'valve_3'){
        setTimeout(function(){
        $('#lamthoang').attr('src','assets/images/hmi/'+'lamthoang'+'.png');
      },1500)}
      socket.emit(param[1].toString(),{
        value: true,
        nodeid: "ns=1;s=\"Boolean\"." + "\"" + param[1] + "\""
      })
    }
  })
  $('#nut_off').click(function(){
    if(param[0].attr('id').toString() == $('#name_device').text().toString()){
      if($('#name_device').text().toString() == 'valve_3'){
      setTimeout(function(){
      $('#lamthoang').attr('src','assets/images/hmi/'+'lamthoang'+'_off'+'.png');
      },1500)}
      socket.emit(param[1].toString(),{
        value: false,
        nodeid: "ns=1;s=\"Boolean\"." + "\"" + param[1] + "\""
      })
    }
  });
}
var mang_so_lieu = [
  [$('#solieubon1'),'message34'],
  [$('#solieubon2'),'message35'],
  [$('#solieubon3'),'message36'],
  [$('#solieubon4'),'message37'],
  [$('#solieubon5'),'message38'],
  [$('#solieubon6'),'message39'],
  [$('#solieubon7'),'message40'],
  [$('#solieuclo'),'message41']
  ]
//#region READ DATA AFTER RELOAD
var value_valve_1 = [
  $('#valve_2'),
  $('#valve_4'),
  $('#valve_6'),
  $('#valve_8')
];
var value_valve_2 = [
  $('#valve_3'),
  $('#valve_5'),
  $('#valve_7'),
];
var value_valve_3 = [
  $('#valve_cuso4'),
  $('#valve_clo'),
  $('#valve_phen_nhom'),
  $('#valve_phen_sat'),
  $('#valve_flo')
]
var value_valve_4 = [
  $('#valve_xa_1'),
  $('#valve_xa_2'),
  $('#valve_xa_3')
]
var value_valve_5 = [
  $('#sensor_1'),
  $('#sensor_2'),
  $('#sensor_3'),
  $('#sensor_4'),
  $('#sensor_5'),
  $('#sensor_6'),
  $('#sensor_7'),
]
socket.on('value',function(data){
    var data_valve_1 = [data[4],data[6],data[8],data[10]];
    var data_valve_2 = [data[5],data[7],data[9]];
    var data_valve_3 = data.slice(10,15);
    var data_valve_4 = data.slice(16,19);
    var data_valve_5 = data.slice(21,28);
    var data_value = data.slice(33,41);
    // //So lieu
    for(let i = 0 ; i < mang_so_lieu.length ; i++){
      mang_so_lieu[i][0].empty();
      mang_so_lieu[i][0].append(`${data_value[i]}`);
    }
    // VALVE 1
    if(data[3].toString() == "true"){
      $('#valve_1').attr('src','assets/images/hmi/'+'pumps'+'.png');
    } else {
      $('#valve_1').attr('src','assets/images/hmi/'+'pumps'+'_off'+'.png');
    }
    if(data[5].toString() == "true"){
      $('#lamthoang').attr('src','assets/images/hmi/'+'lamthoang'+'.png');
    } else {
      $('#lamthoang').attr('src','assets/images/hmi/'+'lamthoang'+'_off'+'.png');
    }
    //BANG DIEU KHIEN
    if(data[0].toString() == "true"){
      $('#main_switch').attr('src','assets/images/hmi/start'+'.png');
    } else {
      $('#main_switch').attr('src','assets/images/hmi/stop'+'.png');
    }
    if(data[1].toString() == "true"){
      $('#emergency').attr('src','assets/images/hmi/emergency'+'.png');
    } else {
      $('#emergency').attr('src','assets/images/hmi/'+'emergency'+'_off'+'.png');
    }
    if(data[2].toString() == "true"){
      $('#mode').attr('src','assets/images/hmi/'+'auto'+'.png');
    } else {
      $('#mode').attr('src','assets/images/hmi/'+'manu'+'.png');
    }
    //VALVE 2 4 6 8
    for(let i = 0 ; i < value_valve_1.length ; i++ ){
        if(data_valve_1[i].toString() == "true"){

          value_valve_1[i].attr('src','assets/images/hmi/'+'valve_pumps'+'.png');
        } else {

          value_valve_1[i].attr('src','assets/images/hmi/'+'valve_pumps'+'_off'+'.png');
        }
    }
    //VALVE 3 5 7
    for(let i = 0 ; i < value_valve_2.length ; i++ ){
      if(data_valve_2[i].toString() == "true"){
        value_valve_2[i].attr('src','assets/images/hmi/'+'valve_pumps_1'+'.png');
      } else {
        value_valve_2[i].attr('src','assets/images/hmi/'+'valve_pumps_1'+'_off'+'.png');
      }
    }
    //VALVE HOA CHAT
    for(let i = 0 ; i < value_valve_3.length ; i++ ){
      if(data_valve_3[i].toString() == "true"){
        value_valve_3[i].attr('src','assets/images/hmi/'+'valve_hoachat'+'.png');
      } else {
        value_valve_3[i].attr('src','assets/images/hmi/'+'valve_hoachat'+'_off'+'.png');
      }
    }
    //VALVE XA
    for(let i = 0 ; i < value_valve_4.length ; i++ ){
      if(data_valve_4[i].toString() == "true"){
        value_valve_4[i].attr('src','assets/images/hmi/'+'valve'+'.png');
      } else {
        value_valve_4[i].attr('src','assets/images/hmi/'+'valve'+'_off'+'.png');
      }
    }
    //MOTOR KHUAY
    if(data[19].toString() == "true"){
      $('#motor_khuay').attr('src','assets/images/hmi/'+'motor_khuay'+'.png');
    } else {
      $('#motor_khuay').attr('src','assets/images/hmi/'+'motor_khuay'+'_off'+'.png');
    }
    //MOTOR OZONE
    if(data[20].toString() == "true"){
      $('#motor_ozone').attr('src','assets/images/hmi/'+'motor_ozone'+'.png');
    } else {
      $('#motor_ozone').attr('src','assets/images/hmi/'+'motor_ozone'+'_off'+'.png');
    }
    //CB MUC
    for(let i = 0 ; i < value_valve_5.length ; i++ ){
      if(data_valve_5[i].toString() == "true"){
        value_valve_5[i].attr('src','assets/images/hmi/'+'cb'+'.png');
      } else {
        value_valve_5[i].attr('src','assets/images/hmi/'+'cb'+'_off'+'.png');
      }
    }
})
//#endregion READ DATA ATFER RELOAD
//#region CLICK TAB

//#endregion CLICK TAB
//#region VALVE 1
$('#valve_1').click(function(){
  name = "#" + $(this).attr('id').toString();
  $('#status_device').empty();
  $('#name_device').empty();
  $('#name_device_1').empty();
  if($(this).attr('src').toString().indexOf("_off") == -1){
    $('#status_device').append('ĐANG BẬT');
  } else {
    $('#status_device').append('ĐANG TẮT');
  }
  $('#name_device').append('valve_1');
  $('#name_device_1').append('BƠM 1');
  $('#nut_on').click(function(){
      $(`${name}`).attr('src','assets/images/hmi/'+'pumps'+'.png');
      if( $('#name_device').text().toString() == 'valve_1') {
        socket.emit('valve_1',{
          value: true,
          nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'valve_1' + "\""
        })
      }

  })
  $('#nut_off').click(function(){
    $(`${name}`).attr('src','assets/images/hmi/'+'pumps'+'_off'+'.png');
    if( $('#name_device').text().toString() == 'valve_1') {
      socket.emit('valve_1',{
        value: false,
        nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'valve_1' + "\""
      })
    }

    });
});

socket.on('message4'.toString(),function(data){
  if(data == "true"){
    $('#valve_1').attr('src','assets/images/hmi/'+'pumps'+'.png');
  } else {
    $('#valve_1').attr('src','assets/images/hmi/'+'pumps'+'_off'+'.png');
  }
})

//#endregion VALVE 1
//#region  MOTOR KHUAY
$('#motor_khuay').click(function(){
    name = "#" + $(this).attr('id').toString();
    $('#status_device').empty();
    $('#name_device').empty();
    $('#name_device_1').empty();
    if($(this).attr('src').toString().indexOf("_off") == -1){
      $('#status_device').append('ĐANG BẬT');
    } else {
      $('#status_device').append('ĐANG TẮT');
    }
    $('#name_device').append('ĐỘNG CƠ KHUẤY');
    $('#name_device_1').append('ĐỘNG CƠ KHUẤY');

      $('#nut_on').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'motor_khuay'+'.png');
          if( $('#name_device').text().toString() == 'ĐỘNG CƠ KHUẤY') {
            socket.emit('motor_khuay',{
              value: true,
              nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'motor_khuay' + "\""
            })
          }
      })
      $('#nut_off').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'motor_khuay'+'_off'+'.png');
          if( $('#name_device').text().toString() == 'ĐỘNG CƠ KHUẤY') {
            socket.emit('motor_khuay',{
              value: false,
              nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'motor_khuay' + "\""
            })
          }
      });

})
socket.on('message20',function(data){
  if(data == "true"){
    $('#motor_khuay').attr('src','assets/images/hmi/'+'motor_khuay'+'.png');
  } else {
    $('#motor_khuay').attr('src','assets/images/hmi/'+'motor_khuay'+'_off'+'.png');
  }
})
//#endregion MOTOR KHUAY
//#region  MOTOR OZONE
$('#motor_ozone').click(function(){
    name = "#" + $(this).attr('id').toString();
    $('#status_device').empty();
    $('#name_device').empty();
    $('#name_device_1').empty();
    if($(this).attr('src').toString().indexOf("_off") == -1){
      $('#status_device').append('ĐANG BẬT');
    } else {
      $('#status_device').append('ĐANG TẮT');
    }
    $('#name_device').append('motor_ozone');
    $('#name_device_1').append('DC SỤC OZONE');

    $('#nut_on').click(function(){

        $(`${name}`).attr('src','assets/images/hmi/'+'motor_ozone'+'.png');
        if( $('#name_device').text().toString() == 'motor_ozone') {
          socket.emit('motor_ozone',{
            value: true,
            nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'motor_ozone' + "\""
          })
        }

    })
    $('#nut_off').click(function(){

      $(`${name}`).attr('src','assets/images/hmi/'+'motor_ozone'+'_off'+'.png');
      if( $('#name_device').text().toString() == 'motor_ozone') {
        socket.emit('motor_ozone',{
          value: false,
          nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'motor_ozone' + "\""
        })
      }
    })
});
socket.on('message21',function(data){
  if(data == "true"){
    $('#motor_ozone').attr('src','assets/images/hmi/'+'motor_ozone'+'.png');
  } else {
    $('#motor_ozone').attr('src','assets/images/hmi/'+'motor_ozone'+'_off'+'.png');
  }
})
//#endregion MOTOR OZONE
//#region VALVE 2,4,6,8
var mang_valve = [
  [$('#valve_2'),
  'valve_2','BƠM 2'],
  [$('#valve_4'),
  'valve_4','BƠM 4'],
  [$('#valve_6'),
  'valve_6','BƠM 6'],
  [$('#valve_8'),
  'valve_8','BƠM 8'],
];
var message = [
  [$('#valve_2'),'message5'],
  [$('#valve_4'),'message7'],
  [$('#valve_6'),'message9'],
  [$('#valve_8'),'message11'],
]
for (let i = 0 ; i < message.length ; i++ ){
  function listen_value_1(param){
    socket.on(param[1].toString(),function(data){
      if(data == "true"){
        param[0].attr('src','assets/images/hmi/'+'valve_pumps'+'.png');
      } else {
        param[0].attr('src','assets/images/hmi/'+'valve_pumps'+'_off'+'.png');
      }
    })
  }
  listen_value_1(message[i])
}
for(let i = 0 ; i < mang_valve.length ; i++){
  onoff(mang_valve[i]);
  mang_valve[i][0].click(function(){
      name = "#" + $(this).attr('id').toString();
      $('#status_device').empty();
      $('#name_device').empty();
      $('#name_device_1').empty();
      if($(this).attr('src').toString().indexOf("_off") == -1){
        $('#status_device').append('ĐANG BẬT');
        console.log($('#status_device').text())
      } else {
        $('#status_device').append('ĐANG TẮT');
      }
      $('#name_device').append(mang_valve[i][1]);
      $('#name_device_1').append(mang_valve[i][2]);
      $('#nut_on').click(function(){
            $(`${name}`).attr('src','assets/images/hmi/'+'valve_pumps'+'.png');
      })
      $('#nut_off').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'valve_pumps'+'_off'+'.png');
      });
    })
}
//#endregion VALVE 2,4,6,8
//#region VALVE 3,5,7
var mang_valve_1 = [
  [$('#valve_3'),
  'valve_3','BƠM 3'],
  [$('#valve_5'),
  'valve_5','BƠM 5'],
  [$('#valve_7'),
  'valve_7','BƠM 7'],
];
var message_1 = [
  [$('#valve_3'),'message6'],
  [$('#valve_5'),'message8'],
  [$('#valve_7'),'message10'],
]
for (let i = 0 ; i < message_1.length ; i++ ){
  function listen_value_2(param){

    socket.on(param[1].toString(),function(data){
      if(data == "true"){
        param[0].attr('src','assets/images/hmi/'+'valve_pumps_1'+'.png');
      } else {
        param[0].attr('src','assets/images/hmi/'+'valve_pumps_1'+'_off'+'.png');
      }
    })
  }
  listen_value_2(message_1[i])
}
for(let i = 0 ; i < mang_valve_1.length ; i++){
  onoff(mang_valve_1[i]);
  mang_valve_1[i][0].click(function(){
      name = "#" + $(this).attr('id').toString();
      $('#status_device').empty();
      $('#name_device').empty();
      $('#name_device_1').empty();
      if($(this).attr('src').toString().indexOf("_off") == -1){
        $('#status_device').append('ĐANG BẬT');
      } else {
        $('#status_device').append('ĐANG TẮT');
      }
      $('#name_device').append(mang_valve_1[i][1]);
      $('#name_device_1').append(mang_valve_1[i][2]);
      $('#nut_on').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'valve_pumps_1'+'.png');
      })
      $('#nut_off').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'valve_pumps_1'+'_off'+'.png');
      });
    })
}
//#endregion VALVE 3,5,7
//#region VALVE HOA CHAT
var mang_valve_2 = [
  [$('#valve_cuso4'),
  'valve_cuso4','BƠM CuSo4'],
  [$('#valve_clo'),
  'valve_clo','BƠM Clo'],
  [$('#valve_phen_nhom'),
  'valve_phen_nhom','BƠM PHÈN NHÔM'],
  [$('#valve_phen_sat'),
  'valve_phen_sat','BƠM PHÈN SẮT'],
  [$('#valve_flo'),
  'valve_flo','BƠM FLO'],
]
var message_3 = [
  [$('#valve_cuso4'),'message12'],
  [$('#valve_clo'),'message13'],
  [$('#valve_phen_nhom'),'message14'],
  [$('#valve_phen_sat'),'message15'],
  [$('#valve_flo'),'message16']
]
for(let i = 0 ; i < mang_valve_2.length ; i++){
  onoff(mang_valve_2[i]);
  mang_valve_2[i][0].click(function(){
      name = "#" + $(this).attr('id').toString();
      $('#status_device').empty();
      $('#name_device').empty();
      $('#name_device_1').empty();
      if($(this).attr('src').toString().indexOf("_off") == -1){
        $('#status_device').append('ĐANG BẬT');
      } else {
        $('#status_device').append('ĐANG TẮT');
      }
      $('#name_device').append(mang_valve_2[i][1]);
      $('#name_device_1').append(mang_valve_2[i][2]);
      $('#nut_on').click(function(){
            $(`${name}`).attr('src','assets/images/hmi/'+'valve_hoachat'+'.png');
      })
      $('#nut_off').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'valve_hoachat'+'_off'+'.png');
      });
    })
}
for (let i = 0 ; i < message_3.length ; i++ ){
  function listen_value_3(param){

    socket.on(param[1].toString(),function(data){
      if(data == "true"){
        param[0].attr('src','assets/images/hmi/'+'valve_hoachat'+'.png');
      } else {
        param[0].attr('src','assets/images/hmi/'+'valve_hoachat'+'_off'+'.png');
      }
    })
  }
  listen_value_3(message_3[i])
}
//#endregion VALE HOA CHAT
//#region VALVE XA THAI
var mang_valve_3 = [
  [$('#valve_xa_1'),
  'valve_xa_1','XẢ THẢI 1'],
  [$('#valve_xa_2'),
  'valve_xa_2','XẢ THẢI 2'],
  [$('#valve_xa_3'),
  'valve_xa_3','XẢ THẢI 3'],
]
var message_4 = [
  [$('#valve_xa_1'),'message17'],
  [$('#valve_xa_2'),'message18'],
  [$('#valve_xa_3'),'message19'],
]
for(let i = 0 ; i < mang_valve_3.length ; i++){
  onoff(mang_valve_3[i]);
  mang_valve_3[i][0].click(function(){
      name = "#" + $(this).attr('id').toString();
      $('#status_device').empty();
      $('#name_device').empty();
      $('#name_device_1').empty();
      if($(this).attr('src').toString().indexOf("_off") == -1){
        $('#status_device').append('ĐANG BẬT');
      } else {
        $('#status_device').append('ĐANG TẮT');
      }
      $('#name_device').append(mang_valve_3[i][1]);
      $('#name_device_1').append(mang_valve_3[i][2]);
      $('#nut_on').click(function(){
            $(`${name}`).attr('src','assets/images/hmi/'+'valve'+'.png');
      })
      $('#nut_off').click(function(){
          $(`${name}`).attr('src','assets/images/hmi/'+'valve'+'_off'+'.png');
      });
    })
}
for (let i = 0 ; i < message_4.length ; i++ ){
  function listen_value_4(param){
    socket.on(param[1].toString(),function(data){
      if(data == "true"){
        param[0].attr('src','assets/images/hmi/'+'valve'+'.png');
      } else {
        param[0].attr('src','assets/images/hmi/'+'valve'+'_off'+'.png');
      }
    })
  }
  listen_value_4(message_4[i])
}
//#endregion
//#region BANG DIEU KHIEN
$('#main_switch').click(function(){
  if($(this).attr('src') == 'assets/images/hmi/start.png'){
    $(this).attr('src','assets/images/hmi/stop'+'.png');
    socket.emit('main_switch',{
      value: false,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'main_switch' + "\""
    })
  } else {
    $(this).attr('src','assets/images/hmi/start'+'.png');
    socket.emit('main_switch',{
      value: true,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'main_switch' + "\""
    })
  }
})
$('#emergency').click(function(){
  if($(this).attr('src') == 'assets/images/hmi/emergency.png'){
    $(this).attr('src','assets/images/hmi/emergency_off'+'.png');
    socket.emit('emergency',{
      value: false,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'emergency' + "\""
    })
  } else {
    $(this).attr('src','assets/images/hmi/emergency'+'.png');
    socket.emit('emergency',{
      value: true,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'emergency' + "\""
    })
  }
})
$('#mode').click(function(){
  if($(this).attr('src') == 'assets/images/hmi/manu.png'){
    $(this).attr('src','assets/images/hmi/auto'+'.png');
    socket.emit('mode',{
      value: true,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'mode' + "\""
    })
  } else {
    $(this).attr('src','assets/images/hmi/manu'+'.png');
    socket.emit('mode',{
      value: false,
      nodeid: "ns=1;s=\"Boolean\"." + "\"" + 'mode' + "\""
    })
  }
})
socket.on('messsage1',function(data){
  if(data == "true"){
    $('#main_switch').attr('src','assets/images/hmi/'+'start'+'.png');
  } else {
    $('#main_switch').attr('src','assets/images/hmi/'+'stop'+'.png');
  }
})
socket.on('messsage2',function(data){
  if(data == "true"){
    $('#emergency').attr('src','assets/images/hmi/'+'emergency'+'.png');
  } else {
    $('#emergency').attr('src','assets/images/hmi/'+'emergency'+'_off'+'.png');
  }
})
socket.on('messsage3',function(data){
  if(data == "true"){
    $('#mode').attr('src','assets/images/hmi/'+'auto'+'.png');
  } else {
    $('#mode').attr('src','assets/images/hmi/'+'manu'+'.png');
  }
})
//#endregion BANG DIEU KHIEN
//#region JS HTML
   // Make the DIV element draggable:
   dragElement(document.getElementById("mydiv"));

   function dragElement(elmnt) {
     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
     if (document.getElementById(elmnt.id + "header")) {
       // if present, the header is where you move the DIV from:
       document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
     } else {
       // otherwise, move the DIV from anywhere inside the DIV:
       elmnt.onmousedown = dragMouseDown;
     }

     function dragMouseDown(e) {
       e = e || window.event;
       e.preventDefault();
       // get the mouse cursor position at startup:
       pos3 = e.clientX;
       pos4 = e.clientY;
       document.onmouseup = closeDragElement;
       // call a function whenever the cursor moves:
       document.onmousemove = elementDrag;
     }

     function elementDrag(e) {
       e = e || window.event;
       e.preventDefault();
       // calculate the new cursor position:
       pos1 = pos3 - e.clientX;
       pos2 = pos4 - e.clientY;
       pos3 = e.clientX;
       pos4 = e.clientY;
       // set the element's new position:
       elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
       elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
     }

     function closeDragElement() {
       // stop moving when mouse button is released:
       document.onmouseup = null;
       document.onmousemove = null;
     }
   }
   $('#show_bangthongso').click(function(){
     $('#mydiv').toggle(500)
   })
   $('.fa-window-close').click(function(){
     $('#mydiv').hide(500)
   })
   var counter = 0;
   var c = 0;
   var i = setInterval(function(){
       $(".loading-page .counter h1").html(c + "%");
       $(".loading-page .counter hr").css("width", c + "%");
       //$(".loading-page .counter").css("background", "linear-gradient(to right, #f60d54 "+ c + "%,#0d0d0d "+ c + "%)"); 
     /*
     $(".loading-page .counter h1.color").css("width", c + "%");
     */
     counter++;
     c++;

     if(counter == 101) {
         clearInterval(i);
         $('#thongbaotaomoi').css('display','none');
         $('.status').show(2000);
         $('#backg').show();
     }
   },10);
//#endregion JS HTML
//#region CB MUC
var mang_valve_4 = [
  [$('#sensor_1'),'message22'],
  [$('#sensor_2'),'message23'],
  [$('#sensor_3'),'message24'],
  [$('#sensor_4'),'message25'],
  [$('#sensor_5'),'message26'],
  [$('#sensor_6'),'message27'],
  [$('#sensor_7'),'message28']
]
function sensor(param){
  socket.on(param[1],function(data){
    if(data == "true"){
      param[0].attr('src','assets/images/hmi/'+'cb'+'.png');
    } else {
      param[0].attr('src','assets/images/hmi/'+'cb_off'+'.png');
    }
  })
}
for(let i = 0; i < mang_valve_4.length; i++){
  sensor(mang_valve_4[i])
}
//#endregion CB MUC
//#region SO LIEU HE THONG
for(let i = 0 ; i < mang_so_lieu.length ; i++ ){
    socket.on(mang_so_lieu[i][1],function(data){
      mang_so_lieu[i][0].empty();
      mang_so_lieu[i][0].append(`${data}`)
    })
}
//#endregion SO LIEU HE THONG
//#region test charts

})







