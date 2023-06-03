import { addElement } from "./common";

const imageCheck = () => {
    try {
        const imgs = document.querySelectorAll('img');

        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];

            if (!img.hasAttribute('alt') || (img.getAttribute('alt') === '') || img.getAttribute('alt') === null) {
                addElement(img, `Expected ${img} to have an alt tag`, img.getBoundingClientRect());
            }
        }
    } catch (err) {
        console.error({ err });
    }
};

export default imageCheck;