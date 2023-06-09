import axios from 'axios';

const API_MAIN = 'https://paperpal-qfjdfiwtma-uc.a.run.app';

export default class PaperConsumer {
  static async getPaperInfo(paperID) {
    const response = await axios.post(`${API_MAIN}/info`, paperID);
    return response.data;
  }

  static async getRecommendations(paperIDArray) {
    // default value for paperIDArray
    if (paperIDArray === undefined) {
      paperIDArray = [1372243, 346340, 1532153, 1532153, 146375];
    }
    
    let data = JSON.stringify({
      "my_list": paperIDArray
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_MAIN}/recommendations/v2`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    const response = await axios.request(config);
    return response.data;

  }
  static async getInsights(paperIDArray, queryPaperID) {
    // default value for paperIDArray
    if (paperIDArray === undefined) {
      paperIDArray = [1372243, 346340, 1532153, 1532153, 146375];
    }
    if (queryPaperID === undefined) {
      queryPaperID = 636792;
    }

    let data = JSON.stringify({
      "my_list": paperIDArray,
      "query_paper": queryPaperID
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_MAIN}/insights`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    return response.data;
  }

  static async setSessionData(sessionID, sessionData) {
    let data = JSON.stringify({
      "session_data": sessionData
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_MAIN}/set_session_data/${sessionID}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    return response.data;
  }

  static async getSessionData(sessionID) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_MAIN}/get_session_data/${sessionID}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.request(config);
    return response.data;
  }
}
