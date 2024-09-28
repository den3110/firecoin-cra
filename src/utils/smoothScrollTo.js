const smoothScrollTo = (elementId) => {
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
        return;
    }

    let startPos = window.pageYOffset;
    let endPos = targetElement.offsetTop;
    let distance = endPos - startPos;
    let duration = 500; // Duration in milliseconds
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let nextScroll = ease(timeElapsed, startPos, distance, duration);

        window.scrollTo(0, nextScroll);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
};

export default smoothScrollTo;