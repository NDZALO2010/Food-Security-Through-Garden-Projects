document.addEventListener('DOMContentLoaded', () => {
    // Lightbox functionality for gallery images
    const galleryImages = document.querySelectorAll('.gallery-item-img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');

            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');

            const lightboxImage = document.createElement('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;

            const closeButton = document.createElement('button');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';

            // Append elements
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);

            // Close lightbox on button click or outside click
            closeButton.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
});
