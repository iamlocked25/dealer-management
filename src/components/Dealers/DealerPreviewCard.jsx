import './DealerPreviewCard.css';
import { User, Mail, Phone, MapPin, Clock } from 'lucide-react';

const DealerPreviewCard = ({ dealer }) => {
    if (!dealer) return null;
    return (
        <div className="dealer-preview-card">
            <div className="dealer-preview-header">
                <User size={32} />
                <h2>{dealer.name}</h2>
                <span className={`status-badge ${dealer.status || 'active'}`}>{dealer.status || 'active'}</span>
            </div>
            <div className="dealer-preview-details">
                <div><Mail size={18} /> <span>{dealer.email}</span></div>
                <div><Phone size={18} /> <span>+91 {dealer.phone}</span></div>
                <div><MapPin size={18} /> <span>{dealer.address}</span></div>
                <div><Clock size={18} /> <span>{dealer.operatingHours}</span></div>
            </div>
        </div>
    );
};

export default DealerPreviewCard;
