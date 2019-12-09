import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 3000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})