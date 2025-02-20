type ButtonProps = {
    text: string;
    type: 'submit' | 'button';
    className: string;
    dataTestid?: string;
    onClick?: () => void;
};
export default function Button({
    text,
    type,
    className,
    onClick,
    dataTestid,
}: ButtonProps) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            data-testid={dataTestid}
        >
            {text}
        </button>
    );
}
