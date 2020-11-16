// hoist, closure
// const setTimeout = window.setTimeout;
// 객체 구조 분해 할당(Destructring)
const { setTimeout, clearTimeout } = window

// ES6+ 모던 자바스크립트에서는 var 쓰지 않고, let 변수 사용
let wallpapers = [
  'v1598872050/ixylk0psxr8zjasxqce6',
  'v1598871763/p8gblpumiwypzg1yzrnx',
  'v1599214078/yz7ovukznj2qqlau1vmp',
  'v1598871708/tgqu1cbnjmkoah2mnmkb',
  'v1598871678/tdedx3m1riyandczb8j5',
  'v1598871674/x8t4ye47c7gzanwdwgrv',
  'v1598871759/hz6kswq4f5wzioux3tyf',
  'v1598871647/cdljrxuxce5usqkz10zg',
  'v1598871911/oiea6ibwgtjvribxsrfr',
  'v1598871981/ikuzi8gjmcre1yimccr0',
  'v1598871916/xuoywo76biw3zxpiimcm',
  'v1598871741/hvdbxowg6yqjhvtkdtl3',
  'v1598871732/f2k4xrsjwytwuaqhuhls',
  'v1600078664/vjc3uabufnijpbpyn9ib',
  'v1601293397/ginhyqun9ku7so3begbs',
  'v1603872867/aaaadxhssdqrpvnebmjp',
  'v1598871780/kre1o4asdmo4jpa5tnfj',
  'v1598871803/jtwr2mypjgdsccxgbn2r',
  'v1598871820/z2xowvbdbohb1wqh27g4',
  'v1598871763/p8gblpumiwypzg1yzrnx',
  'v1598871736/oyv81viqlrh05si2racx',
  'v1598871704/tgbircgpt6nj70vj7row',
  'v1598871884/x2sravrbbjtxhriqj7lm',
  'v1598872028/j0wdpxdlce3r5tvuyuhf',
  'v1598871746/dzfdd9i1gpts69cgnwnz',
  'v1598871687/p7pyhekzmgb3sscwj8y7',
  'v1598872039/pnhda368bammgzxqd79x',
  'v1598871816/rcvsdpkdfy3ag0ve6zew',
  'v1601293376/s9eqagr1ibpy78cnhzf8',
  'v1598871838/qtuxer7m0mma1k9dykgf',
  'v1598871944/vhwqvkxuws65y1ktflxy',
  'v1604920644/ikfaibutr1ija8tttcle',
  'v1603708966/cmiozflbxxrh1jiekdrv',
  'v1598871718/evzrvkday70p28whsyeg',
  'v1598871722/h7wz9zlsrnx6uk4ccr6d',
  'v1598871713/y2imdocqg0qlo2xlo8c7',
  'v1598871656/r4bpqotyaz98ckgvgepx',
  'v1598871692/cxhwmadpo4o9yeiribge',
  'v1598872002/lbh8tismjjhto8fhmixx',
  'v1598871772/buymmshxvklvpxdnw968',
  'v1598872045/yejizhji2kl6v6vq7im5',
]

// 화살표(Arrow) 함수 () => {}
// 템플릿 리터럴 (보간법, interporation, ${}), `문자 ${between} 값`
const WATCHA_ADDRESS =
  'https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/'

// 배열 객체 소유한 능력 : map, filter, find, findIndex, reduce
// 배열 원본을 파괴하는 메서드 : push, pop, shift, unshift, splice
wallpapers = wallpapers.map((path) => `${WATCHA_ADDRESS}${path}`)

const DISPLAY_WALLPAPER_COUNT = 6

const CLASSES = {
  appHeader: 'appHeader',
  appNavigationButton: {
    normal: 'appNavigation__button',
    active: 'appNavigation__button--active',
    goToSection: 'button--goToSection',
    next: 'button--next',
    first: 'button--first',
  },
  featureSection: 'featureSection',
  dialog: {
    self: 'dialog',
    button: 'button__privacyPolicy',
    closeButton: 'dialog__button',
    dim: 'dialog__dim',
    selfShow: 'dialog--show',
    dimShow: 'dialog__dim--show',
  },
}

const SHOW_TIMEOUT = 500
const SCROLL_TIMEOUT = 1000

shuffle(wallpapers)
  .filter((wallpaper, index) => index < DISPLAY_WALLPAPER_COUNT)
  .forEach((imagePath, index) => {
    // 템플릿 리터럴
    const selector = `.${
      CLASSES.featureSection
    }:nth-of-type(${++index})::before`

    // '.' + CLASSES.featureSection + ':nth-of-type(' + ++index + ')::before'

    insertStyleRules(selector, {
      // 'background-image': 'url(' + imagePath + '.jpg)',
      'background-image': `url(${imagePath}.jpg)`,
    })

    window.setTimeout(
      () => insertStyleRules(selector, { opacity: 1 }),
      SHOW_TIMEOUT
    )
  })

var featureSections = document.querySelectorAll('.' + CLASSES.featureSection)

var handleGoToSectionWrapper = function (index) {
  return function () {
    var targetIndex = 0

    if (this.className.includes(CLASSES.appNavigationButton.normal)) {
      targetIndex = index
      goToSection(targetIndex, true)
    } else {
      var isGoToFirst = this.classList.contains(
        CLASSES.appNavigationButton.first
      )

      targetIndex = !isGoToFirst ? index + 1 : 0

      !isGoToFirst ? goToSection(targetIndex) : goToSection(targetIndex, true)
    }
  }
}

var goToSection = function (index, usingAppNavigation) {
  var targetSection = featureSections[index]

  targetSection.scrollIntoView({
    behavior: 'smooth',
  })

  activeAppNavButton(index)

  if (usingAppNavigation) {
    if (goToSection.timeoutId) {
      window.clearTimeout(goToSection.timeoutId)
    }

    goToSection.timeoutId = window.setTimeout(function () {
      targetSection.focus()
    }, SCROLL_TIMEOUT)
  }
}

goToSection.timeoutId = null

featureSections.forEach(function (section) {
  section.setAttribute('tabindex', -1)
})

makeArray(featureSections).forEach(function (section, index) {
  var buttonGoToSection = section.querySelector(
    '.' + CLASSES.appNavigationButton.goToSection
  )

  buttonGoToSection.addEventListener('click', handleGoToSectionWrapper(index))
})

var appNavButtons = document.querySelectorAll(
  '.' + CLASSES.appNavigationButton.normal
)

var activeAppNavButton = function (index) {
  var activeClassName = CLASSES.appNavigationButton.active

  var activeNavButton = appNavButtons[index]

  var preActiveButton = makeArray(appNavButtons).find(function (button) {
    return button.classList.contains(activeClassName)
  })

  if (!activeNavButton.isEqualNode(preActiveButton)) {
    preActiveButton.classList.remove(activeClassName)
  }

  activeNavButton.classList.add(activeClassName)
}

makeArray(appNavButtons).forEach(function (button, index) {
  button.addEventListener('click', handleGoToSectionWrapper(index))
})

var prevScrollYposition = 0

var activeIndex = 0

var clearTimeoutId = null

var isInActiveSectionArea = function (section) {
  var rect = section.getBoundingClientRect()

  var top = rect.top

  var halfHeight = rect.height / 2

  return top > -halfHeight && top <= halfHeight
}

var findIndexOfActiveSectionArea = function () {
  var findedIndex = makeArray(featureSections).findIndex(function (section) {
    return isInActiveSectionArea(section)
  })

  return findedIndex
}

var showAppHeader = function () {
  appHeader.style.transform = 'translate(-50%, 0)'
}

var hideAppHeader = function () {
  appHeader.style.transform = 'translate(-50%, -100%)'
}

var appHeader = document.querySelector('.' + CLASSES.appHeader)

window.addEventListener('scroll', function () {
  var currentScrollYposition = window.scrollY

  if (
    prevScrollYposition > currentScrollYposition ||
    prevScrollYposition === 0
  ) {
    showAppHeader()
  }

  if (prevScrollYposition <= currentScrollYposition) {
    hideAppHeader()
  }

  activeIndex = findIndexOfActiveSectionArea()

  activeAppNavButton(activeIndex)

  if (clearTimeoutId) {
    window.clearTimeout(clearTimeoutId)
  }

  clearTimeoutId = window.setTimeout(function () {
    goToSection(activeIndex)
  }, 1000)

  prevScrollYposition = currentScrollYposition
})

var buttonPrivacyPolicy = document.querySelector('.' + CLASSES.dialog.button)
var dialog = document.querySelector('.' + CLASSES.dialog.self)
var buttonDialog = dialog.querySelector('.' + CLASSES.dialog.closeButton)
var dialogDim = document.querySelector('.' + CLASSES.dialog.dim)

var handleShowDialog = function () {
  dialog.classList.add(CLASSES.dialog.selfShow)
  dialogDim.classList.add(CLASSES.dialog.dimShow)
  dialog.focus()
}

var handleHideDialog = function () {
  dialog.classList.remove(CLASSES.dialog.selfShow)
  dialogDim.classList.remove(CLASSES.dialog.dimShow)
  buttonPrivacyPolicy.focus()
}

dialog.setAttribute('tabindex', -1)

buttonPrivacyPolicy.addEventListener('click', handleShowDialog)
buttonDialog.addEventListener('click', handleHideDialog)

window.addEventListener('keyup', function (e) {
  var key = Number(e.key)
  if (e.ctrlKey && typeof key === 'number') {
    var keyIndex = key - 1
    if (keyIndex < featureSections.length) {
      goToSection(keyIndex)
    }
  }
})
