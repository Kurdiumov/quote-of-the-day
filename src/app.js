import "./styles.less";
import PhotosApi from "./PhotosApi";
import QuotesApi from "./QuotesApi";

const quotesApi = new QuotesApi();
const photosApi = new PhotosApi();

quotesApi.getQuoteOfTheDay().then(
  ({ quote, author }) => {
    document.getElementById("quote").innerText = quote;
    document.getElementById("author").innerText = author ?? "Unknown author";
  },
  (err) => {
    console.error("Unable to fetch data from external quotes API:", err);
  }
);

photosApi.getPhotoUrl(window.innerWidth, window.innerHeight).then(
  (url) => {
    const img = new Image();
    img.src = url;

    const int = setInterval(function () {
      if (img.complete) {
        clearInterval(int);

        const bgElement = document.getElementById("bg");
        bgElement.style.backgroundImage = `url(${url})`;
        bgElement.style.animation = "fadein 5s";
        bgElement.style.animationFillMode = "forwards";
      }
    }, 50);
  },
  (err) => {
    console.error("Unable to fetch data from external photos API:", err);
  }
);
