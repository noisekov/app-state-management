import './Pokemon.css';
import React, { Component } from 'react';
import equal from 'fast-deep-equal';

interface requestDataI {
    name: string[];
    abilities: string[];
    sprites: string;
}

interface SerachState {
    inputData: requestDataI;
}

interface SerachProps {
    onInputData: requestDataI | object;
}

export default class Pokemon extends Component<SerachProps> {
    state: SerachState = {
        inputData: {
            name: [],
            abilities: [],
            sprites: '',
        },
    };

    constructor(props: SerachProps) {
        super(props);
    }

    componentDidUpdate(prevProps: SerachProps) {
        if (!equal(this.props.onInputData, prevProps.onInputData)) {
            this.setState({ inputData: this.props.onInputData });
        }
    }

    render() {
        const { sprites, name, abilities } = this.state.inputData;

        return (
            <div className="pokemon-card">
                <h1>
                    {name.length
                        ? name.length === 1
                            ? 'Pokemon'
                            : 'Examples of Pokemon'
                        : 'Incorrect input value'}
                </h1>
                {name.length === 1 && sprites && (
                    <div className="pokemon-card__image">
                        <img
                            src={sprites}
                            alt={name[0]}
                            width={150}
                            height={150}
                        />
                    </div>
                )}
                {!!name.length && (
                    <p className="pokemon-card__text">
                        {name.length === 1
                            ? 'name: ' + name[0]
                            : 'names: ' + name.join(', ')}
                    </p>
                )}
                {!!abilities.length && (
                    <p className="pokemon-card__text">
                        abilities: {abilities.join(', ')}
                    </p>
                )}
            </div>
        );
    }
}
