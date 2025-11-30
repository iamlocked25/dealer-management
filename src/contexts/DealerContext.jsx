import { createContext, useContext, useState, useEffect } from 'react';

const DealerContext = createContext();

export const useDealer = () => {
    const context = useContext(DealerContext);
    if (!context) {
        throw new Error('useDealer must be used within a DealerProvider');
    }
    return context;
};

export const DealerProvider = ({ children }) => {
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // No initial sample data
    useEffect(() => {
        setDealers([]);
    }, []);

    const addDealer = (dealerData) => {
        try {
            setLoading(true);
            const newDealer = {
                ...dealerData,
                id: Date.now(),
                status: 'active',
                createdAt: new Date().toISOString()
            };
            setDealers(prev => [newDealer, ...prev]);
            setError(null);
            return { success: true, dealer: newDealer };
        } catch (err) {
            setError('Failed to add dealer');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateDealer = (id, dealerData) => {
        try {
            setLoading(true);
            setDealers(prev =>
                prev.map(dealer =>
                    dealer.id === id ? { ...dealer, ...dealerData } : dealer
                )
            );
            setError(null);
            return { success: true };
        } catch (err) {
            setError('Failed to update dealer');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteDealer = (id) => {
        try {
            setLoading(true);
            setDealers(prev => prev.filter(dealer => dealer.id !== id));
            setError(null);
            return { success: true };
        } catch (err) {
            setError('Failed to delete dealer');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const getDealerById = (id) => {
        return dealers.find(dealer => dealer.id === id);
    };

    const value = {
        dealers,
        loading,
        error,
        addDealer,
        updateDealer,
        deleteDealer,
        getDealerById
    };

    return (
        <DealerContext.Provider value={value}>
            {children}
        </DealerContext.Provider>
    );
};
