const inputsWithName = () => {
    try {
        const inputs = document.querySelectorAll('input, textarea');
        
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            
            if (!input.hasAttribute('name') || (input.getAttribute('name') === null || input.getAttribute('name') === '')) {
                input.style.border = '5px solid red';
                addElement(`Expected ${inputs[i]} to have a name attribute but none found`, input);
            }
        }
    } catch (err) {
        console.error({ err });
    }
}

if (typeof window !== 'undefined') {
  window.inputsWithName = inputsWithName;
}
