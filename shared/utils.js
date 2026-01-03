/**
 * shared/utils.js
 * 
 * Common utility functions used across the application.
 */

/**
 * Returns a color code based on status string.
 * @param {string} status 
 * @returns {string} HEX color code
 */
export function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'present':
        case 'approved':
            return '#10B981'; // Success Green
        case 'absent':
        case 'rejected':
            return '#EF4444'; // Danger Red
        case 'leave':
        case 'pending':
            return '#F59E0B'; // Warning Orange
        default:
            return '#6B7280'; // Gray
    }
}

/**
 * Formats a date string to a readable format
 * @param {string} dateStr YYYY-MM-DD
 * @returns {string} e.g. "Oct 15, 2023"
 */
export function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Calculates daily productivity score based on target vs achieved.
 * Rules:
 * - Returns 0 if target is 0 or missing
 * - Formula: (achieved / target) * 100
 * - Rounded to nearest whole number
 * - Capped at 100
 * 
 * @param {number} target 
 * @param {number} achieved 
 * @returns {number} Productivity score (0-100)
 */
export function calculateDailyProductivity(target, achieved) {
    if (!target || target <= 0) {
        return 0;
    }

    const rawScore = (achieved / target) * 100;
    const roundedScore = Math.round(rawScore);

    // Cap at 100
    return Math.min(roundedScore, 100);
}

/**
 * Calculates productivity from a list of tasks.
 * Rules:
 * - If no tasks or empty list -> "N/A"
 * - Productivity = (completed / total) * 100
 * - Rounded to nearest integer
 * - Capped at 100
 * 
 * @param {Array<{completed: boolean}>} tasks Array of task objects
 * @returns {number|string} Score (0-100) or "N/A"
 */
export function calculateTaskBasedProductivity(tasks) {
    if (!tasks || tasks.length === 0) {
        return "N/A";
    }

    const total = tasks.length;
    // Assume task object has a boolean 'completed' property or check status
    const completedCount = tasks.filter(t => t.completed === true || t.status === 'completed' || t.isCompleted === true).length;

    let score = Math.round((completedCount / total) * 100);
    return Math.min(score, 100);
}
