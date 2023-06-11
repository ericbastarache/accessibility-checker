const addElement = (body, element) => {
  try {
    const { top } = element.getBoundingClientRect();
    const elem = document.createElement('div');
    const text = document.createElement('span');
    const main = document.getElementsByTagName('body')[0];
    text.textContent = body;
    Object.assign(text.style, {
        display: 'inline-block',
        position: 'absolute',
        fontSize: '12px',
        top: `${top - 25}px`,
        left: `125px`,
        width: 'max-content',
        color: 'red'
    });
    text.className = 'error__span';
    
    main.appendChild(text);

  } catch (err) {
    console.error(err);
  }
};

if (typeof window !== 'undefined') {
  window.addElement = addElement;
}
