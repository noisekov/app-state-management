import Button from '../Button/Button';
import styles from './Error.module.css';

export default function Error() {
    return (
        <div className={styles.error}>
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
