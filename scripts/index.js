const editProfile = document.querySelector(".profile__edit-button-layout");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editExitButton = editProfileModal.querySelector(".modal__exit-icon");
const newPost = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const postExitButton = newPostModal.querySelector(".modal__exit-icon");

editProfile.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
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
