;
//通过class获取元素
function getClass(cls){
    var ret = [];
    var els = document.getElementsByTagName("*");
    for (var i = 0; i < els.length; i++){
        //判断els[i]中是否存在cls这个className;.indexOf("cls")判断cls存在的下标，如果下标>=0则存在;
        if(els[i].className === cls || els[i].className.indexOf("cls")>=0 || els[i].className.indexOf(" cls")>=0 || els[i].className.indexOf(" cls ")>0){
            ret.push(els[i]);
        }
    }
    return ret;
}
function getStyle(obj,attr){//解决JS兼容问题获取正确的属性值
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
function startMove(obj,json,fun, type){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var iCur = 0;
			//判断运动的是不是透明度值
			if(attr=="opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			var ispeed = (json[attr]-iCur)/8;
			//运动速度如果大于0则向下取整，如果小于0想上取整；
			ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
			//判断所有运动是否全部完成
			if(iCur!=json[attr]){
				isStop = false;
			}
			//运动开始
			if(attr=="opacity"){
				obj.style.filter = "alpha:(opacity:"+(json[attr]+ispeed)+")";
				obj.style.opacity = (json[attr]+ispeed)/100;
			}else{
				obj.style[attr] = iCur+ispeed+"px";
			}
		}
		//判断是否全部完成
		if(isStop){
			clearInterval(obj.timer);
			if (type === 1) {//只有在最后一个元素移动完成之后才判断排序
				verifyOrder();
			}
			if(fun && typeof fun === 'function'){
				fun();
			}
		}
	},30);
}
/**
 * 对数组中对象的某个key值排序
 * @param {} property key值
 */
function compare(property) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}
/**
 * 对正确排序的判断
 */
function verifyOrder() {
	var imgs = document.querySelectorAll('#ul1 li img');
	var noOrderArr = [];
	var sureOrderArr = [];

	imgs.forEach(img => {
		let srcReg = /\/\d+\.jpg/;//获取图片src后缀名的正则
		let numReg = /\d+/;//获取图片名称的数字
		let num = img.src.match(srcReg)[0].match(numReg)[0];
		noOrderArr.push({ 'num': num, 'top': img.parentElement.offsetTop })
	})
	let newArr = JSON.parse(JSON.stringify(noOrderArr));//复制一份没有排序的节点，防止排序后原数组也发生改变
	sureOrderArr = newArr.sort(compare('top'));//按照num升序的数组
	noOrderArr.sort(compare('num'));
	let noOrderTops = noOrderArr.map((obj) => { return obj.top })
	let sureOrderTops = sureOrderArr.map((obj) => { return obj.top })

	if (JSON.stringify(noOrderTops) == JSON.stringify(sureOrderTops)) {//若排序和正确的排序顺序一致
		showOrHiddenSuccessEle('visible');
	}
}
/**
 * 成功之后创建成功弹窗
 */
function showOrHiddenSuccessEle(type) {
	var div = document.getElementById('successEle');
	var mask = document.getElementById('mask');
	div.style.visibility = type;
	div.style.opacity = type === 'visible' ? 1 : 0;
	mask.style.visibility = type;
}