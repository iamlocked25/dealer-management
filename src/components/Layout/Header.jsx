import { Bell, User } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h2 className="header-title">DMS</h2>
            </div>

            <div className="header-right">
                <button className="icon-button">
                    <Bell size={20} />
                    {/* <span className="notification-badge">3</span> */}
                </button>

                <div className="user-menu">
                    <div className="user-avatar">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <span className="user-name">Admin User</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
