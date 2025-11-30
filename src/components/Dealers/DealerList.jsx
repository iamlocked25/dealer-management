import { useState, useMemo } from 'react';
import ConfirmDialog from '../Common/ConfirmDialog';
import { useDealer } from '../../contexts/DealerContext';
import {
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import './DealerList.css';

const DealerList = ({ onViewDealer, onEditDealer }) => {
    const { dealers, deleteDealer } = useDealer();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const perPageOptions = [5, 10, 50, 100];
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filtering and sorting logic
    const filteredAndSortedDealers = useMemo(() => {
        let result = [...dealers];

        // Search filter
        if (searchTerm) {
            result = result.filter(dealer =>
                dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dealer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dealer.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (filterStatus !== 'all') {
            result = result.filter(dealer => dealer.status === filterStatus);
        }

        // Sorting
        result.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return result;
    }, [dealers, searchTerm, filterStatus, sortBy, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredAndSortedDealers.length / itemsPerPage);
    const paginatedDealers = filteredAndSortedDealers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Smart pagination for large lists
    const getPageNumbers = () => {
        const maxPagesToShow = 7;
        if (totalPages <= maxPagesToShow) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);
        if (currentPage <= 3) {
            end = 5;
        } else if (currentPage >= totalPages - 2) {
            start = totalPages - 4;
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (start > 2) pages.unshift('...');
        if (start > 1) pages.unshift(1);
        if (end < totalPages - 1) pages.push('...');
        if (end < totalPages) pages.push(totalPages);
        return pages;
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [dealerToDelete, setDealerToDelete] = useState(null);

    const handleDeleteClick = (dealer) => {
        setDealerToDelete(dealer);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (dealerToDelete) {
            deleteDealer(dealerToDelete.id);
        }
        setConfirmOpen(false);
        setDealerToDelete(null);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDealerToDelete(null);
    };

    const SortIcon = ({ field }) => {
        if (sortBy !== field) return null;
        return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    return (
        <div className="dealer-list-container">
            <div className="list-header">
                <h2>All Dealers</h2>
                <div className="list-controls">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search dealers..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="filter-box">
                        <Filter size={18} />
                        <select
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="dealer-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')} className="sortable">
                                <span className="th-content">Dealer Name <SortIcon field="name" /></span>
                            </th>
                            <th onClick={() => handleSort('email')} className="sortable">
                                <span className="th-content">Email <SortIcon field="email" /></span>
                            </th>
                            <th onClick={() => handleSort('phone')} className="sortable">
                                <span className="th-content">Phone <SortIcon field="phone" /></span>
                            </th>
                            <th onClick={() => handleSort('status')} className="sortable">
                                <span className="th-content">Status <SortIcon field="status" /></span>
                            </th>
                            <th onClick={() => handleSort('createdAt')} className="sortable">
                                <span className="th-content">Created <SortIcon field="createdAt" /></span>
                            </th>
                            <th><span className="th-content">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDealers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No dealers found
                                </td>
                            </tr>
                        ) : (
                            paginatedDealers.map((dealer) => (
                                <tr key={dealer.id}>
                                    <td className="dealer-name">{dealer.name}</td>
                                    <td>{dealer.email}</td>
                                    <td>{dealer.phone}</td>
                                    <td>
                                        <span className={`status-badge ${dealer.status}`}>
                                            {dealer.status}
                                        </span>
                                    </td>
                                    <td>{new Date(dealer.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn view"
                                                onClick={() => onViewDealer(dealer)}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="action-btn edit"
                                                onClick={() => onEditDealer(dealer)}
                                                title="Edit Dealer"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => handleDeleteClick(dealer)}
                                                title="Delete Dealer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={18} />
                        Previous
                    </button>

                    <div className="page-numbers">
                        {getPageNumbers().map((page, idx) =>
                            page === '...'
                                ? <span key={idx} className="page-ellipsis">...</span>
                                : <button
                                    key={page}
                                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                        )}
                    </div>

                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            <div className="list-footer">
                <div className="footer-flex">
                    <div className="per-page-box">
                        <label htmlFor="perPageSelect">Show </label>
                        <select
                            id="perPageSelect"
                            value={itemsPerPage}
                            onChange={e => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            {perPageOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <span> entries</span>
                    </div>
                    <p>
                        Showing {paginatedDealers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredAndSortedDealers.length)} of{' '}
                        {filteredAndSortedDealers.length} dealers
                    </p>
                </div>
            </div>
            <ConfirmDialog
                open={confirmOpen}
                title="Delete Dealer?"
                message={dealerToDelete ? `Are you sure you want to delete dealer "${dealerToDelete.name}"? This action cannot be undone.` : ''}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default DealerList;
