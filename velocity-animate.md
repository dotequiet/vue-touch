//velocity一个类似jq animation的动画库也是Vue.官网推荐使用的动画库官网地址：http://velocityjs.org

        import Velocity from 'velocity-animate'
        Velocity(el,Attributes,fn)
        //Simple Demo
        Velocity(document.getElementById('a'), {opacity: 1}, {
                duration: 1000,//时间
                loop: true， //循环
              })
      
