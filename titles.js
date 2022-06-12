
const titlesContainer = document.getElementById('titlesContainer')
const toImages = document.getElementById('toImages')
const loader = document.getElementById('loader')
const filtteredTitles = []

window.addEventListener('load', () => {
    const titles = JSON.parse(sessionStorage.getItem('titles'))
    titlesContainer.innerHTML = ''
    var counter = 0
    
    titles.forEach((title) => {
        const titleEl = document.createElement('div')
        titleEl.classList.add('titleView')
        titleEl.innerHTML = `
        <input type="checkbox" id="title_${counter}" name="select" value="1" >
            <label class="titlesText" for="title_${counter}">
              <p>${title}</p>
            </label>
        `

        const inputEl = titleEl.querySelector('input')
        inputEl.checked = false;
        console.log(inputEl.id)
        inputEl.addEventListener('change', (event)=>{
            if (event.currentTarget.checked) {
                filtteredTitles.push(title)
              } else {
                var title_idx = filtteredTitles.indexOf(title)
                if (title_idx > -1) {
                    filtteredTitles.splice(title_idx, 1)
                }
              }
        })
        titlesContainer.appendChild(titleEl)
        counter++
    });

    loader.style.display = "none"

})

window.addEventListener("beforeunload", function () {
    document.body.classList.add("animate-out");
  });

toImages.addEventListener('click', () => {
    if(filtteredTitles.length > 0){
        sessionStorage.setItem('filteredTitles', JSON.stringify(filtteredTitles))
    }
    window.location.href = 'images.html';
})