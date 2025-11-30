import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Car
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/dealers', icon: Users, label: 'Dealers' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container">
                    <Car size={32} className="logo-icon" />
                    <div className="logo-text">
                        <h1>Dealer</h1>
                        <span>Management</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
};

export default Sidebar;
