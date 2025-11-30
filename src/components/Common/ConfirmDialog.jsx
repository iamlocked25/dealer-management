import './ConfirmDialog.css';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
    if (!open) return null;
    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-dialog-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
