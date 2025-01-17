import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import axios from 'axios';
import { generate_headers } from "@/helpers/hmacAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getToken({ req })

  // if (!session) {
  //   return res.status(401).json({ message: 'Unauthorized' })
  // }

  if (req.method == 'GET') {
    const method = 'GET';
    const baseUrl = process.env.MEKARI_BASEURL;
    const path = process.env.MEKARI_HMAC_VALIDATION;
    const queryParam = '';
    const headers = {
    'X-Idempotency-Key': '1234'
    };
    const body = {};

    return res.status(200).json({data: generate_headers("POST", "/v2/esign-hmac/v1/documents/request_global_sign" + queryParam)});

    const options = {
    method: method,
    url: `${baseUrl}${path}${queryParam}`,
    headers: {...generate_headers(method, path + queryParam), ...headers},
    body: body
    }

    // Initiate request
    axios(options)
    .then(function (response) {
        console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return res.status(403).json(error.response);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return res.status(400).json(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        }
    });
  }
}
