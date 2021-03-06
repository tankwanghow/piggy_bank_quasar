import { i18n } from 'boot/i18n'

export default {
  methods: {
    isValid(field_name) {
      if (this.form.error[field_name]) {
        return false
      } else {
        return true
      }
    },
    errorMsg(field_name) {
      var errField = this.form.error[field_name] 
      if (errField) {
        return i18n.t('field_errors.' + this.underscore(errField[0]))
      }
      else {
        return ''
      }
    },
   underscore(str) {
      return str.replace(/[^\wèéòàùì\s]/gi, '').replace(/\s/g, '_').toLowerCase()
    }
  },
  data() {
    return {
      form: {
        error: {}
      }
    }
  }
}