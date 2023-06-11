const checkHeadingStructure = () => {
    try {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
        const rootLevel = Math.min(...headingLevels);
        
        for (let i = 0; i < headingLevels.length; i++) {
            const expectedLevel = rootLevel + i;
            if (headingLevels[i] !== expectedLevel) {
                headings[i].style.border = '5px solid red';
                addElement(`Expected h${expectedLevel} but got ${headings[i].tagName}`, headings[i]);
            }
        }
    } catch (err) {
        console.error({ err });
    }
}

if (typeof window !== 'undefined') {
    window.checkHeadingStructure = checkHeadingStructure;
}
