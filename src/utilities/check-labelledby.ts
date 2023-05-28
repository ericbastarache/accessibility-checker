import { addElement } from "./common";

const checkLabelledBy = () => {
    try {
        const elements = document.querySelectorAll('[aria-labelledby]');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.tagName !== 'IMG' && element.tagName !== 'AREA' && !(element.tagName === 'INPUT' && element.type === 'image')) {
                continue;
            }

            if (element.hasAttribute('aria-labelledby') && (element.getAttribute('aria-labelledby') !== '' || element.getAttribute('aria-labelledby') !== null)) {
                const labelledById = element.getAttribute('aria-labelledby');

                // Ignoring because typescript lint is complaining about labelledBy not being able to be string or null, and the condition above is already checking to make sure it's non null and not empty string
                // @ts-ignore
                const labelledByElement = document.getElementById(labelledById);
    
                if (!labelledByElement) {
                    addElement(element.tagName, `Expected ${element} to have an aria-labelledby attribute but none was found`, element.getBoundingClientRect());
                }
            }
        }
    } catch (err) {
        console.error({ err });
    }
};

export default checkLabelledBy;