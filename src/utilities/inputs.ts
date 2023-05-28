import { addElement } from "./common";

const inputsWithName = () => {
    try {
        const inputs = document.querySelectorAll('input, textarea');
        
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].hasAttribute('name') || (inputs[i].getAttribute('name') === null || inputs[i].getAttribute('name') === '')) {
                inputs[i].style.border = '5px solid red';
                addElement(inputs[i].tagName, `Expected ${inputs[i]} to have a name attribute but none found`, inputs[i].getBoundingClientRect());    
            }
        }
    } catch (err) {
        console.error({ err });
    }
}

export default inputsWithName;