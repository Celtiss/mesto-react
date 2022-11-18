import Card from './Card.js';

function Main(props) {

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__pack">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <div className="profile__avatar-edit-button"></div>
                        <div style={{ backgroundImage: `url(${props.avatar})` }} className="profile__avatar"></div>
                    </div>
                    <div className="profile__info">
                        <button type="button" aria-label="Изменить" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        <h1 className="profile__name">{props.name}</h1>
                        <p className="profile__description">{props.description}</p>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {props.cards.map((card) => <Card key={card.id} card = {card} onCardClick={props.onCardClick} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;