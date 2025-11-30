import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DealerForm from '../../components/Dealers/DealerForm';
import DealerCard from '../../components/Dealers/DealerCard';
import { ArrowLeft } from 'lucide-react';
import './AddDealerPage.css';

const AddDealerPage = () => {
    const navigate = useNavigate();
    const [submittedDealer, setSubmittedDealer] = useState(null);

    const handleSuccess = (dealer) => {
        setSubmittedDealer(dealer);
    };

    const handleAddAnother = () => {
        setSubmittedDealer(null);
    };

    const handleViewAll = () => {
        navigate('/dealers');
    };

    return (
        <div className="add-dealer-page">
            <div className="page-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    Back
                </button>

                {!submittedDealer ? (
                    <div className="form-section">
                        <div className="section-header">
                            <h1>Add New Dealer</h1>
                            <p>Fill in the details below to add a new dealer to the system</p>
                        </div>
                        <div className="form-card">
                            <DealerForm onSuccess={handleSuccess} />
                        </div>
                    </div>
                ) : (
                    <div className="success-section">
                        <div className="section-header">
                            <h1>Dealer Added Successfully!</h1>
                            <p>Here's a preview of the dealer profile you just created</p>
                        </div>
                        <DealerCard dealer={submittedDealer} />
                        <div className="success-actions">
                            <button className="btn btn-secondary" onClick={handleAddAnother}>
                                Add Another Dealer
                            </button>
                            <button className="btn btn-primary" onClick={handleViewAll}>
                                View All Dealers
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddDealerPage;
