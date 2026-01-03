/**
 * Main Application Entry Script
 * 
 * Responsibilities:
 * - Global initializations
 * - Loading external libraries (Chart.js)
 */

console.log('Dayflow App Initialized');

// Load Chart.js from CDN dynamically
(function loadGlobalLibraries() {
    if (document.getElementById('chartjs-lib')) return;

    const script = document.createElement('script');
    script.id = 'chartjs-lib';
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    script.onload = () => {
        console.log('Chart.js Loaded');
    };
    script.onerror = () => {
        console.error('Failed to load Chart.js');
    };
    document.head.appendChild(script);
})();
