//this file contains the functions that send the phone number of the customer to the NEXmo api for sending SMS
const numberInput = document.getElementById('number'),
    textInput =document.getElementById('msg'),
    button =document.getElementById('btn'),
    response =document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data){
    response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
});

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/sms', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify({number: number, text: text})
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });


}