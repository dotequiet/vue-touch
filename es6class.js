// class 类
const _privateVar = Symbol('_privateVar')

const testClass = class {
  constructor (x = 1, y = 2) {
    // 在构造函数内部绑定this，防止结构赋值以后this改变
    this.handelFn = this.handelFn.bind(this)
    this.Y = y;
    this.X = x;
    this.setter = ''
  }

  get prop () {
    return this.setter
  }

  set prop (val) {
    this.setter = val
  }
  // 直接用=赋值
  varFn = 2
  // 静态方法不被继承
  static staticFn () {
    console.log(`this is static medthod`)
  }
  handelFn (handelMsg) {
    console.log(`这是传进来的：${handelMsg}，这是内部调用的：${this.Y} + ${this.X}`)
    this[_privateVar](this.handelFn.name)
  }
  // class目前不提供定义私有方法，可以用symbol来代替外部无法获取symbol的值
  [_privateVar] (privateVar) {
    console.log(`${privateVar}调用了私有变量`)
  }
}
// 出事化方法必须使用new yy
let testOne = new testClass('变量X', '变量Y')

const { handelFn } = testOne
handelFn('提取后的MSG')
testOne.prop = 'qqq'
console.log(testOne.prop)
testOne.handelFn('传入的变量handelMsg')
