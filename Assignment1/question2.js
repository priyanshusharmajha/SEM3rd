const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,
            stopPropagation() {
                this.stopped = true;
            }
        };

        let element = this;

        while (element) {
            event.currentTarget = element;
            element.emit(type, event);

            if (event.stopped) {
                break;
            }

            element = element.parent;
        }
    }
}

const document = new Element("document");
const form = new Element("form", document);
const button = new Element("button", form);

function buttonClick(event) {
    console.log(`Button: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

function formClick(event) {
    console.log(`Form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

function documentClick(event) {
    console.log(`Document: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

button.addEventListener("click", buttonClick);
form.addEventListener("click", formClick);
document.addEventListener("click", documentClick);

console.log("Scenario A:");
button.dispatchEvent("click");

console.log("\nScenario B:");

function stopForm(event) {
    event.stopPropagation();
}

form.removeEventListener("click", formClick);
form.addEventListener("click", (event) => {
    formClick(event);
    stopForm(event);
});

button.dispatchEvent("click");

console.log("\nScenario C:");

button.removeEventListener("click", buttonClick);
button.dispatchEvent("click");

console.log("\nKeypress:");

form.addEventListener("keypress", (event) => {
    console.log(`Form keypress: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
});

form.dispatchEvent("keypress", "Enter");