// Loads all photos from the array and displays them in the matching containers
const photos = [ // Array containing the filenames of the images
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

const container = document.querySelectorAll('.photo-card'); // Gets all elements with the class "photo-card"

console.log(container.length); // Logs how many containers were found
console.log(container); // Logs the list of containers itself (for debugging)

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
function updateModalImage() {
    const modalImg = document.querySelector('#photo-container img');
    modalImg.src = photos[currentIndex];
    document.getElementById('img-index').textContent = `${currentIndex + 1}/${photos.length}`;

    const filename = photos [currentIndex].split('/').pop().split('.')[0];
    document.getElementById('img-title').textContent = filename;
}
function nextImage() {
    currentIndex = (currentIndex + 1) % photos.length; 
    updateModalImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length; 
    updateModalImage();
}
document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    })
})