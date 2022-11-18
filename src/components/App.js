import React, {useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import {api} from '../utils/Api.js';

function App() {

    //POPUP
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
    //USER
    const [userName, setUserNameState] = React.useState();
    const [userDescription, setUserDescriptionState] = React.useState();
    const [userAvatar, setUserAvatarState] = React.useState();

    //CARDS
    const [cards, setCardsState] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function closeAllPopups () {
        isEditAvatarPopupOpen && setEditAvatarPopupState(false);
        isEditProfilePopupOpen && setEditProfilePopupState(false);
        isAddPlacePopupOpen && setAddPlacePopupState(false);
        selectedCard && setSelectedCard(null);
    }

    //Закрытие попапов на esc
    React.useEffect(() => {
        function handleEscClose (event) {
            if(event.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }

    });

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((values) => {
            const userData = values[0];
            setUserNameState(userData.name);
            setUserDescriptionState(userData.about);
            setUserAvatarState(userData.avatar);
            setCardsState(values[1].map((card) => ({
                id: card._id,
                cardName: card.name,
                cardLink: card.link,
                cardLikes: card.likes
            })));
        })
        .catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })
    }, [])

    function handleEditAvatarClick () {
        setEditAvatarPopupState(true);
    }

    function handleEditProfileClick () {
        setEditProfilePopupState(true);
    }

    function handleAddPlaceClick () {
        setAddPlacePopupState(true);
    }

    function handleCardClick (card) {
        setSelectedCard(card);
    }

  return (
    <div className = 'page'>
    <div className='page__content'>
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick = {handleCardClick}
        name = {userName}
        description = {userDescription}
        avatar = {userAvatar}
        cards = {cards}
        />
        <Footer />
        <PopupWithForm 
        title ='Обновить аватар' 
        name ='edit-avatar' 
        btnName = 'Сохранить'
        children = {
            <label className="popup__form-label">
                <input name="popupAvatar" type="url" placeholder="Ссылка на аватарку" id="avatar-input" className="popup__input popup__input_value_avatar" required />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        }
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}  />

        <PopupWithForm 
        title='Редактировать профиль' 
        name='edit-profile' 
        btnName = 'Сохранить'
        children = {
            <>
                <label className="popup__form-label">
                    <input name="popupName" type="text" placeholder="Имя" id="name-input" className="popup__input popup__input_value_name" minLength="2" maxLength="40" required />
                    <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__form-label">
                    <input name="popupJob"  type="text" placeholder="Работа" id="job-input" className="popup__input popup__input_value_job" minLength="2" maxLength="200" required />
                    <span className="popup__input-error job-input-error"></span>
                </label>
            </>
        }
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}  />

        <PopupWithForm 
        title='Новое место' 
        name='add-card' 
        btnName = 'Создать'
        children = {
            <>
                <label className="popup__form-label">
                    <input name="popupName" type="text" placeholder="Название" id="place-input"  className="popup__input popup__input_value_name" required minLength="2" maxLength="30" />
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-label">
                    <input name="popupImg"  type="url" placeholder="Ссылка на картинку" id="url-input" className="popup__input popup__input_value_img" required />
                    <span className="popup__input-error url-input-error"></span>
                </label>
            </>
        }
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} />

        <ImagePopup 
        card = {selectedCard}
        onClose={closeAllPopups} />

    <div className="popup popup_type_confirmation">
        <div className="popup__container">
            <button type="button" className="popup__close"></button>
            <div className="popup__content">
                <h2 className="popup__title">Вы уверены?</h2>
                <form action="#" name="popupCardConfirm" className="popup__form popup__form_type_card-confirm">
                    <button type="submit" className="popup__save">Да</button>
                </form>
                
            </div>
        </div>
    </div>
    </div>
    </div>
  );
}

export default App;
