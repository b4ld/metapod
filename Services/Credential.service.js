const axios = require("axios");
const configsCloud = require("./../config/serverConfigs").serverConfigurations;

class CloudService {

  async checkCredentialExposure(provider) {
    console.log(provider)

    let dataFromArray = []
    const mainProvider = configsCloud.filter((prov) => prov.info.provider === provider)
    const selectedProvider = mainProvider[0]
    const subPathKeys = Object.keys(selectedProvider.subpath)

    async function getCredentialsAws() {
      try {
        let response = await axios.get(selectedProvider.info.mainURL + selectedProvider.subpath.workername).catch(err => console.log(err.code));
        let creds = await axios.get(selectedProvider.info.mainURL + selectedProvider.subpath.workername + response.data).catch(err => console.log(err.code));

        if (JSON.stringify(creds.data).includes("KEY")) {
          return true
        }
        return false;
      } catch (error) {
        console.error(error);
        return false
      }
    }

    switch (provider) {
      case "aws":
        return getCredentialsAws()
      case "default":
        return getCredentialsAws()

      default:
        return false
    }

  }
}

module.exports = new CloudService();
