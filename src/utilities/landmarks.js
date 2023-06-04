const checkLandmarkRoles = () => {
    try {
        const landmarks = document.querySelectorAll('div[role=banner], div[role=complementary], div[role=contentinfo], div[role=form], div[role=navigation], div[role=region], div[role=search]');
        for (let i = 0; i < landmarks.length; i++) {
            if (!landmarks[i].hasAttribute('aria-label') || (landmarks[i].getAttribute('aria-label') === null || landmarks[i].getAttribute('aria-label') === '')) {
                addElement(landmarks[i].tagName, `Expected ${landmarks[i]} to have an aria-label to distinguish the landmarks, none found `, landmarks[i].getBoundingClientRect());    
            }
        }
    } catch (err) {
        console.error({ err });
    }
}

if (typeof window !== 'undefined') {
  window.checkLandmarkRoles = checkLandmarkRoles;
}
