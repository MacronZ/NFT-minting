import crypto from 'crypto';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { userDB } from '../database';
import { CodeError } from '../helpers';

export const generateAutoLoginUrl = async (req, res) => {
  const hashRequest = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

  const request = {
    type: 'autologin',
    username: req.body.userData.uuid,
    language: req.body.userData.language,
    projectId: req.body.userData.entity === 'fsa' ? process.env.NP_INT_ID : process.env.NP_EU_ID,
    timeStamp: Math.floor(Date.now() / 1000),
    key: req.body.userData.entity === 'fsa' ? process.env.NP_INT_KEY : process.env.NP_EU_KEY,
  };

  const npIntUrl = process.env.NP_INT_URL;
  const { theme } = req.body.userData;
  const themeParam = theme === 'dark' ? 'dark' : 'light';

  const hash = hashRequest(`request=${request.type}&username=${request.username}&project_id=${request.projectId}&timestamp=${request.timeStamp}&${request.key}`);

  if (req.body.userData.entity === 'fsa') {
    const generatedUrl = request.language
      ? `${npIntUrl}/${request.language}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}&mode=${themeParam}`
      : `${npIntUrl}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}&mode=${themeParam}`;
    res.status(200).send(generatedUrl);
  } else if (req.body.userData.entity === 'cysec') {
    const generatedUrl = request.language ? `${process.env.NP_EU_URL}/${request.language}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}` : `${process.env.NP_EU_URL}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}`;
    res.status(200).send(generatedUrl);
  } else {
    const generatedUrl = request.language
      ? `${npIntUrl}/${request.language}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}&mode=${themeParam}`
      : `${npIntUrl}/autologin?username=${request.username}&timestamp=${request.timeStamp}&hash=${hash}&mode=${themeParam}`;
    res.status(200).send(generatedUrl);
  }
};

export const getUserDetails = async (req, res) => {
  const { uuid, entity } = req.query;

  const hashRequest = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');
  let userData;
  try {
    userData = await userDB.getUser({ uuid });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const APIUrl = entity === 'fsa' ? process.env.NP_INT_ADMIN_URL : process.env.NP_EU_ADMIN_URL;
  const request = {
    type: 'getaffdetails',
    aff_refid: userData.nullPointId,
    projectId: entity === 'fsa' ? process.env.NP_INT_ID : process.env.NP_EU_ID,
    timeStamp: Math.floor(Date.now() / 1000),
    key: entity === 'fsa' ? process.env.NP_INT_GEN_KEY : process.env.NP_EU_GEN_KEY,
  };

  const hash = hashRequest(`request=${request.type}&aff_refid=${request.aff_refid}&project_id=${request.projectId}&timestamp=${request.timeStamp}&${request.key}`);

  const axiosDefaultConfig = {
    baseURL: APIUrl,
    proxy: false as const,
    httpsAgent: process.env.ENVIRONMENT === 'online' ? new HttpsProxyAgent(process.env.FIXIE_URL!) : null,
  };

  const axiosInstance = axios.create(axiosDefaultConfig);

  try {
    const response = await axiosInstance.post(`/api/${request.type}`, null, {
      params: {
        request: request.type,
        aff_refid: request.aff_refid,
        project_id: request.projectId,
        timestamp: request.timeStamp,
        hash,
      },
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send(error.response);
  }
};

export const checkMasterStatus = async (parentIB, entity) => {
  const hashRequest = (x) => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

  const APIUrl = entity === 'fsa'
    ? process.env.NP_INT_ADMIN_URL
    : process.env.NP_EU_ADMIN_URL;

  const request = {
    type: 'getaffdetails',
    aff_refid: parentIB,
    projectId: entity === 'fsa' ? process.env.NP_INT_ID : process.env.NP_EU_ID,
    timeStamp: Math.floor(Date.now() / 1000),
    key:
      entity === 'fsa' ? process.env.NP_INT_GEN_KEY : process.env.NP_EU_GEN_KEY,
  };

  const hash = hashRequest(
    `request=${request.type}&aff_refid=${request.aff_refid}&project_id=${request.projectId}&timestamp=${request.timeStamp}&${request.key}`,
  );

  const axiosDefaultConfig = {
    baseURL: APIUrl,
    proxy: false as const,
    httpsAgent:
      process.env.ENVIRONMENT === 'online'
        ? new HttpsProxyAgent(process.env.FIXIE_URL!)
        : null,
  };

  const axiosInstance = axios.create(axiosDefaultConfig);

  try {
    const response = await axiosInstance.post(`/api/${request.type}`, null, {
      params: {
        request: request.type,
        aff_refid: request.aff_refid,
        project_id: request.projectId,
        timestamp: request.timeStamp,
        hash,
      },
    });
    const responseData: any = response.data;
    const userData: any = responseData.data;

    if (!userData.aff_data || userData.aff_data[0].master_ib === '0') {
      throw new CodeError('Parent IB id is invalid', 405);
    }
  } catch (error) {
    throw new CodeError(error.message, error.code);
  }
};
