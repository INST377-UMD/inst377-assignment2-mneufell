document.addEventListener('DOMContentLoaded', () => {
    loadCarouselImages();
    loadBreedButtons();
});
  
async function loadCarouselImages() {
    const res = await fetch('https://api.thedogapi.com/v1/images/search?limit=10');
    const data = await res.json();
    const carousel = document.getElementById('dogCarousel');
  
    data.forEach(img => {
      const image = document.createElement('img');
      image.src = img.url;
      carousel.appendChild(image);
});
  
    // Initialize Simple-Slider
new SimpleSlider('#dogCarousel', {
      autoPlay: true,
      interval: 3000,
      showNav: false,
      showButtons: false
    });
}
  
async function loadBreedButtons() {
    const res = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await res.json();
    const btnContainer = document.getElementById('breedButtons');
  
    breeds.forEach(breed => {
      const button = document.createElement('button');
      button.textContent = breed.name;
      button.classList.add('breed-btn');
      button.setAttribute('data-id', breed.id);
  
      button.addEventListener('click', () => showBreedInfo(breed));
      btnContainer.appendChild(button);
    });
}
  
function showBreedInfo(breed) {
    const breedInfo = document.getElementById('breedInfo');
    document.getElementById('breedName').textContent = breed.name;
    document.getElementById('breedDesc').textContent = breed.temperament || 'No description available.';
    document.getElementById('minLife').textContent = breed.life_span.split('–')[0].trim();
    document.getElementById('maxLife').textContent = breed.life_span.split('–')[1]?.trim() || breed.life_span;
  
    breedInfo.classList.remove('hidden');
}