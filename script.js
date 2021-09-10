const gallery = document.querySelector('section.gallery div.row');
const loadingScreen = document.querySelector('p.loading-text');

particlesJS.load('particles-js', 'assets/particles.json');

const fetchImages = async () =>{
    const API_KEY = 'OYrC1WZg8vIJ3RwcdxfXPNaR8DKKNijv5qfsxgqt';
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    const query = `&start_date=2021-09-01`;

    const response = await fetch(URL+query);

    if (response.status !== 200) {
        throw new Error('there was an error getting the information');
    }

    const data = await response.json();
    return data;
}

fetchImages()
.then(data => {
   
    data.forEach(post => {
      
        if(post.media_type === 'image'){

            let html = `
            <article class="col-lg-3 col-sm-12">

                    <img src="${post.url}"  alt="${post.title}">
                    <h3 class="title">${post.title}</h3>
                    <time>${post.date}</time>
                    <p>${post.explanation}</p>

                    <button  class="like-btn"><i class="far fa-heart"></i></button>
                </article>

        `;

            gallery.innerHTML += html;
        }
        
    });

    loadingScreen.style.display = "none";
})
.catch(err => console.log(err));


const scrollFunction = () => {
    const scrollUp = document.getElementById("scrollUp");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollUp.style.display = "block";
    }
    else {
        scrollUp.style.display = "none";
    }
}

onscroll = () => {
    scrollFunction();
};