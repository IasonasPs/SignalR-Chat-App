"use strict";

//const { signalR } = require("./signalr/dist/browser/signalr");
//import { signalR } from "./signalr/dist/browser/signalr";

var connection = new signalR.HubConnectionBuilder().withUrl("/Chat").build();
document.addEventListener("DOMContentLoaded", function () {

//Disable send button until connection is established
    document.getElementById("sendButton").disabled = true;

    document.getElementById("userInput").onload = function () {
        var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        li.textContent = `Lets start chatting`;
    };
    connection.on("ReceiveMessage", function (user, message) {
        var li = document.createElement("li");
        document.getElementById("messagesList").prepend(li);   //appendChild(li);

        // We can assign user-supplied strings to an element's textContent because it
        // is not interpreted as markup. If you're assigning in any other way, you
        // should be aware of possible script injection concerns.
        li.textContent = `${user} says ${message}`;
        localStorage.setItem(`${user}`,li.textContent);
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;

        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    document.getElementById("sendToSelf").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;

        connection.invoke("SendMessageToCaller", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });
});