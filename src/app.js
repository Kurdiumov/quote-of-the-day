import "./styles.less";

const quotesApiAuthToken = "84c7c5e25e9d0587424610e1745dea3321ffdcde";

const getQuoteOfTheDay = async (token) => {
  const response = await fetch(
    "https://api.paperquotes.com/apiv1/qod/?lang=en",
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(
    "Something went wrong. Response status is not OK. Status code: " +
      response.status
  );
};

getQuoteOfTheDay(quotesApiAuthToken).then(
  ({ quote, author }) => {
    document.getElementById("quote").innerText = quote;
    document.getElementById("author").innerText = author ?? "Unknown author";
  },
  (err) => {
    console.error("Unable to fetch data from external quotes API:", err);
  }
);
