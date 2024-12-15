import notFound from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={notFound.wrapper}>
            <h1>404</h1>
            <p>Page Not Found</p>
        </div>
    );
}
