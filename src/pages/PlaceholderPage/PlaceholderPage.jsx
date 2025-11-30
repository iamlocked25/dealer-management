import './PlaceholderPage.css';

const PlaceholderPage = ({ title, description }) => {
    return (
        <div className="placeholder-page">
            <div className="placeholder-content">
                <div className="placeholder-icon">🚧</div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
