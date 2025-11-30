const initialCards = [
  {
    name: "Mountain",
    link: "https://images.unsplash.com/photo-1604644325176-2b8eb8a3ac8c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hamster",
    link: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pizza",
    link: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cathedral",
    link: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cabin",
    link: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Movies",
    link: "https://plus.unsplash.com/premium_photo-1710522706751-c2f0c76cc5fd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const songTemplate = document.querySelector("#song-template");
const previewModal = document.querySelector("#modal__preview");
const previewModalImg = previewModal.querySelector(".modal__preview-img");
const previewModalExit = previewModal.querySelector(
  ".modal__preview-exit-button"
);
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption"
);

const editProfile = document.querySelector(".profile__edit-button-layout");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editExitButton = editProfileModal.querySelector(".modal__exit-icon");
const newPost = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const postExitButton = newPostModal.querySelector(".modal__exit-icon");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const nameInput = editProfileModal.querySelector("#full-name");
const bioInput = editProfileModal.querySelector("#form-description");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#image-link");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostForm = newPostModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = songTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__description");
  const cardImg = cardElement.querySelector(".card__image");
  const card = cardElement.querySelector(".card");

  cardTitle.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  const cardLikeButton = cardElement.querySelector(".card__button");
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__button-liked");
    cardLikeButton.classList.toggle("card__button");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    card.remove();
  });

  const cardImgButton = cardElement.querySelector(".card__img-button");

  cardImgButton.addEventListener("click", function () {
    previewModalCaption.textContent = cardTitle.textContent;
    previewModalImg.src = cardImg.src;
    previewModalImg.alt = cardImg.alt;
    openModal(previewModal);
  });

  previewModalExit.addEventListener("click", function () {
    closeModal(previewModal);
  });

  return cardElement;
}

function openModal(open) {
  open.classList.add("modal_is-opened");
}

function closeModal(close) {
  close.classList.remove("modal_is-opened");
}

editProfile.addEventListener("click", function () {
  openModal(editProfileModal);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
});

editExitButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPost.addEventListener("click", function () {
  openModal(newPostModal);
});

postExitButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", editProfileSubmitHandler);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardLink = newPostModal.querySelector("#image-link");
  const cardCaption = newPostModal.querySelector("#caption");
  const cardLinkValue = cardLink.value;
  const cardCaptionValue = cardCaption.value;

  const newCardData = {
    name: cardCaptionValue,
    link: cardLinkValue,
  };

  const newCard = getCardElement(newCardData);
  cardList.prepend(newCard);

  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => {
  cardList.prepend(getCardElement(card));
});
