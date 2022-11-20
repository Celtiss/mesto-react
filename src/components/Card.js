function Card ({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    return (
            <li className="elements__item" key = {card.id}>
                <button type="button" aria-label="Удалить" className="elements__trash-button"></button>
                <div style={{ backgroundImage: `url(${card.cardLink})` }} className="elements__image" onClick={handleClick}></div>
                <div className="elements__item-description">
                    <h3 className="elements__title">{card.cardName}</h3>
                    <div className="elements__like-container">
                        <button type="button" aria-label="Лайк" className="elements__like-icon"></button>
                        <p className="elements__like-count">{card.cardLikes.length}</p>
                    </div>
                </div>
            </li>
    );
}

export default Card;