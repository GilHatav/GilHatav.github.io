const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const toStatistics = document.getElementById('toStatistics')
let idx = 0
let interval = setInterval(run, 2000)

window.addEventListener('load', () => {
    const titles = JSON.parse(sessionStorage.getItem('filteredTitles'))
    const images = JSON.parse(sessionStorage.getItem('filteredImages'))
    imgs.innerHTML = ''
    var counter = 1

    titles.forEach((title) => {
        images.forEach((image) => {
            const creativeEl = document.createElement('div')
            creativeEl.classList.add('creative')
            creativeEl.innerHTML = `
            <img class="imageView"
                        src= ${image}
                        alt="second-image"
                        />
                        <div class="bottom-left">${title}</div>
            `
            imgs.appendChild(creativeEl)
            counter++
        })
    });
})

window.addEventListener("beforeunload", function () {
    document.body.classList.add("animate-out");
  });

function run() {
    idx++
    changeImage()
}

function changeImage() {
    if(idx > imgs.childElementCount - 1) {
        idx = 0
    } else if(idx < 0) {
        idx = imgs.childElementCount - 1
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
})

toStatistics.addEventListener('click', () => {
    window.location.href = 'statistics.html';
})


