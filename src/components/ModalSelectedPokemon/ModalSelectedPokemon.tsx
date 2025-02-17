import { useDispatch, useSelector } from 'react-redux';
import './ModalSelectedPokemon.css';
import { RootState } from '../../store/store';
import { cleanCheckedPokemons } from '../../store/chekedPokemons';
import { createPortal } from 'react-dom';

export default function ModalSelectedPokemon() {
    const checkedPokemons = useSelector(
        (state: RootState) => state.checkedPokemons
    );
    const howManyChecked = checkedPokemons.length;
    const dispatch = useDispatch();
    const unselectCheckedPokemons = () => dispatch(cleanCheckedPokemons());

    return (
        !!howManyChecked &&
        createPortal(
            <div className="modal-wrapper">
                <span className="modal_text">
                    {howManyChecked > 1
                        ? `${howManyChecked} items are `
                        : `${howManyChecked} item is `}
                    selected
                </span>
                <button
                    type="button"
                    className="button modal__button--unselect"
                    onClick={() => unselectCheckedPokemons()}
                >
                    Unselect all
                </button>
                <button
                    type="button"
                    className="button modal__button--download"
                >
                    Download
                </button>
            </div>,
            document.body
        )
    );
}
