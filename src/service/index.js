import axios from "axios";

export const addRequest = async (body) => {
    try {
        await axios.post(
            "https://webhook.site/b5a75925-9895-4bb6-a7cb-52d1a6c9ee67",
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return true;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error for further handling
    }
};
