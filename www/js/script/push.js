var push;
var app1 = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       push = PushNotification.init({
           android: {
              senderID: "346351995783"
            },
        });
       
        push.on('registration', function(data) {
           localStorage.setItem('reg_id',data.registrationId);
        });
      
        push.on('notification', function(data) {
            localStorage.setItem('test','test');
        });

        push.on('error', function(e) {
            // e.message
        });
       
    }
};
app1.initialize();
