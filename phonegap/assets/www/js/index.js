/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
    // // Application Constructor
    // initialize: function() {
        // this.bindEvents();
    // },
    // // Bind Event Listeners
    // //
    // // Bind any events that are required on startup. Common events are:
    // // 'load', 'deviceready', 'offline', and 'online'.
    // bindEvents: function() {
        // document.addEventListener('deviceready', this.onDeviceReady, false);
    // },
    // // deviceready Event Handler
    // //
    // // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // // function, we must explicity call 'app.receivedEvent(...);'
    // onDeviceReady: function() {
        // app.receivedEvent('deviceready');
    // },
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
// 
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');
// 
        // console.log('Received Event: ' + id);
    // }
// };
	
	var apipath = "";

// Store object refs for each UI panel.
// Arr idx matches html id of panel
var panel = Array();
 
var app = {
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
        panel['registration'] = new Registration();
        panel['home'] = new Home();

        panel['home'].Load();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
       // var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var prizedata = [{"restaurantId":"1","restaurantAlias":"mcd","restaurantColor":"ed947d","restaurantName":"Mc Donald's","restaurantUrl":"http:\/\/www.happymeal.com\/en_US\/index.html#\/Toys","restaurantDataUrl":"http:\/\/www.happymeal.com\/en_US\/config\/flash.xml","restaurantTimeStamp":"2013-06-02 04:41:50","prize":[{"prizeId":"571","prizeName":"Adventure Time","prizeImage":"","prizeGender":"M","prizeLink":"","prizeActive":"1","restaurantId":"1","prizeTimeStamp":"2014-01-04 07:12:09"},{"prizeId":"581","prizeName":"paul frank","prizeImage":"","prizeGender":"F","prizeLink":"","prizeActive":"1","restaurantId":"1","prizeTimeStamp":"2014-01-04 07:12:30"}]},{"restaurantId":"2","restaurantAlias":"bk","restaurantColor":"f6c68d","restaurantName":"Burger King","restaurantUrl":"http:\/\/www.bkcrown.com\/Toys\/Default.aspx","restaurantDataUrl":"http:\/\/www.bkcrown.com\/toys\/Default.aspx","restaurantTimeStamp":"2013-03-24 20:45:54","prize":[{"prizeId":"591","prizeName":"Pac-Man","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"2","prizeTimeStamp":"2014-01-04 07:13:02"}]},{"restaurantId":"3","restaurantAlias":"bell","restaurantColor":"87cec7","restaurantName":"Taco Bell","restaurantUrl":"http:\/\/www.tacobell.com\/food\/menu\/kids-meals","restaurantDataUrl":"http:\/\/www.tacobell.com\/food\/menu\/kids-meals\/","restaurantTimeStamp":"2013-03-25 17:49:33","prize":[]},{"restaurantId":"4","restaurantAlias":"snc","restaurantColor":"87a7d8","restaurantName":"Sonic Drive-In","restaurantUrl":"http:\/\/mywackypack.com\/promotions.aspx","restaurantDataUrl":"http:\/\/www.sonicdrivein.com\/kids\/wackyPackToys.jsp","restaurantTimeStamp":"2013-03-25 17:50:48","prize":[{"prizeId":"601","prizeName":"Kidz Bop","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"4","prizeTimeStamp":"2014-01-04 07:13:25"}]},{"restaurantId":"5","restaurantAlias":"sub","restaurantColor":"a7d69d","restaurantName":"Subway","restaurantUrl":"http:\/\/subwaykids.com","restaurantDataUrl":"http:\/\/subwaykids.com\/grownups\/promotions\/kidsmeals.aspx","restaurantTimeStamp":"2013-03-24 20:47:05","prize":[{"prizeId":"541","prizeName":"Frozen","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"5","prizeTimeStamp":"2013-12-01 05:24:17"}]},{"restaurantId":"6","restaurantAlias":"wnd","restaurantColor":"fff99d","restaurantName":"Wendy's","restaurantUrl":"http:\/\/www.wendys.com","restaurantDataUrl":"-","restaurantTimeStamp":"2013-06-02 04:41:43","prize":[{"prizeId":"611","prizeName":"Surprise Toy","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"6","prizeTimeStamp":"2014-01-13 03:29:42"}]},{"restaurantId":"11","restaurantAlias":"cfa","restaurantColor":"dddddd","restaurantName":"Chick-fil-A","restaurantUrl":"http:\/\/www.chick-fil-a.com\/Kids\/Meal","restaurantDataUrl":"","restaurantTimeStamp":"2013-03-30 02:28:30","prize":[{"prizeId":"471","prizeName":"Amazing Animals Books","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"11","prizeTimeStamp":"2013-11-01 21:17:13"}]}];
