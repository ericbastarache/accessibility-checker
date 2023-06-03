export const addElement = (tagName: any, body: string, position: DOMRect) => {
    try {
        const elem = document.createElement('div');
        const hr = document.createElement('hr');
        const text = document.createElement('span');
        const main = document.getElementsByTagName('main')[0];
        elem.textContent = tagName;
        text.textContent = body;
        
        Object.assign(elem.style, {
            top: `${position.top}px`,
            left: `${position.width + position.left}px`,
            textAlign: 'center',
        });
        elem.className = 'error__div';
        main.appendChild(elem);
        const divPosition = elem.getBoundingClientRect();
        Object.assign(hr.style, {
            position: 'absolute',
            top: `${divPosition.top}px`,
            left: `${divPosition.left + 50}px`,
            width: 100,
            border: '1px solid red'
        });
        main.appendChild(hr);
        Object.assign(text.style, {
            display: 'inline-block',
            position: 'absolute',
            fontSize: '12px',
            top: `${divPosition.top}px`,
            left: `${divPosition.left + 154}px`,
            width: 'max-content',
            color: 'red'
        });
        text.className = 'error__span';
        
        main.appendChild(text);
    } catch (err) {
        console.error(err);
    }
}