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

const loadPost = () =>{

    const maxLength = 50;

    fetchImages()
    .then(data => {

        data.forEach((post , index) => {

            if (post.media_type === 'image') {

                let text = post.explanation.trim();
            
                let splitText = text.split(' ');

                let displayText = text;
                let hiddenText = '';

                
                if (splitText.length > maxLength){
                    displayText = splitText.slice(0 , maxLength).join(' ');
                    hiddenText = `<span class="hidden">${splitText.slice(maxLength , text.length).join(' ')}</span>`;
                }

                let html = `
                    <article class="col-lg-3 col-sm-12" id="${index}">

                        <img src="${post.url}"  alt="${post.title}">
                        <h3 class="title">${post.title}</h3>
                        <time>${post.date}</time>
                        <p>${displayText +' '+ hiddenText} `;
                        
                        if(hiddenText.length !== 0){
                            html+= `<a href='javascript:void(0)' class="read-more">read more</a>`;
                        }

                html+= `</p>

                        <button  class="like-btn"><i class="far fa-heart"></i></button>
                    </article>`;

                gallery.innerHTML += html;
            }

        });

        loadingScreen.style.display = "none";
    })
    .catch(err => console.log(err));
}


const listenForEvents = () => {

    gallery.addEventListener('click' , e => {

        let parentTag;

        if (e.target.tagName === 'I' || e.target.tagName === 'BUTTON' ){
            parentTag = e.target.parentNode;

            if(parentTag.tagName !== 'ARTICLE'){

                parentTag = parentTag.parentNode;
            }

            likeBtn(parentTag.getAttribute('id'));
        }
        else if(e.target.tagName === 'A'){
            parentTag = e.target.parentNode.parentNode;

            readMore(parentTag.getAttribute('id'));
        }
        
    });
}

const likeBtn = id =>{

    const likeBtn = document.getElementById(id).querySelector('i');

    if (likeBtn.classList.contains('far')){

        likeBtn.setAttribute('class', 'fas fa-heart');
    }
    else{

        likeBtn.setAttribute('class', 'far fa-heart');
    }
}

const readMore = id => {

    const linkClicked = document.getElementById(id).querySelector('a');
    const paragraph = document.getElementById(id).querySelector('p span');

    paragraph.classList.toggle('hidden');

    if(paragraph.classList.contains('hidden')){
        linkClicked.innerHTML = 'read more';
    }
    else{
        linkClicked.innerHTML = 'read less';
    }
}


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

const main = () => {

    loadPost();
    listenForEvents();
}

main();

