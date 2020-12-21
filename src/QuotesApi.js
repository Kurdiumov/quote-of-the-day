module.exports = class QuotesApi {
  constructor() {
    this.token = "84c7c5e25e9d0587424610e1745dea3321ffdcde";
  }

  async getQuoteOfTheDay() {
    const response = await fetch(
      "https://api.paperquotes.com/apiv1/qod/?lang=en",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${this.token}`
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
  }
};
