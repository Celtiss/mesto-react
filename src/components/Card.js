function Card (props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
            <li className="elements__item" key = {props.card.id}>
                <button type="button" aria-label="Удалить" className="elements__trash-button"></button>
                <div style={{ backgroundImage: `url(${props.card.cardLink})` }} className="elements__image" onClick={handleClick}></div>
                <div className="elements__item-description">
                    <h3 className="elements__title">{props.card.cardName}</h3>
                    <div className="elements__like-container">
                        <button type="button" aria-label="Лайк" className="elements__like-icon"></button>
                        <p className="elements__like-count">{props.card.cardLikes.length}</p>
                    </div>
                </div>
            </li>
    );
}

export default Card;