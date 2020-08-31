"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const requestPromise = require('request-promise');
const { response } = require('express');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


let user = [
    { fname: 'Musa', lname: 'Jibril', username: 'musjib999@gmail.com' },
    { fname: 'Mubarak', lname: 'Saeed', username: 'elmubarak333@gmail.com' }
];

server.get('/user', (req, res) => {
    res.status(200).json({ status: 'success', payload: user, message: 'All Users fetched Successfully!' });
});

server.get('*', (req, res) => {
    let object = {
        version: '1.0',
        Appname: 'lex Users microservice',
        author: 'Musa Jibril'
    }
    res.status(404).json({ status: 'failure', payload: object, message: 'Fail to fetch all Users!' });
});

server.listen(9000, () => {
    console.log('server listenung in port 9000');
    setInterval(sendRequest, 5000);
});

function sendRequest(){

    let options = {
        method: 'POST',
        uri: 'http://192.168.1.152:9000/announce',
        body: {
            clientId: 'Musa',
            service: 'user',
            port: 9000
        },
        json: true
    };
    requestPromise(options)
        .then((response) => {
            console.log('You got a response of >>>', response);
        }).catch((err) => {
            console.log(err);
        });
}