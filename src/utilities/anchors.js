
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
                    imgElement.style.border = '5px solid red';
                    addElement(`Expected ${imgElement} to have an alt attribute, none found`, imgElement);
                }
                else if (altAttribute !== '' && altAttribute !== anchorElement.textContent) {
                    isAltSupplementing = {
                        supplements: true,
                        imgElement
                    }
                }
            }
    
            if (!isAltSupplementing.supplements && isAltSupplementing.imgElement !== null) {
                isAltSupplementing.imgElement.style.border = '5px solid red';
                addElement(`Expected ${isAltSupplementing.imgElement} to have an alt attribute, none found`, isAltSupplementing.imgElement);
            }
        }
    } catch (error) {
        console.error({ error });
    }
}

if (typeof window !== 'undefined') {
  window.checkAnchorElements = checkAnchorElements;
}

