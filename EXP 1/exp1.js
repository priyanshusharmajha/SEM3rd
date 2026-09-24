'use strict';

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log(`hello, ${name}! welcome to node.js.`);
});

emitter.on('exit', () => {
    console.log('application closed');
});

emitter.emit('greet', 'priyanshu');
emitter.emit('exit');