const homeBtn = document.querySelector('#homeBtn');
const homeTooltip = document.querySelector('#homeTooltip');
const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');
const allBtn = document.querySelector('#allBtn');
const allTooltip = document.querySelector('#allTooltip');
const logBtn = document.querySelector('#logBtn');
const logTooltip = document.querySelector('#logTooltip');


const popperInstance = Popper.createPopper(button, tooltip, homeBtn, homeTooltip, allBtn, allTooltip, logBtn, logTooltip,  {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
});

function showHome() {
    // Make the tooltip visible
    homeTooltip.setAttribute('data-show', '');
    // Enable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));

    // Update its position
    popperInstance.update();
}
function show() {
    // Make the tooltip visible
    tooltip.setAttribute('data-show', '');
    // Enable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));

    // Update its position
    popperInstance.update();
}

function showAll() {
    // Make the tooltip visible
    allTooltip.setAttribute('data-show', '');
    // Enable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));

    // Update its position
    popperInstance.update();
}

function showLog() {
    // Make the tooltip visible
    logTooltip.setAttribute('data-show', '');
    // Enable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));

    // Update its position
    popperInstance.update();
}

function hideHome() {
    // Hide the tooltip
    homeTooltip.removeAttribute('data-show');
    // Disable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}

function hide() {
    // Hide the tooltip
    tooltip.removeAttribute('data-show')
    // Disable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}

function hideAll() {
    // Hide the tooltip
    allTooltip.removeAttribute('data-show');
    // Disable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

function hideLog() {
    // Hide the tooltip
    logTooltip.removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}

showEvents.forEach((event) => {
    homeBtn.addEventListener(event, showHome);
    button.addEventListener(event, show);
    allBtn.addEventListener(event, showAll);
    logBtn.addEventListener(event, showLog);
});


hideEvents.forEach((event) => {
    button.addEventListener(event, hide);
    homeBtn.addEventListener(event, hideHome);
    allBtn.addEventListener(event, hideAll);
    logBtn.addEventListener(event, hideLog);
});