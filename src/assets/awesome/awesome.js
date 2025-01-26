// 設定 icon
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import 要的 icons */
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'

import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

// import { faInstagram } from '@fortawesome/free-solid-svg-icons'

// import { faSquareFacebook } from '@fortawesome/free-solid-svg-icons'

// import { faLine } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
// library.add( faThumbsUp, faLocationDot, faFaceSmile, faScaleBalanced, faInstagram, faSquareFacebook, faLine )

library.add( faThumbsUp, faLocationDot, faFaceSmile, faScaleBalanced )

export { FontAwesomeIcon }