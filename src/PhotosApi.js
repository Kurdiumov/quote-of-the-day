module.exports = class PhotosApi {
  constructor(backendUrl) {
    this.backendUrl = backendUrl;
  }

  async getPhotoUrl(width = 1024, height = 768) {
    const response = await fetch(
      `${this.backendUrl}/imageUrl?width=${width}&height=${height}`
    );

    if (response.ok) {
      const json = await response.json();
      console.log(json.urls);
      return json.imageUrl;
    }

    throw new Error(
      "Something went wrong. Response status is not OK. Status code: " +
        response.status
    );
  }
};
