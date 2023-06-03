import { addElement } from "./common";

const checkAnchorElements = () => {
    try {
        const objectElements = document.querySelectorAll('object');

        for (let i = 0; i < objectElements.length; i++) {
            const objectElement = objectElements[i];

            if (objectElement.textContent !== null) {
                const textContent = objectElement.textContent.trim();

                if (textContent === '') {
                    addElement(objectElement, `Expected ${objectElement} to have a text alternative`, objectElement.getBoundingClientRect());
                }
            }
        }
    } catch (error) {
        console.error({ error });
    }
}

export default checkAnchorElements;






