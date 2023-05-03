import axios from 'axios';

const API_MAIN = 'https://paperpal-qfjdfiwtma-uc.a.run.app';

export default class PaperConsumer {

  static async getPaperInfo(paperID) {
    const response = await axios.post(
      `${API_MAIN}/info`, 
      {
        paperID
      },
      {
        headers: {
          'mode': 'no-cors'
        }
      })
      .catch(error => {
        console.log(error);
      });

    console.log("eee ", response.data)
    return response.data;
  }

}
