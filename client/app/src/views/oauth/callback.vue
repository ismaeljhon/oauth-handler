<template>
    <div>
        <v-card v-if="data">
            <v-card-title>Authorization 2.0 Response</v-card-title>
            <v-card-text>
                <div v-for="(item, index) in data" :key="index">
                    <v-text-field :label="beautifyStr(index)" readonly :id="index" :value="item" append-icon="file_copy" @click:append="copyToClipboard(index)">
                    </v-text-field>
                </div>
            </v-card-text>
           <v-card-actions class="pb-5">
                <v-btn color="primary" @click.prevent="download"><v-icon class="mr-1">mdi-download</v-icon> Download</v-btn>
           </v-card-actions>
        </v-card>
        <div v-else class="mt-10 mx-auto text-center" style="max-width: 500px">
            <div class="mb-5">Generating refresh token please wait...</div>
            <v-progress-linear
                color="info"
                indeterminate
                rounded
                height="6"
            ></v-progress-linear>
            <small>Please don't refresh or go to another page</small>
        </div>

        <v-snackbar v-model="snackbar" :timeout="1000" top color="success">
            Code copied successfully
            <template v-slot:action="{ attrs }">
                <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

import Utils from '@/mixins/Utils'
import _merge from 'lodash/merge'
import _assign from 'lodash/assign'
import axios from 'axios'

export default {
    name: 'callback',
    mixins: [Utils],
    data() {
        return {
            form: {},
            config: {},
            data: null,
            snackbar: false
        }
    },
    methods: {
        async init() {
            return new Promise(async (resolve, reject) => {
                let paramsNeeded = localStorage.getItem('paramsNeeded')
                paramsNeeded = paramsNeeded ? JSON.parse(paramsNeeded) : ""
                
                if (!paramsNeeded.type)
                    return reject("No Required Params Saved")

                let config = await import('@/shared/' + paramsNeeded.type + '.config.js')
                this.config = config.default

                let getAuthorizationConfig = this.config.requiredFields.getAuthorization

                let formFieldsAllowedObjects = this.getParams(paramsNeeded, getAuthorizationConfig.formFieldsAllowed)
                let getAuthorizationParams = this.getParams(this.config.params, getAuthorizationConfig.params)
                
                this.form = _merge(this.form, formFieldsAllowedObjects, getAuthorizationParams)
                
                return resolve("Resolved")
            })
        },
        getRefreshToken() {
            let oauthHandlerFunctionUrl = this.config.params.zoho_catalyst_function_handler

            _assign(this.form, {
                oauth_url: this.config.requiredFields.getAuthorization.oauth_url,
                params: this.config.requiredFields.getAuthorization.params
            })

            return axios.post(oauthHandlerFunctionUrl, { oauthForm: this.form }).then(response => {
                let data = response.data.output || {}

                let paramsNeeded = localStorage.getItem('paramsNeeded') || {}
                paramsNeeded = JSON.parse(paramsNeeded)
                let additionalData = this.getParams(paramsNeeded, this.config.requiredFields.responseAdditionalData)
                this.data = _assign(JSON.parse(data), additionalData)

                localStorage.paramsNeeded = ""
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        download() {
            if (!this.data) 
                return;
            
            const data = JSON.stringify(this.data)
            const blob = new Blob([data], {type: 'text/plain'})
            const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
            a.download = "response.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        },
        copyToClipboard(targetElement) {
            /* Get the text field */
            var copyText = document.getElementById(targetElement);

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            this.snackbar = true
        }
    },
    async mounted() {
        this.form.code = this.$route.query.code
        await this.init()
        await this.getRefreshToken()
    }
}
</script>