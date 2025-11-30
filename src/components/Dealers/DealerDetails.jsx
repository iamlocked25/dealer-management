import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import './DealerDetails.css';

const DealerDetails = ({ dealer }) => {
    return (
        <div className="dealer-details">
            <div className="detail-header">
                <div className="dealer-avatar">
                    {dealer.name.charAt(0).toUpperCase()}
                </div>
                <div className="dealer-info">
                    <h3>{dealer.name}</h3>
                    <span className={`status-indicator ${dealer.status}`}>
                        {dealer.status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        {dealer.status}
                    </span>
                </div>
            </div>

            <div className="detail-section">
                <h4>Contact Information</h4>
                <div className="info-grid">
                    <div className="info-item">
                        <Mail className="info-icon" />
                        <div>
                            <label>Email</label>
                            <p>{dealer.email}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Phone className="info-icon" />
                        <div>
                            <label>Phone</label>
                            <p>{dealer.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <h4>Location</h4>
                <div className="info-item">
                    <MapPin className="info-icon" />
                    <div>
                        <label>Address</label>
                        <p>{dealer.address}</p>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <h4>Business Hours</h4>
                <div className="info-item">
                    <Clock className="info-icon" />
                    <div>
                        <label>Operating Hours</label>
                        <p>{dealer.operatingHours}</p>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <h4>Additional Information</h4>
                <div className="info-item">
                    <Calendar className="info-icon" />
                    <div>
                        <label>Created On</label>
                        <p>{new Date(dealer.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerDetails;
