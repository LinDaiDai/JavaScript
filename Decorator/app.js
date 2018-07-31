@addSkill('hello world')
@looks
class Person {
    constructor() {}
    @myname
    name() {
        console.log('无名') 
    }
}
function addSkill(text) {//多参数
    return function(target) {
        target.say = text;
        target.prototype.eat = "apple";
    }
}
function myname(target, key, descriptor) {
    console.log(target);
    console.log(key);
    console.log(descriptor);
    descriptor.value = function() {
        console.log('霖呆呆')
    }
}
function looks(target) {
    console.log('I am handsome')
    target.looks = 'handsome'
}
var personOne = new Person()
// console.log(Person['say'])
// console.log(Person['looks'])
// console.log(personOne['eat'])
personOne.name()