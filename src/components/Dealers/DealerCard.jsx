import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import './DealerCard.css';

const DealerCard = ({ dealer }) => {
    return (
        <div className="dealer-card">
            <div className="card-header">
                <div className="card-avatar">
                    {dealer.name.charAt(0).toUpperCase()}
                </div>
                <div className="card-title">
                    <h3>{dealer.name}</h3>
                    <span className="card-badge">
                        <CheckCircle size={14} />
                        Active Dealer
                    </span>
                </div>
            </div>

            <div className="card-body">
                <div className="card-info-item">
                    <Mail className="card-icon" />
                    <div>
                        <label>Email</label>
                        <p>{dealer.email}</p>
                    </div>
                </div>

                <div className="card-info-item">
                    <Phone className="card-icon" />
                    <div>
                        <label>Phone</label>
                        <p>{dealer.phone}</p>
                    </div>
                </div>

                <div className="card-info-item">
                    <MapPin className="card-icon" />
                    <div>
                        <label>Address</label>
                        <p>{dealer.address}</p>
                    </div>
                </div>

                <div className="card-info-item">
                    <Clock className="card-icon" />
                    <div>
                        <label>Operating Hours</label>
                        <p>{dealer.operatingHours}</p>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="success-indicator">
                    <CheckCircle size={20} />
                    <span>Dealer profile created successfully!</span>
                </div>
            </div>
        </div>
    );
};

export default DealerCard;
