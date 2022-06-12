
const imagesContainer = document.getElementById('imagesContainer')
const toCreatives = document.getElementById('toCreatives')
const filtteredImages = []


window.addEventListener('load', () => {
    const images = JSON.parse(sessionStorage.getItem('images'))
    imagesContainer.innerHTML = ''
    var counter = 0
    
    images.forEach((image) => {
        const imageEl = document.createElement('div')
        imageEl.classList.add('image-flex-item')
        imageEl.innerHTML = `
        <input  type="checkbox" id="image_${counter}" >
            <div class="container titlesText">
                <label for="image_${counter}">
                    <img src=${image} />
                </label>
            </div>
        `
        const inputEl = imageEl.querySelector('input')
        inputEl.checked = false;
        inputEl.addEventListener('change', (event)=>{
            if (event.currentTarget.checked) {
                filtteredImages.push(image)
              } else {
                var image_idx = filtteredImages.indexOf(image)
                if (image_idx > -1) {
                    filtteredImages.splice(image_idx, 1)
                }
              }
        })

        imagesContainer.appendChild(imageEl)
        counter++
    });
})

window.addEventListener("beforeunload", function () {
    document.body.classList.add("animate-out");
  });

toCreatives.addEventListener('click', ()=>{
    if(filtteredImages.length > 0){
        sessionStorage.setItem('filteredImages', JSON.stringify(filtteredImages))
    }
    window.location.href = 'creatives.html';
})