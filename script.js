// Set the target date here (YYYY, MM-1, DD, HH, MM, SS)
// Note: Month is 0-indexed (0 = January, 11 = December)
// const targetDate = new Date(2025, 4, 1, 12, 00, 00);
const targetDate = new Date(2250, 4, 1, 12, 00, 00);

// DOM elements
const weeksEl = document.getElementById('weeks');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Previous values to track changes
let prevWeeks = -1;
let prevDays = -1;
let prevHours = -1;
let prevMinutes = -1;
let prevSeconds = -1;

// Function to calculate time remaining
function getTimeRemaining() {
    const total = targetDate - new Date();
    
    // If countdown is over
    if (total <= 0) {
        return {
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
        };
    }
    
    // Calculate all time units
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor((total / (1000 * 60 * 60 * 24)) % 7);
    const weeks = Math.floor(total / (1000 * 60 * 60 * 24 * 7));
    
    return {
        weeks,
        days,
        hours,
        minutes,
        seconds,
        total
    };
}

// Function to update the display
function updateDisplay(element, newValue) {
    // Format the number to always have 2 digits
    const formattedValue = newValue.toString().padStart(2, '0');
    
    // If the value hasn't changed, don't update
    if (element.textContent === formattedValue) {
        return;
    }
    
    // Add a subtle background change when the value changes
    element.classList.add('changed');
    
    // Set the new value
    element.textContent = formattedValue;
    
    // Remove the changed class after animation completes
    setTimeout(() => {
        element.classList.remove('changed');
    }, 300);
}

// Function to update the countdown
function updateCountdown() {
    const t = getTimeRemaining();
    
    // Only update elements when their values change
    if (t.weeks !== prevWeeks) {
        updateDisplay(weeksEl, t.weeks);
        prevWeeks = t.weeks;
    }
    
    if (t.days !== prevDays) {
        updateDisplay(daysEl, t.days);
        prevDays = t.days;
    }
    
    if (t.hours !== prevHours) {
        updateDisplay(hoursEl, t.hours);
        prevHours = t.hours;
    }
    
    if (t.minutes !== prevMinutes) {
        updateDisplay(minutesEl, t.minutes);
        prevMinutes = t.minutes;
    }
    
    if (t.seconds !== prevSeconds) {
        updateDisplay(secondsEl, t.seconds);
        prevSeconds = t.seconds;
    }
    
    // If countdown is over
    if (t.total <= 0) {
        clearInterval(timeInterval);
    }
}

// Initialize the countdown
function initCountdown() {
    // Set initial values
    const t = getTimeRemaining();
    
    // Format and set initial values
    weeksEl.textContent = t.weeks.toString().padStart(2, '0');
    daysEl.textContent = t.days.toString().padStart(2, '0');
    hoursEl.textContent = t.hours.toString().padStart(2, '0');
    minutesEl.textContent = t.minutes.toString().padStart(2, '0');
    secondsEl.textContent = t.seconds.toString().padStart(2, '0');
    
    // Set previous values
    prevWeeks = t.weeks;
    prevDays = t.days;
    prevHours = t.hours;
    prevMinutes = t.minutes;
    prevSeconds = t.seconds;
    
    // Start the countdown
    updateCountdown();
    timeInterval = setInterval(updateCountdown, 1000);
}

// Start the countdown when the page loads
window.addEventListener('load', initCountdown);
