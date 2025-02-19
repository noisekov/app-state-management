type ButtonProps = {
    text: string;
    type: 'submit' | 'button';
    className: string;
    onClick?: () => void;
};
export default function Button({
    text,
    type,
    className,
    onClick,
}: ButtonProps) {
    return (
        <button className={className} type={type} onClick={onClick}>
            {text}
        </button>
    );
}
