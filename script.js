
API = 'https://oqadgen2.azurewebsites.net/api/creativesFromUrl'
const form = document.getElementById('form')
const explore = document.getElementById('explore')
const loader = document.getElementById('loader')
const example = {"env": "local", "url": "https://www.burgerdudes.se/the-worlds-50-best-burgers/", "stock":""}
loader.style.display = "none"

window.addEventListener("beforeunload", function () {
  document.body.classList.add("animate-out");
});

if(form != null){
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        const payload = {"env": "local", "url": searchTerm, "stock":""};
        getCreatives(API, payload)
        search.value = ''
    } else {
        window.location.reload()
    }
  })

  explore.addEventListener('click', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        const payload = {"env": "local", "url": searchTerm, "stock":""};
        getCreatives(API, payload)
        search.value = ''
    } else {
        window.location.reload()
    }
  })
}

 async function getCreatives(url = '', data = {}) {
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
    showCreatives(data)
  })
  .catch((error) => {
    console.error('Error:', error);
    loader.style.display = "none"
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

  function showCreatives(creativesData){
    const {url, category, titles, images, kw} = creativesData
    sessionStorage.setItem('landing_page', url)
    sessionStorage.setItem('category', category)
    sessionStorage.setItem('titles', JSON.stringify(titles))
    sessionStorage.setItem('images', JSON.stringify(images))
    sessionStorage.setItem('kw', JSON.stringify(kw))
    fadeOutEffectLoader()
    window.location.href = 'titles.html';
  }
  
