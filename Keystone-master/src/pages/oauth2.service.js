import axios from 'axios';

const oauth2Service = {
    authenticate: async (provider, code) => {
        const clientId = '788455509519-qc4526aot6rlfooho4quoc3olgp5q1s8.apps.googleusercontent.com';
        const clientSecret = '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';
        const tokenEndpoint = 'https://oauth2.googleapis.com/token';
        const tokenUrl = `${tokenEndpoint}?grant_type=authorization_code&code=${code}&redirect_uri=${window.location.href}&client_id=${clientId}&client_secret=${clientSecret}`;

        const response = await axios.post(tokenUrl);
        const token = response.data.access_token;

        return token;
    },

    fetchUserData: async (token) => {
        const userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo'; // Google user info endpoint
        const response = await axios.get(userInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return user data
    },
};

export default oauth2Service;
