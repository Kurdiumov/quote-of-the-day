import "./styles.less";
import mountains from "../images/mountains.jpg";
import PhotosApi from "./PhotosApi";
import QuotesApi from "./QuotesApi";

new QuotesApi().getQuoteOfTheDay().then(
  ({ quote, author }) => {
    document.getElementById("quote").innerText = quote;
    document.getElementById("author").innerText = author ?? "Unknown author";
  },
  (err) => {
    console.error("Unable to fetch data from external quotes API:", err);
  }
);

const getRandomOrDefaultPhotoUrl = async () => {
  try {
    return await new PhotosApi().getPhotoUrl(
      window.innerWidth,
      window.innerHeight
    );
  } catch (err) {
    return Promise.resolve(mountains);
  }
};

getRandomOrDefaultPhotoUrl().then((url) => {
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
});
