import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2000,
  actions: [{ icon: 'close', color: 'white' }],
  classes: 'piggy_notify'
})