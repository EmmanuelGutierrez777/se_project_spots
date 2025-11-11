const initalCards = [
  {
    name: "Mountain",
    link: "https://unsplash.com/photos/green-trees-near-gray-mountain-during-daytime-6SHkCsvgfy0",
  },
  {
    name: "Hamster",
    link: "https://unsplash.com/photos/selective-focus-photography-of-brown-hamster-adK3Vu70DEQ",
  },
  {
    name: "Pizza",
    link: "https://unsplash.com/photos/pizza-on-chopping-board-MqT0asuoIcU",
  },
  {
    name: "Cathedral",
    link: "https://unsplash.com/photos/brown-cathedral-during-daytime-d0xjEv-WJQk",
  },
  {
    name: "Cabin",
    link: "https://unsplash.com/photos/wooden-house-near-pine-trees-and-pond-coated-with-snow-during-daytime-OgcJIKRnRC8",
  },
  {
    name: "Movies",
    link: "https://unsplash.com/photos/a-red-and-white-striped-bag-of-popcorn-next-to-a-red-and-white-striped-bag-djvkPJbH3bE",
  },
];
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
  console.log(newPostLinkInput.value);
  console.log(newPostCaptionInput.value);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

initalCards.forEach(function (card) {
  console.log(card.name);
});
