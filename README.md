<b>EventSubscriber</b>
===============

Event Subscriber based on Node JS Event Emitter.

<h2>How to use </h2>

<b>Step 1 : include Event Subscriber</b>
````python
var EventSubscriber = require("./EventSubscriber").EventSubscriber;
````
<b>Step 2 : Create Channel Using Event Subscriber</b>
````python
var channel = new EventSubscriber();
````
<b>Step 3:  Start Coding</b>

<i>To Subscribe </i>
````python
channel.Subscribe("Mahendra");
````


<i>To UnSubscribe</i>
````python
channel.unSubscribe("Mahendra");
````


<i>To Message</i>
````python
var message = { "username": "Mahendra", "message": "Hello hi" };

channel.Message("Mahendra", message);
````

To Close the Channel
````python
channel.ShutDown();
````

<h3>you can even use it with express by having get and post.</h3>

    var express = require("express");
    var channel = new EventSubscriber();
    var app = express();

<b>you should format you request like http://localhost:8888/subscribe?username="Mahendra"</b>

````python
app.get("/subscribe", function (req, res) {

    if (channel == null) {
        console.log("Sorry channel does not exsist.You need to start channel inorder to perfrom operation");
    }
    else {
        channel.Subscribe(req.query.username);
    }

});
 ````
 
<b>http://localhost:8888/unsubscribe?username="Mahendra"</b>

````python
app.get("/unsubscribe", function (req, res) {

    if (channel == null) {
        console.log("sorry channel does not exsist.you need to start channel inorder to perfrom operation");
    }
    else {
        channel.unsubscribe(req.query.username);

    }
    
});
````
<b>you can have some utility functions like</b>

````python
channel.GetAllUsers();

channel.GetAllMessages();

channel.SetMaxUsers(number);

channel.GetMessagesByUsername(yourusername);
````

Youtube Link
http://www.youtube.com/watch?v=HHoCSVvC_JY&feature=youtu.be
