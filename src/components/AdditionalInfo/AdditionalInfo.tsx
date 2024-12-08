interface setAdditionalInformationI {
    weight: string;
    height: string;
    types: string[];
}

export default function AdditionalInfo({
    additionalInformation,
    closeAddiionalInformation,
}: {
    additionalInformation: setAdditionalInformationI;
    closeAddiionalInformation: () => void;
}) {
    return (
        <div className="pokemon-card pokemon-card__additional">
            <div>weight: {additionalInformation.weight}</div>
            <div>height: {additionalInformation.height}</div>
            <div>types: {additionalInformation.types.join()}</div>
            <span
                className="pokemon-card__additional--close"
                onClick={closeAddiionalInformation}
            ></span>
        </div>
    );
}
