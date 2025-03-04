import Link from 'next/link';
import styles from '../styles/not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles['not-found__text']}>404</h1>
            <p className={styles['not-found__text']}>Page Not Found</p>
            <Link className={styles['not-found__link']} href="/">
                back
            </Link>
        </div>
    );
}
