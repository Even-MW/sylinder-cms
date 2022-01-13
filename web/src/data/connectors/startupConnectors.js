import { userActions, userSetup } from "@ng-mw/shared-react-components/user"

import { core } from "@ng-mw/shared-react-components/framework"

const startupConnectors = async (store, { chainId, environment, userToken, apikey }) => {
    // turn off all logging from framework
    core.LoggerConfig.turnOffAllFrameworkLoggers()

    // set up framework
    core.setup({
        chainId,
        environment,
        apikey
    })

    // register listeners for all user-messages
    userSetup(store)

    // if token, then log in, and load base data
    if (userToken) {
        await userActions.setToken(userToken)
    }
}

export default startupConnectors