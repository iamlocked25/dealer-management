import { useState, useEffect } from 'react';
import DealerPreviewCard from './DealerPreviewCard';
import { useDealer } from '../../contexts/DealerContext';
import './DealerForm.css';

const DealerForm = ({ dealer, onSuccess, onCancel, mode = 'add' }) => {
    const { addDealer, updateDealer } = useDealer();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        operatingHours: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        if (dealer && mode === 'edit') {
            setFormData({
                name: dealer.name || '',
                address: dealer.address || '',
                email: dealer.email || '',
                phone: dealer.phone || '',
                operatingHours: dealer.operatingHours || ''
            });
        }
    }, [dealer, mode]);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Dealer name is required';
                if (value.length < 3) return 'Name must be at least 3 characters';
                if (value.length > 100) return 'Name must not exceed 100 characters';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Invalid email format';
                return '';

            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                // Only allow 10 digits
                const digitsOnly = value.replace(/\D/g, '');
                if (digitsOnly.length !== 10) return 'Enter 10 digit phone number';
                return '';

            case 'address':
                if (!value.trim()) return 'Address is required';
                if (value.length < 10) return 'Address must be at least 10 characters';
                if (value.length > 200) return 'Address must not exceed 200 characters';
                return '';

            case 'operatingHours':
                if (!value.trim()) return 'Operating hours are required';
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        setTouched({
            name: true,
            email: true,
            phone: true,
            address: true,
            operatingHours: true
        });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show preview card before final submission
        setPreviewData({ ...formData, status: 'active' });
        setShowPreview(true);
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            let result;
            if (mode === 'edit' && dealer) {
                result = await updateDealer(dealer.id, formData);
            } else {
                result = await addDealer(formData);
            }
            if (result.success) {
                onSuccess(result.dealer || formData);
                setShowPreview(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreviewCancel = () => {
        setShowPreview(false);
    };

    const handleReset = () => {
        if (mode === 'edit' && dealer) {
            setFormData({
                name: dealer.name || '',
                address: dealer.address || '',
                email: dealer.email || '',
                phone: dealer.phone || '',
                operatingHours: dealer.operatingHours || ''
            });
        } else {
            setFormData({
                name: '',
                address: '',
                email: '',
                phone: '',
                operatingHours: ''
            });
        }
        setErrors({});
        setTouched({});
    };

    return (
        <>
            {!showPreview ? (
                <form className="dealer-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-grid">
                        {/* ...existing form fields... */}
                        <div className="form-group">
                            <label htmlFor="name">
                                Dealer Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.name && touched.name ? 'error' : ''}
                                placeholder="Enter dealer name"
                            />
                            {errors.name && touched.name && (
                                <span className="error-message">{errors.name}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email ? 'error' : ''}
                                placeholder="dealer@example.com"
                            />
                            {errors.email && touched.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                Phone Number <span className="required">*</span>
                            </label>
                            <div className="phone-input-group">
                                <span className="phone-prefix">+91</span>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.phone && touched.phone ? 'error' : ''}
                                    placeholder="9876543210"
                                    maxLength={10}
                                    pattern="^\d{10}$"
                                />
                            </div>
                            {errors.phone && touched.phone && (
                                <span className="error-message">{errors.phone}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="operatingHours">
                                Operating Hours <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="operatingHours"
                                name="operatingHours"
                                value={formData.operatingHours}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.operatingHours && touched.operatingHours ? 'error' : ''}
                                placeholder="9:00 AM - 6:00 PM"
                            />
                            {errors.operatingHours && touched.operatingHours && (
                                <span className="error-message">{errors.operatingHours}</span>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="address">
                                Address <span className="required">*</span>
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.address && touched.address ? 'error' : ''}
                                placeholder="Enter complete address"
                                rows="3"
                            />
                            {errors.address && touched.address && (
                                <span className="error-message">{errors.address}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel || handleReset}
                            disabled={isSubmitting}
                        >
                            {onCancel ? 'Cancel' : 'Reset'}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Dealer' : 'Add Dealer'}
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <DealerPreviewCard dealer={previewData} />
                    <div className="form-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handlePreviewCancel}
                            disabled={isSubmitting}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Confirm & Create'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DealerForm;
