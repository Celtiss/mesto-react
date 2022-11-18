function ImagePopup (props) {

    return (
        <div className={`popup popup_type_image ${props.card ? 'popup_is-opened' : ''}`} onClick={props.onClose} >
            <div className="popup__container-image">
                <button type="button" className="popup__close"></button>
                <img src={`${props.card ? props.card.cardLink:null}`} alt={`${props.card ? props.card.cardName:null}`} className="popup__image" />
                <h2 className="popup__image-heading">{props.card ? props.card.cardName:null}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;