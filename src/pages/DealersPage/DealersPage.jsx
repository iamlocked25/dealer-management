import { useState } from 'react';
import { useDealer } from '../../contexts/DealerContext';
import DealerList from '../../components/Dealers/DealerList';
import Modal from '../../components/Common/Modal';
import DealerDetails from '../../components/Dealers/DealerDetails';
import DealerForm from '../../components/Dealers/DealerForm';
import { UserPlus } from 'lucide-react';
import './DealersPage.css';
import SuccessCard from '../../components/Common/SuccessCard';
import Loader from '../../components/Common/Loader';

const DealersPage = () => {
    const { dealers } = useDealer();
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleViewDealer = (dealer) => {
        setSelectedDealer(dealer);
        setViewModalOpen(true);
    };

    const handleEditDealer = (dealer) => {
        setSelectedDealer(dealer);
        setEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        setEditModalOpen(false);
        setSelectedDealer(null);
    };

    const handleAddSuccess = () => {
        setAddModalOpen(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('Dealer created successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }, 800); // simulate loading for 0.8s
    };

    const handleCloseModals = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
        setAddModalOpen(false);
        setSelectedDealer(null);
    };

    return (
        <div className="dealers-page">
            {loading && <Loader />}
            {successMessage && !loading && (
                <SuccessCard message={successMessage} />
            )}
            <div className="page-header">
                <div className="header-text">
                    <div>
                        <h1>Dealers Management</h1>
                        <p>Manage and monitor all your dealers in one place</p>
                    </div>
                    <button className="add-dealer-btn" onClick={() => setAddModalOpen(true)}>
                        <UserPlus size={20} />
                        Add New Dealer
                    </button>
                </div>
                <div className="stats-summary">
                    <div className="stat-card">
                        <span className="stat-value">{dealers.length}</span>
                        <span className="stat-label">Total Dealers</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">
                            {dealers.filter(d => d.status === 'active').length}
                        </span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">
                            {dealers.filter(d => d.status === 'inactive').length}
                        </span>
                        <span className="stat-label">Inactive</span>
                    </div>
                </div>
            </div>

            {!loading && (
                <DealerList
                    onViewDealer={handleViewDealer}
                    onEditDealer={handleEditDealer}
                    key={dealers.length} // force re-render on add
                />
            )}

            <Modal
                isOpen={viewModalOpen}
                onClose={handleCloseModals}
                title="Dealer Details"
                size="large"
            >
                {selectedDealer && <DealerDetails dealer={selectedDealer} />}
            </Modal>

            <Modal
                isOpen={editModalOpen}
                onClose={handleCloseModals}
                title="Edit Dealer"
                size="large"
            >
                {selectedDealer && (
                    <DealerForm
                        dealer={selectedDealer}
                        mode="edit"
                        onSuccess={handleEditSuccess}
                        onCancel={handleCloseModals}
                    />
                )}
            </Modal>

            <Modal
                isOpen={addModalOpen}
                onClose={handleCloseModals}
                title="Add New Dealer"
                size="large"
            >
                <DealerForm
                    mode="add"
                    onSuccess={handleAddSuccess}
                    onCancel={handleCloseModals}
                />
            </Modal>
        </div>
    );
};

export default DealersPage;
