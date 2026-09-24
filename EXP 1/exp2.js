const EventEmitter = require('events');
class Button extends EventEmitter {}
const button = new Button();

button.on('click', () => {
    console.log('button clicked');
});
button.on('mouseover', () => {
    console.log("mouse is over the button");
});
button.emit('click');
button.emit('mouseover');