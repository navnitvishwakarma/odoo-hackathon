/**
 * shared/header.js
 * 
 * Renders the top navigation header with user profile and dropdown.
 */

export function renderHeader(containerId, userName, userInitials) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Header container not found: ${containerId}`);
        return;
    }

    container.innerHTML = `
        <header class="top-header">
            <!-- Branding (Visible if sidebar is collapsed or on mobile, but here permanently as requested) -->
            <div style="margin-right: auto; font-weight: 700; font-size: 1.25rem; color: var(--text-primary);">
                Worklify
            </div>

            <div class="user-menu" style="position: relative;">
                <span style="font-weight: 500; font-size: 0.9rem;">${userName}</span>
                <div class="user-avatar" id="avatar-trigger" style="cursor: pointer;">${userInitials}</div>
                
                <!-- Dropdown Menu -->
                <div id="user-dropdown" class="dropdown-menu">
                    <a href="/employee/profile.html" class="dropdown-item">My Profile</a>
                    <div style="height: 1px; background: var(--border-light); margin: 4px 0;"></div>
                    <a href="/index.html" class="dropdown-item text-danger">Logout</a>
                </div>
            </div>
        </header>
    `;

    // Dropdown Logic
    const trigger = container.querySelector('#avatar-trigger');
    const dropdown = container.querySelector('#user-dropdown');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== trigger) {
            dropdown.classList.remove('show');
        }
    });
}
