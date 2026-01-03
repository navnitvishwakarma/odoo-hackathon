/**
 * shared/sidebar.js
 * 
 * Renders the sidebar navigation dynamically based on user role.
 */

export function renderSidebar(containerId, activePage, role = 'admin') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Sidebar container not found: ${containerId}`);
        return;
    }

    // Role-based Navigation Configuration
    const menuItems = getMenuForRole(role);

    // Build Navigation HTML
    const navLinksHtml = menuItems.map(item => {
        const isActive = item.id === activePage ? 'active' : '';
        // If it's a spacer/bottom item (like logout), we might handle it differently, 
        // but for now we just render them all.
        // Special case for Logout if we want it at the bottom, but here we treat it as a list item.
        return `
            <a href="${item.href}" class="nav-link ${isActive}">
                <span>${item.icon}</span>
                ${item.label}
            </a>
        `;
    }).join('');

    container.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                     Worklify
                </div>
            </div>
            <nav class="sidebar-nav">
                ${navLinksHtml}
                
                <!-- Logout Separated -->
                <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-light);">
                    <a href="/index.html" class="nav-link" style="color: var(--status-danger);">
                        <span>🚪</span> Log Out
                    </a>
                </div>
            </nav>
        </aside>
    `;
}

function getMenuForRole(role) {
    // Icons are simple emojis for now as per "vanilla JS/HTML" requirement without external icon libraries
    // In a real app, I'd use SVG icons.

    if (role === 'admin') {
        return [
            { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard.html', icon: '📊' },
            { id: 'employees', label: 'Employees', href: '/admin/employees.html', icon: '👥' },
            { id: 'attendance', label: 'Attendance', href: '/admin/attendance.html', icon: '📅' },
            { id: 'timeoff', label: 'Time Off', href: '/admin/timeoff.html', icon: '✈️' },
            { id: 'payroll', label: 'Payroll', href: '/admin/payroll.html', icon: '💰' }
        ];
    }

    // Employee
    return [
        { id: 'dashboard', label: 'Dashboard', href: '/employee/dashboard.html', icon: '🏠' },
        { id: 'attendance', label: 'Attendance', href: '/employee/attendance.html', icon: '📅' },
        { id: 'timeoff', label: 'Time Off', href: '/employee/timeoff.html', icon: '✈️' },
        { id: 'payroll', label: 'Payroll', href: '/employee/payroll.html', icon: '💰' }
    ];
}
