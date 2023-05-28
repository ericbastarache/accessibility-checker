import { addElement } from './common';

const styles = {
    border: '5px solid red',
    padding: '12px'
}

const sizeOfText = () => {
    const elements = document.querySelectorAll('div, p, span');
    for (let i = 0; i < elements.length; i++) {
        const EXPECTED_MIN_FONT_SIZE = '12px';
        if (window.getComputedStyle(elements[i]).getPropertyValue('font-size') < EXPECTED_MIN_FONT_SIZE) {
            Object.assign(elements[i].style, styles);
            addElement(elements[i].tagName, `Expected font size for ${elements[i].tagName} was ${EXPECTED_MIN_FONT_SIZE}, but got ${elements[i].style.fontSize}`, elements[i].getBoundingClientRect());
        }
    }
};

export default sizeOfText;