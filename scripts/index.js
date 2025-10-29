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
const newPostLinkInput = newPostModal.querySelector("#full-name");
const newPostCaptionInput = newPostModal.querySelector("#form-description");
const newPostForm = newPostModal.querySelector(".modal__form");

editProfile.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
});

editExitButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPost.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

postExitButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
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
  console.log(newPostLinkInput);
  console.log(newPostCaptionInput);
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
