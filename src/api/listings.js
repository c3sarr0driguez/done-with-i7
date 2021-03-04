import client from "./client";

const ENDPOINT = "/listings";

function getListings() {
    return client.get(ENDPOINT);
}

function postListing(listing, onUploadProgress) {
    const formData = new FormData();
    formData.append("price", listing.price);
    formData.append("title", listing.title);
    formData.append("description", listing.description);
    formData.append("categoryId", listing.category?.value);
    listing.images.forEach((image, index) => {
        formData.append("images", {
            name: `${image}-${index}`,
            type: "image/jpeg",
            uri: image
        });
    });
    if(listing.location) {
        formData.append("location", JSON.stringify(listing.location));
    }
    const config = { onUploadProgress };

    return client.post(ENDPOINT, formData, config);
}

export default { getListings, postListing };
