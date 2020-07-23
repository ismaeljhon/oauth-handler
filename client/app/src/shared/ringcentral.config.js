export default {
    params: {
        response_type: "code",
        grant_type: "authorization_code",
        redirect_uri: "https://bickertoauthhandler-713530616.development.zohocatalyst.com/app/index.html#/callback",
        zoho_catalyst_function_handler: "https://bickertoauthhandler-713530616.development.zohocatalyst.com/baas/v1/project/6304000000067046/function/6304000000074222/execute"
    },
    forms: [
        { name: 'client_id', label: 'Client ID', type: 'text' },
    ],
    requiredFields: {
        getCode: {
            /** Do not forget to include this */
            oauth_url: "https://platform.ringcentral.com/restapi/oauth/authorize",

            /** 
             * Form field names that are needed for the request of [code] authorization 
             * Make sure you include it on the forms
            */
            formFieldsAllowed: ['client_id'],

            /** Params needed for getting [code] for authorization */
            params: ['client_id', 'redirect_uri', 'response_type']
        },
        getAuthorization: {
            /** Do not forget to include this */
            oauth_url: "https://platform.ringcentral.com/restapi/oauth/token",

            /** 
             * Form field names that are needed for the request of [refresh_token] authorization 
             * Make sure you include it on the forms
            */
            formFieldsAllowed: ['client_id'],

            /** Params needed for getting [refresh_token] for authorization */
            params: ['client_id', 'code', 'grant_type', 'redirect_uri'],
        },

        /** Additional Response to be displayed and can be download by the user */
        responseAdditionalData: ['client_id', 'grant_type']
    },
}