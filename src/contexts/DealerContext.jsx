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

    // Initialize with sample data
    useEffect(() => {
        const sampleDealers = [
            {
                id: 1,
                name: 'Premium Auto Sales',
                address: '123 Main Street, New York, NY 10001',
                email: 'contact@premiumauto.com',
                phone: '+1 (555) 123-4567',
                operatingHours: '9:00 AM - 6:00 PM',
                status: 'active',
                createdAt: new Date('2024-01-15').toISOString()
            },
            {
                id: 2,
                name: 'City Motors Group',
                address: '456 Oak Avenue, Los Angeles, CA 90001',
                email: 'info@citymotors.com',
                phone: '+1 (555) 234-5678',
                operatingHours: '8:00 AM - 7:00 PM',
                status: 'active',
                createdAt: new Date('2024-02-20').toISOString()
            },
            {
                id: 3,
                name: 'Elite Vehicle Trading',
                address: '789 Pine Road, Chicago, IL 60601',
                email: 'sales@elitevehicle.com',
                phone: '+1 (555) 345-6789',
                operatingHours: '9:00 AM - 5:00 PM',
                status: 'active',
                createdAt: new Date('2024-03-10').toISOString()
            },
            {
                id: 4,
                name: 'Metro Auto Hub',
                address: '321 Elm Street, Houston, TX 77001',
                email: 'contact@metroautohub.com',
                phone: '+1 (555) 456-7890',
                operatingHours: '10:00 AM - 8:00 PM',
                status: 'inactive',
                createdAt: new Date('2024-04-05').toISOString()
            },
            {
                id: 5,
                name: 'Luxury Car Dealers',
                address: '654 Maple Drive, Miami, FL 33101',
                email: 'info@luxurycar.com',
                phone: '+1 (555) 567-8901',
                operatingHours: '9:00 AM - 6:00 PM',
                status: 'active',
                createdAt: new Date('2024-05-12').toISOString()
            }
        ];
        setDealers(sampleDealers);
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
