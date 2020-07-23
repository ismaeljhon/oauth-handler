import _forEach from 'lodash/forEach'
import _replace from 'lodash/replace'
import _capitalize from 'lodash/capitalize'

export default {
    methods: {
        getParams(targetParams, requiredFields) {
            let params = {}
            
            _forEach(requiredFields, o => {
                params[o] = targetParams[o]
            })

            return params
        },
        beautifyStr(str) {
            return _capitalize(_replace(str, '_', ' '))
        }
    }
}