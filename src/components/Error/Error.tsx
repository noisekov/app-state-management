import Button from '../Button/Button';
import './Error.css';

export default function Error() {
    return (
        <div className="error">
            <h1>Something went wrong</h1>
            <Button
                type="button"
                className="button"
                onClick={() => window.location.reload()}
                text="Back to App"
            />
        </div>
    );
}
