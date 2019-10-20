const net = require('net');

let radians = 0
let radian_step = Math.PI / 100

/* 
 * TCP CLIENT SIMULATORS
 */
let noise_generator = () => Math.random() * 0.2;
let wave_generator = () => {
    let value = Math.sin(radians) + noise_generator()
    radians += radian_step
    return value;
}

var data_client = new net.Socket();
data_client.connect(12345, '127.0.0.1', function() {
	console.log('Connected');
	setInterval(()=>{
        data_client.write(String(wave_generator()))
    }, 10)
});

var tick_client = new net.Socket();
tick_client.connect(12346, '127.0.0.1', function() {
	console.log('Connected');
	setInterval(()=>{
        tick_client.write("tick tock")
    }, 1000)
});

