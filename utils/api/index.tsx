import axios from 'axios';

const apiEndpoint = process.env.NEXT_API_END_POINT

const config = {
    url: `${apiEndpoint}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
    },
};


// // Post API
// export function postApi(data) {
//     return axios({
//         ...config,
//         method: 'post',
//         data: data
//     })
//         .then(function (response) {
//             return response.status === 200;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

