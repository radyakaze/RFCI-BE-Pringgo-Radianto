const axios = require('axios');
const dayjs = require('dayjs');

// Url server
const server = 'http://localhost:3000';

function sendRequest(counter) {
    const random = Math.random().toString(36).substring(5);
    const data = { counter };
    const headers = {
        'X-RANDOM': random
    }

    const date = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
    console.log('[%s] Send Request => Body: %s, Headers: %s', date, JSON.stringify(data), JSON.stringify(headers));
    axios.post(server, data, { headers })
    .then((response) => {
        console.log('Response', response.status, ':', response.data);
    })
    .catch(error => {
        console.error('Error Response', error.response.status, ':', error.response.data);
    })
}

// counter
let counter = 0;

function send() {
    counter++;
    sendRequest(counter);


    setTimeout(send, 60000); // setiap 1 menit lakukan request ulang
}

send();