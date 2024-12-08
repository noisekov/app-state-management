import './ErrorPage.css';

export default function ErrorPage() {
    return (
        <div className="error-page">
            <h1>Something went wrong</h1>
            <button className="button" onClick={() => window.location.reload()}>
                Back to App
            </button>
        </div>
    );
}
