import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
;import { api } from '../utils/Api.js';
import { CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
    //Контекст данные пользователя
    const [currentUser, setCurrentUser] = useState({_id: '', name: '', about: '', description:'', avatar: ''});

    //POPUP
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);

    //CARDS
    const [cards, setCardsState] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    //Получаем данные пользователя и карточки с сервера
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCardsState(cardsData);
            })
            .catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
                console.log(err);
            })
    }, [])

    // Закрытие попапов
    function closeAllPopups() {
        isEditAvatarPopupOpen && setEditAvatarPopupState(false);
        isEditProfilePopupOpen && setEditProfilePopupState(false);
        isAddPlacePopupOpen && setAddPlacePopupState(false);
        selectedCard && setSelectedCard(null);
    }

    // Управление лайками на карточке
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if(isLiked) {
            api.deleteCardLike(card._id).then((newCard) => {
                setCardsState((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            api.setCardLikes(card._id).then((newCard) => {
                setCardsState((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // Удаление карточки
    function handleCardDelete(cardId) {
        api.deleteCard(cardId).then(() => {
            setCardsState((cards) => cards.filter((card) => card._id !== cardId));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //Изменение профиля
    function handleUpdateUser(userData) {
        api.updateUserInfo(userData.name, userData.about).then((userInfo) => {
            setCurrentUser(userInfo);
            closeAllPopups();
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Изменение аватара
    function handleUpdateAvatar (avatarLink) {
        api.editAvatar(avatarLink.avatar).then((userAvatar) => {
            setCurrentUser(userAvatar);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Добавление новой карточки
    function handleAddPlaceSubmit (cardData) {
        api.addNewCard(cardData).then((newCard) => {
            setCardsState([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //Закрытие попапов на esc
 useEffect(() => {
        function handleEscClose(event) {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }

    });

    function handleEditAvatarClick() {
        setEditAvatarPopupState(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupState(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupState(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className='page__content'>
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                    <Footer />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
