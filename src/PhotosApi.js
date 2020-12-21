module.exports = class PhotosApi {
  constructor() {
    this.token = "VrmgRB9hqEOS7JDFp8egcMmwwHyFNDoJbUSVGDh17r0";
    this.collections = "804449,1242150,9545968";
  }

  async getPhotoUrl(width = 1024, height = 768) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?collections=${this.collections}&client_id=${this.token}&w=${width}&h=${height}`
    );

    if (response.ok) {
      const json = await response.json();
      console.log(json.urls);
      return json.urls.custom;
    }

    throw new Error(
      "Something went wrong. Response status is not OK. Status code: " +
        response.status
    );
  }
};
