function RedneckGameControllerController($deviceGyroscope, /*$websocket,*/ $interval) {
  var ctrl = this;
  console.log('Device gyroscope is: ', $deviceGyroscope);
  // console.log('Current is: ', $deviceGyroscope.getCurrent());
  // console.log('Watch is: ', $deviceGyroscope.watch());
  // console.log('Clear watch... ', $deviceGyroscope.clearWatch());

  ctrl.currentSomething = {nothing: "yet"};
  ctrl.websocketResponse = {nothing: "yet"};
  ctrl.collection = [];
  ctrl.datastream;
  ctrl.$onInit = function() {


    //Scan QR code to get room and server details
    //socket.io way
    ctrl.datastream = io('ws://192.168.0.9:3000');
    ctrl.datastream.on('chat message', function(msg){
      console.log("msg received: ", msg);
      ctrl.collection.push(msg);
    });

    // ngWebsocket way that doesn't work for shnitzel
    // ctrl.datastream = $websocket('ws://192.168.0.9/');

    // ctrl.datastream.onOpen(function(opened){
    //   console.log('websocket conn opened: ', opened);
    //   ctrl.datastream.send({lucy: "I'm home!"});
    // });
    //
    // ctrl.datastream.onClose(function(closed){
    //   console.log('websocket conn closed: ', closed);
    // });
    //
    // ctrl.datastream.onError(function(error){
    //   console.log('websocket errorrrrr: ', error);
    // });
    //
    // ctrl.datastream.onMessage(function(message){
    //   ctrl.collection.push(JSON.parse(message.data));
    // });

    document.addEventListener("deviceready", function () {

        // sensors.enableSensor("PROXIMITY");
        //
        // $interval(function(){
        //   sensors.getState(onSuccess);
        // }, 100);
        console.log('THE THING IS READY');

        //this DOES NOT WORK wtf
        // $deviceGyroscope.watch({frequency: 100}).then(function(gyroRead){
        //   console.log('WE WATCHIN')
        //   ctrl.currentSomething = gyroRead;
        // }).catch(function(error){
        //   console.log("something is fucked with the gyroscope (watch): ", error);
        // });

        $interval(function(){
          $deviceGyroscope.getCurrent().then(function(gyroRead){
            ctrl.currentSomething = gyroRead;
            // ctrl.datastream.send(gyroRead);
            ctrl.datastream.emit('chat message', gyroRead);
          }).catch(function(error){
            console.log("something is fucked with the gyroscope (getCurrent): ", error);
          });
        }, 100);

      }, false);

    console.log("ionic calls $onInit? yup they do");
    ctrl.currentSomething = {something: "now"};
  }
}

angular.module('starter')
.component('redneckGameControllerPad', {
  templateUrl: 'redneck-game-controller.component.html',
  controller: RedneckGameControllerController
});
