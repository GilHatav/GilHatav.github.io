API = 'http://localhost:7071/api/getStatistics'
const titles = JSON.parse(sessionStorage.getItem('filteredTitles'))
const images = JSON.parse(sessionStorage.getItem('filteredImages'))
const loader = document.getElementById('loader')
loader.style.display = "none"
const creatives = []
titles.forEach((title) => {
  images.forEach((image) => {
    var creative = {"image": image,  "title": title }
    creatives.push(creative)
  })
})
const payload = {
  "creatives": creatives,
  "landingPage": sessionStorage.getItem('landing_page')
}
const toMain = document.getElementById('toMain')
const tableContent = document.getElementById("table-content")

window.addEventListener('load', ()=>{
console.log('start')
getStatistics(API, payload)
})

toMain.addEventListener('click', () => {
  sessionStorage.clear()
  window.location.href = 'main.html';
})

async function getStatistics(url = '', data = {}) {
    loader.style.display = "flex"
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json()
    )
    .then(data => {
      console.log('Success:');
      showStatistics(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    }

    function fadeOutEffectLoader() {
      var fadeEffect = setInterval(function () {
          if (!loader.style.opacity) {
            loader.style.opacity = 1;
          }
          if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.25;
          } else {
              clearInterval(fadeEffect);
          }
      }, 50);
  }
  

    function showStatistics(creativesData){
        const {creatives, landindPage} = creativesData
        console.log(landindPage)
        tableContent.innerHTML = ''
        var counter = 1
        creatives.forEach(creative => {
            console.log(creative["title"])
            console.log(creative["image"])
            console.log(creative["CTR"])
            console.log(creative["CPM"])
            console.log(creative["Score"])
            const {title, image, CTR, CPM, Score} = creative
            const rowEl = document.createElement('tr')
            rowEl.innerHTML = `
            <td>${counter}</td>
            <td>${title}</td>
            <td> <img src=${image} style="width:150px;height:150px"; /> </td>
            <td>${CTR}</td>
            <td>${CPM}</td>
            <td>${Score}</td>
            `
            tableContent.appendChild(rowEl)
            counter++
        });
        fadeOutEffectLoader()
    }
