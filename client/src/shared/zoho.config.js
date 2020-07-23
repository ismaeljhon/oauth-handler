export default {
    params: {
        access_type: "offline",
        scope: "ZohoProjects.portals.READ,ZohoProjects.projects.ALL,ZohoProjects.activities.READ,ZohoProjects.status.READ,ZohoProjects.status.CREATE,ZohoProjects.milestones.ALL,ZohoProjects.tasklists.ALL,ZohoProjects.tasks.ALL,ZohoProjects.timesheets.ALL,ZohoProjects.bugs.ALL,ZohoProjects.events.ALL,ZohoProjects.forums.ALL,ZohoProjects.users.ALL,ZohoProjects.search.READ,ZohoProjects.clients.ALL,ZohoProjects.documents.ALL,ZohoPC.files.ALL,ZohoBugtracker.portals.READ,ZohoBugtracker.projects.ALL,ZohoBugtracker.milestones.ALL,ZohoBugtracker.timesheets.ALL,ZohoBugtracker.bugs.ALL,ZohoBugtracker.events.ALL,ZohoBugtracker.forums.ALL,ZohoBugtracker.users.ALL,ZohoBugtracker.search.READ,ZohoBugtracker.documents.ALL",
        response_type: "code",
        prompt: "consent",
        grant_type: "authorization_code",
        redirect_uri: "https://bickertoauthhandler-713530616.development.zohocatalyst.com/app/index.html#/callback",
        zoho_catalyst_function_handler: "https://bickertoauthhandler-713530616.development.zohocatalyst.com/baas/v1/project/6304000000067046/function/6304000000074222/execute"
    },
    forms: [
        { name: 'client_id', label: 'Client ID', type: 'text' },
        { name: 'client_secret', label: 'Client Secret', type: 'password' },
    ],
    requiredFields: {
        getCode: {
            /** Do not forget to include this */
            oauth_url: "https://accounts.zoho.com/oauth/v2/auth",

            /** 
             * Form field names that are needed for the request of [code] authorization 
             * Make sure you include it on the forms
            */
            formFieldsAllowed: ['client_id'],

            /** Params needed for getting [code] for authorization */
            params: ['access_type', 'client_id', 'prompt', 'redirect_uri', 'response_type', 'scope']
        },
        getAuthorization: {
            /** Do not forget to include this */
            oauth_url: "https://accounts.zoho.com/oauth/v2/token",

            /** 
             * Form field names that are needed for the request of [refresh_token] authorization 
             * Make sure you include it on the forms
            */
            formFieldsAllowed: ['client_id', 'client_secret'],

            /** Params needed for getting [refresh_token] for authorization */
            params: ['client_id', 'client_secret', 'code', 'grant_type', 'redirect_uri'],
        },

        /** Additional Response to be displayed and can be download by the user */
        responseAdditionalData: ['client_id', 'client_secret']
    },
}