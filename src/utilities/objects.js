const checkObjects = () => {
    try {
        const objectElements = document.querySelectorAll('object');

        for (let i = 0; i < objectElements.length; i++) {
            const objectElement = objectElements[i];

            if (objectElement.textContent !== null) {
                const textContent = objectElement.textContent.trim();

                if (textContent === '') {
                    addElement(`Expected ${objectElement} to have a text alternative`, objectElement);
                }
            }
        }
    } catch (error) {
        console.error({ error });
    }
}

if (typeof window !== 'undefined') {
  window.checkObjects = checkObjects;
}
