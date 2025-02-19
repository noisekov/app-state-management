import './Loader.css';

export default function Loader() {
    return (
        <div className="pulse-container" data-testid="pulse-container">
            <div className="pulse-bubble pulse-bubble-1"></div>
            <div className="pulse-bubble pulse-bubble-2"></div>
            <div className="pulse-bubble pulse-bubble-3"></div>
        </div>
    );
}
