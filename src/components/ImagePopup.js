function ImagePopup ({card, onClose}) {

    return (
        <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`} onClick={onClose} >
            <div className="popup__container-image">
                <button type="button" className="popup__close"></button>
                <img src={`${card?.cardLink}`} alt={`${card?.cardName}`} className="popup__image" />
                <h2 className="popup__image-heading">{card ?. cardName}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;