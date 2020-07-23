<template>
    <div class="mt-5">
        <v-alert icon="file_copy" type="info" outlined text>
            Don't forget to include this <strong style="text-decoration: underline">{{ redirectUri }}</strong> on your redirect uri or authorized url upon creating your app
        </v-alert>
        <v-card class="mt-5">
            <v-card-title>OAuth 2.0 Authorization</v-card-title>
            <v-card-text v-if="config">
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(submit)">
                        <div v-for="(field, index) in config.forms" :key="index">
                            <ValidationProvider v-slot="{ errors }" :name="field.label" rules="required">
                                <v-text-field
                                    v-model="form[field.name]"
                                    :error-messages="errors"
                                    :label="field.label"
                                    :type="field.type"
                                ></v-text-field>
                            </ValidationProvider>
                        </div>
                        <div class="mt-10">
                            <v-btn @click.prevent="back" class="mr-3"><v-icon class="mr-1">mdi-arrow-left</v-icon>back</v-btn>
                            <v-btn type="submit" color="primary"><v-icon class="mr-1">mdi-check</v-icon>submit</v-btn>
                        </div>
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
    </div>
    
</template>
<script>
/**
 * Kindly specify url parameter config type (type)
 * e.g type=zoho
 */

import _merge from 'lodash/merge'
import Utils from '@/mixins/Utils'

export default {
    name: 'authorize',
    mixins: [Utils],
    data() {
        return {
            form: {
                type: null,
            },
            config: null,
        }
    },
    methods: {
        submit() {
            let queryString = require("querystring")
            let getCodeConfig = this.config.requiredFields.getCode

            let codeParams = this.getParams(this.config.params, getCodeConfig.params)
            
            localStorage.paramsNeeded = JSON.stringify(this.form)

            let formFieldsAllowed = this.getParams(this.form, getCodeConfig.formFieldsAllowed)
            codeParams = _merge(codeParams, formFieldsAllowed)

            location.href = getCodeConfig.oauth_url + "?" + queryString.stringify(codeParams)
        },
        back() {
            this.$refs.observer.reset()
            this.$router.push({ path: '/' })
        }
    },
    async mounted() {
        this.form.type = this.$route.query.type || "zoho"
        let config = await import('@/shared/' + this.form.type + '.config.js')

        this.config = config.default
    },
    computed: {
        redirectUri() {
            return this.config && this.config.params && this.config.params.redirect_uri ? this.config.params.redirect_uri : null
        }
    }
}
</script>