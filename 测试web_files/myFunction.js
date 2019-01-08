var x = 1

var f = function() {
  //   'use strict'
  console.log(this.x)
}

var obj = {
  f: f,
  x: 2
}

// 单独执行
f() // 1

// obj 环境执行
obj.f() // 2

var a = {
  // p: 'world',// 对象b不能获取到这个属性

  b: {
    p: 'world',
    m: function() {
      // 'use strict';

      return 'hello ' + this.p
    }
  }
}
var p = 'what'
// var hello = a.b;
// var hello = a.b.m;
console.log(a.b.m()) // undefined,
// console.log(hello());

var obj = {
  a: 1,
  b: 2
}

var f = function() {
  // 'use strict'
  return this
}

console.log(f() === window)
console.log(f.call(obj) === obj)

function add(a, b) {
  return a + b
}

var n = add.call(obj, obj.a, obj.b)
console.log('add return : ' + n)

var d = new Date()
console.log(d.getTime())

var p = d.getTime.bind(d)
console.log(p())

var counter = {
  count: 0,
  inc: function() {
    'use strict'
    this.count++
  }
}

var obj = {
  count: 100
}

var func = counter.inc.bind(obj)
func()
console.log(obj.count)

// var func = counter.inc.bind(counter)
// func()
// console.log(counter.count)
// 结合回调函数
function callIt(callback) {
  callback()
}

callIt(counter.inc.bind(counter))
console.log(counter.count)

// 数组内部this 还是指向全局变量
var obj = {
  name: '张三',
  times: [1, 2, 4],
  print: function() {
    this.times.forEach(
      function(n) {
        console.log(this.name)
      }.bind(this)
    )
  }
}

obj.print()

function Animal(name) {
  this.name = name
}

var cat1 = new Animal('大毛')
var cat2 = new Animal('二毛')

Animal.prototype.color = 'white'

Animal.prototype.meow = function() {
  console.log('姓名: ' + this.name)
}

cat1.color = 'black'
console.log(cat1.color)
console.log(cat2.color)
cat1.meow()
// console.obj(Array.prototype.toString)

var MyArray = function() {}

MyArray.prototype = new Array()
MyArray.prototype.constructor = MyArray

var mine = new MyArray()
mine.push(1, 2, 4)
console.log(mine.length)
console.log('mine 是一个数组对象' + (mine instanceof Array))
function P() {}
console.log(P.prototype.constructor === P)
var p = new P()

console.log('constructor name :' + p.constructor.name)
console.log(typeof P.prototype)
console.log(typeof MyArray.prototype)
console.log('原型是个函数 : ' + (P.prototype.constructor === P))
// console.log('原型是个函数 : ' + (P.prototype.constructor === P))
// 记住一点: 函数 <=> 对象

/**模拟JavaScript的多继承 */
var M1 = function() {
  hello: 'Hello'
}

var M2 = function() {
  world: 'world'
}

function S() {
  M1.call(this)
  M2.call(this)
}

S.prototype = Object.create(M1.prototype) // 继承M1
Object.assign(S.prototype, M2.prototype) // 继承链加上M2

S.prototype.constructor = S()

var s = new S()
var hel = s.hello + s.world
console.log(hel)
