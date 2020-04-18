const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;

class CloudService {

  constructor() {
    this.httpClient = axios.create();
    // this.httpClient.defaults.timeout = 1000;
  }

  async getCloudProvider() {

    let promiseArray = []

    configsCloud.forEach(element => {
      console.log(" -- MAIN-URL -- " + element.info.mainURL)
      if (element.info.mainURL === "http://169.254.169.254/metadata/instance?api-version=2017-08-01") {
        promiseArray.push(this.httpClient.get(element.info.mainURL,{ timeout: 200, headers: {'Metadata': 'true'} }).catch(err => console.log(err.message)))
      }else{
        promiseArray.push(this.httpClient.get(element.info.mainURL,{ timeout: 200 }).catch(err => console.log(err.message)))
      }
    });

    const resultData = await axios.all(promiseArray)

    for (let index = 0; index < resultData.length; index++) {
      if (resultData[index]) {
        let vendorCloudConfig = configsCloud.filter(obj => (obj.info.mainURL == resultData[index].config.url))
        return vendorCloudConfig[0].info.provider
      }
    }
    return "default"
  }
}

module.exports = new CloudService();