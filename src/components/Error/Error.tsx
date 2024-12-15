import './Error.css';

export default function Error() {
    return (
        <div className="error">
            <h1>Something went wrong</h1>
            <button className="button" onClick={() => window.location.reload()}>
                Back to App
            </button>
        </div>
    );
}
