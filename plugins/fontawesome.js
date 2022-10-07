import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab, faTwitter, faGithub, faItchIo } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

// library.add(fas)
library.add(fab)
library.add(faTwitter)
library.add(faGithub)
library.add(faItchIo)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})