import { useDispatch, useSelector } from 'react-redux';
import './ModalSelectedPokemon.css';
import { RootState } from '../../store/store';
import { cleanCheckedPokemons } from '../../store/chekedPokemons';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

export default function ModalSelectedPokemon() {
    const checkedPokemons = useSelector(
        (state: RootState) => state.checkedPokemons
    );
    const howManyChecked = checkedPokemons.length;
    const dispatch = useDispatch();
    const unselectCheckedPokemons = () => dispatch(cleanCheckedPokemons());
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    const downloadFile = () => {
        const csvFileBody = checkedPokemons.reduce(
            (acc, pokemon) => `${acc}${pokemon.name}\r\n`,
            'data:text/csv;charset=utf-8,'
        );
        const linkElement = linkRef.current;

        if (linkElement) {
            linkElement.href = encodeURI(csvFileBody);
            linkElement.download = `${howManyChecked}_pokemons.csv`;
        }
    };

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
                <a
                    ref={linkRef}
                    className="button modal__button--download"
                    onClick={downloadFile}
                >
                    Download
                </a>
            </div>,
            document.body
        )
    );
}
