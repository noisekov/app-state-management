import { createPortal } from 'react-dom';
import './Additionalnfo.css';

type Props = {
    toggleModal: () => void;
    dataForModal: {
        img: string;
        height: number;
        name: string;
        weight: number;
        types: string[];
    };
};

export default function AdditionalInfo({ toggleModal, dataForModal }: Props) {
    const { img, height, name, weight, types } = dataForModal;

    return createPortal(
        <div
            className="additional-info modal"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    toggleModal();
                }
            }}
        >
            <div className="additional-info__modal">
                <img
                    className="additional-info__modal-img"
                    src={img}
                    alt={'pokemon' + name}
                    width="100%"
                    height="100%"
                />
                <span>name: {name}</span>
                <span>weight: {weight}</span>
                <span>height: {height}</span>
                <span>types: {types.join(', ')} </span>
                <span
                    className="additional-info__modal-close"
                    onClick={() => toggleModal()}
                ></span>
            </div>
        </div>,
        document.body
    );
}
