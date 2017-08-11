//Vue 2.0 以上可以使用
Touch.install = function(Vue, options) {
  Vue.directive('touch', {
    bind(el, binding, vnode){
      binding.expression
        let startX = 0
        let startY = 0
        let t =this
        let GetSlideAngle = (dx, dy) => {
          return Math.atan2(dy, dx) * 180 / Math.PI;
        }
        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        let GetSlideDirection = (startX, startY, endX, endY) => {
          let dy = startY - endY
          let dx = endX - startX
          let result = 0

          //如果滑动距离太短
          if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
              return result;
          }

          let angle = GetSlideAngle(dx, dy)
          if (angle >= -45 && angle < 45) {
              result = 'swiperight'
          } else if (angle >= 45 && angle < 135) {
              result = 'swipeup'
          } else if (angle >= -135 && angle < -45) {
              result = 'swipedown'
          }
          else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
              result = 'swipeleft'
          }
          return result;
        }
        el.addEventListener('touchstart',(ev) => {
          startX = ev.touches[0].pageX
          startY = ev.touches[0].pageY
        }, false)
        el.addEventListener('touchend',(ev) => {
          let endX = ev.changedTouches[0].pageX
          let endY = ev.changedTouches[0].pageY
          let direction = GetSlideDirection(startX, startY, endX, endY)
          binding.expression ? vnode.context[binding.expression](direction) : ''
        }, false)
    }
  })
}

export default {
  Touch
}
