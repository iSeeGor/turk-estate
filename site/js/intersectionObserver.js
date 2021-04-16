$(function() {
    lazyLoadImage();
    lazyLoadBackground();
    lazyLoadIframe();
});

function lazyLoadImage(){
    const arr = document.querySelectorAll('.lazy-image');
    if ('IntersectionObserver' in window) {
        const intersection = new IntersectionObserver((data, lazyobserver) => {
            data.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-image");
                    lazyobserver.unobserve(lazyImage);
                }
            })
        });
        
        arr.forEach((v) => {
            intersection.observe(v);
        })
    }
    else{
        for(var i = 0; i < arr.length; i++){
            var lazyImage = arr[i];
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy-image");
        }
    }
}

function lazyLoadBackground(){
    const arr = document.querySelectorAll('.lazy-background');
    if ('IntersectionObserver' in window) {
        const intersectionBackground = new IntersectionObserver((data, lazyobserver) => {
            data.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyBackground = entry.target;
                    lazyBackground.classList.remove("lazy-background");
                    lazyobserver.unobserve(lazyBackground);
                }
            })
        });
        
        arr.forEach((v) => {
            intersectionBackground.observe(v);
        })
    }
    else{
        for(var i = 0; i < arr.length; i++){
            var lazyBackground = arr[i];
            lazyBackground.classList.remove("lazy-background");
        }
    }
}

function lazyLoadIframe(){
    const arr = document.querySelectorAll('.lazy-iframe');
    if ('IntersectionObserver' in window) {
        const intersectionIframe = new IntersectionObserver((data, lazyobserver) => {
            data.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyIframe = entry.target;
                    // $(entry.target).empty().html(`<iframe width="100%" height="360" class="lazy-image" src="https://www.youtube.com/embed/`+lazyIframe.dataset.video+`" frameborder="0"
                    // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    // allowfullscreen></iframe>`);
                    $(entry.target).find('iframe').attr('src', "https://www.youtube.com/embed/"+lazyIframe.dataset.video);
                    lazyIframe.classList.remove("lazy-iframe");
                    lazyobserver.unobserve(lazyIframe);
                }
            })
        });
        
        arr.forEach((v) => {
            intersectionIframe.observe(v);
        })
    }
    else{
        for(var i = 0; i < arr.length; i++){
            var lazyIframe = arr[i];
            lazyIframe.classList.remove("lazy-iframe");
        }
    }
}