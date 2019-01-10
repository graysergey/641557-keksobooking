'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPlaceFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPlacePreview = document.querySelector('.ad-form__photo');

  var onInputAvatarChange = function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    onLoadSuccess(matches, file);
  };

  var onLoadSuccess = function (matches, file) {
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onInputPhotosPlaceChange = function () {
    var files = Array.from(photoPlaceFileChooser.files);
    var previewContainer = photoPlacePreview.parentNode;
    var fragment = document.createDocumentFragment();

    files.forEach(function (img) {
      var imageElement = document.createElement('img');
      imageElement.classList.add('ad-form__photo');
      var currentPreviewElement = photoPlacePreview.cloneNode();
      currentPreviewElement.hidden = false;
      currentPreviewElement.classList.add('ad-form__preview-photo');
      var fileName = img.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      onLoadSuccessPhotoPlace(matches, img, imageElement);
      currentPreviewElement.appendChild(imageElement);
      fragment.appendChild(currentPreviewElement);
    });

    previewContainer.appendChild(fragment);
    photoPlacePreview.hidden = true;
  };

  var onLoadSuccessPhotoPlace = function (matches, imgFile, imgElement) {
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgElement.src = reader.result;
      });
      reader.readAsDataURL(imgFile);
    }
  };

  var removePreviewPhotos = function () {
    avatarPreview.src = 'img/muffin-grey.svg';

    var photoContainers = document.querySelectorAll('.ad-form__preview-photo');
    photoContainers.forEach(function (container) {
      container.remove();
    });
    photoPlacePreview.hidden = false;
  };

  window.previewPhotos = {
    onLoadAvatar: function () {
      avatarFileChooser.addEventListener('change', onInputAvatarChange);
      photoPlaceFileChooser.addEventListener('change', onInputPhotosPlaceChange);
    },
    clean: removePreviewPhotos
  };

})();
