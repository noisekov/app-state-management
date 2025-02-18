import { createPortal } from 'react-dom';
import './Additionalnfo.css';

type Props = {
    toggleModal: () => void;
};

export default function AdditionalInfo({ toggleModal }: Props) {
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
                Pokemon info
                <div>weight: </div>
                <div>height: </div>
                <div>types: </div>
                <span
                    className="additional-info__modal-close"
                    onClick={() => toggleModal()}
                ></span>
            </div>
        </div>,
        document.body
    );
}
