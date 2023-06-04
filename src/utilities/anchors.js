
const checkAnchorElements = () => {
    try {
        const anchorElements = document.querySelectorAll('a');
        for (let i = 0; i < anchorElements.length; i++) {
            const anchorElement = anchorElements[i];
    
            const imgElements = anchorElement.querySelectorAll('img');
    
            let isAltSupplementing = { supplements: false, imgElement: null };
    
            for (let j = 0; j < imgElements.length; j++) {
                const imgElement = imgElements[j];
    
                const altAttribute = imgElement.getAttribute('alt');
    
                if (altAttribute === null) {
                    addElement(imgElement, `Expected ${imgElement} to have an alt attribute, none found`, imgElement.getBoundingClientRect());
                }
                else if (altAttribute !== '' && altAttribute !== anchorElement.textContent) {
                    isAltSupplementing = {
                        supplements: true,
                        imgElement
                    }
                }
            }
    
            if (!isAltSupplementing.supplements && isAltSupplementing.imgElement !== null) {
                addElement(isAltSupplementing.imgElement, `Expected ${isAltSupplementing.imgElement} to have an alt attribute, none found`, isAltSupplementing.imgElement.getBoundingClientRect());
            }
        }
    } catch (error) {
        console.error({ error });
    }
}

if (typeof window !== 'undefined') {
  window.checkAnchorElements = checkAnchorElements;
}





