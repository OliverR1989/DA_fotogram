// Array mit allen Bildpfaden, die im Grid und Modal genutzt werden
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
// Speichert den Index des aktuell im Modal angezeigten Bildes
// Stores the index of the image currently shown in the modal
let currentIndex = 0;
// Holt den leeren Grid-Container aus dem HTML, um ihn per JS zu befüllen
// Gets the empty grid container from the HTML to fill it via JS
const photoGrid = document.getElementById('photo-grid');
// Läuft einmal pro Bild im Array durch und baut jeweils eine Foto-Karte
// Loops once per image in the array and builds a photo card for each
photos.forEach(function (path, index) {
    // Erstellt ein neues, leeres div-Element für die Karte
    // Creates a new, empty div element for the card
    const card = document.createElement('div');
    // Fügt die CSS-Klasse "photo-card" hinzu, damit das Styling greift
    // Adds the "photo-card" CSS class so the styling applies
    card.classList.add('photo-card');
    // Setzt das onclick-Attribut, damit ein Klick das Modal mit dem richtigen Index öffnet
    // Sets the onclick attribute so a click opens the modal with the correct index
    card.setAttribute('onclick', `openModal('modal', ${index})`);
    // Erstellt ein neues, leeres img-Element für das Foto
    // Creates a new, empty img element for the photo
    const img = document.createElement('img');
    // Setzt den Bildpfad aus dem Array als Quelle
    // Sets the image path from the array as the source
    img.src = path;
    // Setzt einen leeren Alt-Text (könnte später mit Beschreibung befüllt werden)
    // Sets an empty alt text (could be filled with a description later)
    img.alt = '';
    // Hängt das img-Element in die Karte ein
    // Appends the img element into the card
    card.appendChild(img);
    // Hängt die fertige Karte ins Grid ein
    // Appends the finished card into the grid
    photoGrid.appendChild(card);
});
// Öffnet das Modal und zeigt das Bild mit dem übergebenen Index
// Opens the modal and shows the image with the given index
function openModal(modal, index) {
    // Speichert den übergebenen Index als aktuellen Index
    // Stores the given index as the current index
    currentIndex = index;
    // Aktualisiert Bild, Titel und Zähler im Modal
    // Updates image, title and counter in the modal
    updateModalImage();
    // Fügt die Klasse "active" hinzu, wodurch das Modal sichtbar wird (siehe CSS)
    // Adds the "active" class, which makes the modal visible (see CSS)
    document.getElementById('modal').classList.add('active');
    // Verhindert das Scrollen der Seite im Hintergrund, solange das Modal offen ist
    // Prevents the page from scrolling in the background while the modal is open
    document.body.style.overflow = 'hidden';
}
// Schließt das Modal wieder
// Closes the modal again
function closeModal(modal) {
    // Entfernt die Klasse "active", wodurch das Modal wieder unsichtbar wird
    // Removes the "active" class, which makes the modal invisible again
    document.getElementById('modal').classList.remove('active');
    // Erlaubt wieder das normale Scrollen der Seite
    // Allows normal scrolling of the page again
    document.body.style.overflow = '';
}
// Aktualisiert das angezeigte Bild, den Zähler und den Titel im Modal
// Updates the displayed image, the counter and the title in the modal
function updateModalImage() {
    // Holt das img-Element innerhalb des Foto-Containers im Modal
    // Gets the img element inside the photo container in the modal
    const modalImg = document.querySelector('#photo-container img');
    // Setzt die Bildquelle auf das aktuelle Bild aus dem Array
    // Sets the image source to the current image from the array
    modalImg.src = photos[currentIndex];
    // Aktualisiert den Zähler-Text, z.B. "3/12"
    // Updates the counter text, e.g. "3/12"
    document.getElementById('img-index').textContent = `${currentIndex + 1}/${photos.length}`;
    // Zerlegt den Bildpfad, um nur den Dateinamen ohne Endung zu erhalten (z.B. "img_3")
    // Splits the image path to get only the filename without extension (e.g. "img_3")
    const filename = photos[currentIndex].split('/').pop().split('.')[0];
    // Setzt den Dateinamen als Text der Modal-Überschrift
    // Sets the filename as the text of the modal headline
    document.getElementById('img-title').textContent = filename;
}
// Wechselt zum nächsten Bild im Modal
// Switches to the next image in the modal
function nextImage() {
    // Erhöht den Index um 1, springt bei Erreichen des Endes zurück auf 0
    // Increases the index by 1, wraps back to 0 when the end is reached
    currentIndex = (currentIndex + 1) % photos.length;
    // Aktualisiert das Modal mit dem neuen Index
    // Updates the modal with the new index
    updateModalImage();
}
// Wechselt zum vorherigen Bild im Modal
// Switches to the previous image in the modal
function prevImage() {
    // Verringert den Index um 1, springt bei Unterschreiten von 0 zum letzten Bild
    // Decreases the index by 1, wraps to the last image when going below 0
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    // Aktualisiert das Modal mit dem neuen Index
    // Updates the modal with the new index
    updateModalImage();
}
// Läuft durch alle Elemente mit der Klasse "modal" (aktuell nur eins)
// Loops through all elements with the class "modal" (currently just one)
document.querySelectorAll('.modal').forEach(function (modal) {
    // Fügt einen Klick-Listener auf den Modal-Hintergrund hinzu
    // Adds a click listener on the modal background
    modal.addEventListener('click', function (e) {
        // Prüft, ob genau der Hintergrund geklickt wurde (nicht der Inhalt)
        // Checks whether exactly the background was clicked (not the content)
        if (e.target === modal) {
            // Entfernt die Klasse "active", schließt also das Modal
            // Removes the "active" class, thereby closing the modal
            modal.classList.remove('active');
            // Erlaubt wieder das normale Scrollen der Seite
            // Allows normal scrolling of the page again
            document.body.style.overflow = '';
        }
    })
})
// Fügt einen globalen Tastatur-Listener auf das gesamte Dokument hinzu
// Adds a global keyboard listener on the entire document
document.addEventListener('keydown', function (e) {
    // Prüft, ob die gedrückte Taste die Escape-Taste war
    // Checks whether the pressed key was the Escape key
    if (e.key === 'Escape') {
        // Sucht das aktuell geöffnete (aktive) Modal
        // Finds the currently open (active) modal
        const activeModal = document.querySelector('.modal.active');
        // Prüft, ob überhaupt ein Modal offen ist
        // Checks whether a modal is open at all
        if (activeModal) {
            // Entfernt die Klasse "active", schließt also das Modal
            // Removes the "active" class, thereby closing the modal
            activeModal.classList.remove('active');
            // Erlaubt wieder das normale Scrollen der Seite
            // Allows normal scrolling of the page again
            document.body.style.overflow = '';
        }
    }
})