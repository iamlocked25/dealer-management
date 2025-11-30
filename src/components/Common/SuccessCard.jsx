import { CheckCircle2 } from 'lucide-react';
import './SuccessCard.css';

const SuccessCard = ({ message }) => (
    <div className="shadcn-success-card">
        <div className="shadcn-success-icon">
            <CheckCircle2 size={40} />
        </div>
        <div className="shadcn-success-content">
            <h3>Success</h3>
            <p>{message}</p>
        </div>
    </div>
);

export default SuccessCard;
