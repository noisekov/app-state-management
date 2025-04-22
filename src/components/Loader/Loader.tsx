import style from './Loader.module.css';

export default function Loader() {
    return (
        <div className={style['pulse-container']} data-testid="pulse-container">
            <div
                className={`${style['pulse-bubble']} ${style['pulse-bubble-1']}`}
            ></div>
            <div
                className={`${style['pulse-bubble']} ${style['pulse-bubble-2']}`}
            ></div>
            <div
                className={`${style['pulse-bubble']} ${style['pulse-bubble-3']}`}
            ></div>
        </div>
    );
}
