/**
 * Creates an instance of EventEmitter.
 */
var EventEmitter = require("events").EventEmitter;

/**
 * Subclass an instance of EventEmitter.
 *
 * @constructor
 * @this {EventSubscriber}
 */
function EventSubscriber() {

    /** Call the super constructor. */
    EventEmitter.call(this);


    /** @private */ this.users = [];

    /** @private */  this.messages = {};

    this.emit('connect');
}


/** 
    *Extend the event emitter class so that we can use on() and emit() in 
    conjunction with Subscriber_unSubscriber mutations. 
 */
EventSubscriber.prototype = Object.create(EventEmitter.prototype);

/**
 * Callback called when user is subscribed.
 *
 */
var OnSucccessSubscriberJoin = function (stream, user) {

    console.log(user + " connected to stream");

}

/**
 * Callback called when user messages.
 *
 */
var OnSucccessMessagereceived = function  (msg, _userinfo) {

    /** @private */ var _keyPairs = this.messages[_userinfo.username];

    if (typeof _keyPairs == "undefined") {
        _keyPairs = [];
    }
    else {
        _keyPairs = _keyPairs.message;
    }

    _keyPairs.push(_userinfo.message);

    /** @private */  var message = {

        message: _keyPairs,

        username: _userinfo.username

    };

    this.messages[message.username] = message;

    console.log(_userinfo.username + " says " + _userinfo.message);
}

/**
 * Creates a new Prototype Subscribe on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @param {string} username The username of the user who wants to subscribe the channel.
 * @return {EventSubscriber} The new EventSubscriber object.
 */
EventSubscriber.prototype.Subscribe = function (username) {

    this.addListener("subscribe_" + username, OnSucccessSubscriberJoin)

    this.addListener("message_" + username, OnSucccessMessagereceived);

    this.emit("subscribe_" + username, OnSucccessSubscriberJoin, username);

    this.users[username] = username;

    return this;
}

/**
 * Creates new Prototype unSubscribe on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @param {string} username The desired username of the user who wants to unsubscribe the channel.
 * @return {EventSubscriber} The new EventSubscriber object.
 */
EventSubscriber.prototype.unSubscribe = function (username) {
 
    this.removeListener("subscribe_" + username, OnSucccessSubscriberJoin);

    this.removeListener("message_" + username, OnSucccessMessagereceived);

    this.emit('unsubscribe', username);

    delete this.users[username];

    delete this.messages[username];

    return this;
}

/**
 * Creates a new Prototype Message on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @param {string} username The desired username of the user who sends Messages.
 * @param {string} query The desired message of the user.
 * @return {EventSubscriber} The new EventSubscriber object.
 */
EventSubscriber.prototype.Message = function (username, query) {

    this.emit("message_" + username, OnSucccessMessagereceived, query);

    return this;

}

/**
 * Creates a new Prototype ShutDown on EventSubscriber.
 *
 * @this {EventSubscriber}
 */
EventSubscriber.prototype.ShutDown = function () {

    this.emit('shutdown',this);

    this.removeAllListeners();

    console.log('Channel Shutdown');

}

/**
 * Creates a new Prototype GetAllUsers on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @return {Object} The list of all Subscriber.
 */
EventSubscriber.prototype.GetAllUsers = function () {

 
    /** @private */ var _transport = {};

    for (var _key in this.users) {


        if (this.users.hasOwnProperty(_key)) {


            _transport[_key] = this.users[_key];

        }

    }


    return (_transport);
}

/**
 * Creates a new Prototype GetAllUsers on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @return {Integer} The total number of Subscriber.
 */
EventSubscriber.prototype.GetUserCount = function () {

    /** @private */ var _transport = {};

    for (var _key in this.users) {


        if (this.users.hasOwnProperty(_key)) {

            _transport[_key] = this.users[_key];

        }

    }


    return _transport.length;
}

/**
 * Creates a new Prototype SetMaxUsers on EventSubscriber.
 *
 * @param {number} number The desired number upto which user can subscribe.
 * @this {EventSubscriber}

 */
EventSubscriber.prototype.SetMaxUsers = function (number) {

    /** @private */ var _maxusers = parseInt(number);

    console.log(_maxusers)

    this.setMaxListeners(_maxusers);
}

/**
 * Creates a new Prototype GetAllMessages on EventSubscriber.
 *
 * @this {EventSubscriber}
 * @return {Object} The List of all Messages.
 */
EventSubscriber.prototype.GetAllMessages = function () {

    /** @private */ var _transport = {};

    for (var _key in this.messages) {


        if (this.messages.hasOwnProperty(_key)) {


            _transport[_key] = this.messages[_key];

        }

    }

    return (_transport);
}

/**
 * Creates a new Prototype GetAllMessages on EventSubscriber.
 *
 * @param {string} username The desired username of subscriber.
 * @this {EventSubscriber}
 * @return {Object} The List of Messages by there username.
 */
EventSubscriber.prototype.GetMessagesByUsername = function (username) {

    /** @private */var _transport = {};


    for (var _key in this.messages) {

        if (_key == username) {

            _transport[_key] = this.messages[_key].message;

        }

    }

    return (_transport);
}

/**
 * Creates a new Prototype GetAllEvents on EventSubscriber.
 *
 * @this {EventSubscriber}
 */
EventSubscriber.prototype.GetAllEvents = function () {

    /** @private */ var _this = this;


    for (var _key in this.users) {

        if (this.users.hasOwnProperty(_key)) {

            console.log(_this.listeners("subscribe_" + _key));

        }

    }


};



/**
 * Event Emitter .Called when user leaves streams(UnSubscribed).
 *
 */
EventSubscriber.prototype.on('unsubscribe', function (user) {

    console.log(user + " disconnected to stream");

});

/**
 * Event Emitter .Called Once when Stream Connects for the first time.
 *
 */
EventSubscriber.prototype.once('connect', function () {

    console.log("Stream Connected");

});

EventSubscriber.prototype.once('shutdown', function (_Channel) {
    _Channel = null;
});
/**
 * Exports EventSubscriber Object.
 *
 */
exports.EventSubscriber = EventSubscriber;
