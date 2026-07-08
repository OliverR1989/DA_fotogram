// Array containing all image paths used in the grid and modal
const photos = [
    './assets/imgs/img_1.jpeg',
    './assets/imgs/img_2.jpeg',
    './assets/imgs/img_3.jpeg',
    './assets/imgs/img_4.jpeg',
    './assets/imgs/img_5.jpeg',
    './assets/imgs/img_6.jpeg',
    './assets/imgs/img_7.jpeg',
    './assets/imgs/img_8.jpeg',
    './assets/imgs/img_9.jpeg',
    './assets/imgs/img_10.jpeg',
    './assets/imgs/img_11.jpeg',
    './assets/imgs/img_12.jpeg',
];

let currentIndex = 0;

const photoGrid = document.getElementById('photo-grid');

// Dynamically builds one photo card per image and adds it to the grid
photos.forEach(function (path, index) {
    const card = document.createElement('div');
    card.classList.add('photo-card');
    card.setAttribute('onclick', `openModal('modal', ${index})`);
    const img = document.createElement('img');
    img.src = path;
    img.alt = '';
    card.appendChild(img);
    photoGrid.appendChild(card);
});

function openModal(modal, index) {
    currentIndex = index;
    updateModalImage();
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}
// Updates image, counter and title inside the modal
function updateModalImage() {
    const modalImg = document.querySelector('#photo-container img');
    modalImg.src = photos[currentIndex];
    document.getElementById('img-index').textContent = `${currentIndex + 1}/${photos.length}`;

    const filename = photos[currentIndex].split('/').pop().split('.')[0];
    document.getElementById('img-title').textContent = filename;
}
// Switches to the next image, wrapping back to the start at the end
function nextImage() {
    currentIndex = (currentIndex + 1) % photos.length;
    updateModalImage();
}
// Switches to the previous image, wrapping to the end at the start
function prevImage() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateModalImage();
}
// Closes the modal when clicking on the background (outside the modal box)
document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    })
})
// Closes the currently open modal when pressing Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
})