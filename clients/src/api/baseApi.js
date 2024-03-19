const ENDPOINT = "https://dev-brand.api.vaultik.com/";

export const apiGet = async (subUrl, params) => {
    const result = await fetch(
        ENDPOINT + subUrl, // https://dev-brand.api.vaultik.com/product?pubKey=75cfc28c-e623-4cc4-a8bb-b6a27724aa3a
        {
            method: "GET",
            headers: {},
        }
    );

    return await result.json();
};

export const apiPost = async (subUrl, bodyParams) => {

};