module.exports = class QuotesApi {
  constructor(backendUrl) {
    this.backendUrl = backendUrl;
  }

  async getQuoteOfTheDay() {
    const response = await fetch(`${this.backendUrl}/quote`);

    if (response.ok) {
      const json = await response.json();
      return json.result;
    }

    throw new Error(
      "Something went wrong. Response status is not OK. Status code: " +
        response.status
    );
  }
};
