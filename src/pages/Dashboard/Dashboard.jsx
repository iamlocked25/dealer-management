import { useState } from 'react';
import { useDealer } from '../../contexts/DealerContext';
import DealerList from '../../components/Dealers/DealerList';
import Modal from '../../components/Common/Modal';
import DealerDetails from '../../components/Dealers/DealerDetails';
import DealerForm from '../../components/Dealers/DealerForm';
import {
    TrendingUp,
    Users,
    DollarSign,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { dealers } = useDealer();
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState(null);

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

    const handleCloseModals = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
        setSelectedDealer(null);
    };

    const stats = [
        {
            label: 'Total Dealers',
            value: dealers.length,
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: '#3b82f6'
        },
        {
            label: 'Active Dealers',
            value: dealers.filter(d => d.status === 'active').length,
            change: '+8%',
            trend: 'up',
            icon: Activity,
            color: '#10b981'
        },
        {
            label: 'Revenue',
            value: '$1245',
            change: '+15%',
            trend: 'up',
            icon: DollarSign,
            color: '#f59e0b'
        },
        {
            label: 'Growth',
            value: '23%',
            change: '-2%',
            trend: 'down',
            icon: TrendingUp,
            color: '#8b5cf6'
        }
    ];



    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening with your dealers today.</p>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-box">
                        <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">{stat.label}</span>
                            <div className="stat-value-row">
                                <span className="stat-value">{stat.value}</span>
                                <span className={`stat-change ${stat.trend}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            <div className="dashboard-dealers-section">
                <DealerList
                    onViewDealer={handleViewDealer}
                    onEditDealer={handleEditDealer}
                />
            </div>

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
        </div>
    );
};

export default Dashboard;
