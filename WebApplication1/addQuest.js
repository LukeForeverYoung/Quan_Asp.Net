function getValue(url) {
    //首先获取地址  
    var url = url || window.location.href;
    //获取传值  
    var arr = url.split("?");
    //判断是否有传值  
    if (arr.length == 1) {
        return null;
    }
    //获取get传值的个数  
    var value_arr = arr[1].split("&");
    //循环生成返回的对象  
    var obj = {};
    for (var i = 0; i < value_arr.length; i++) {
        var key_val = value_arr[i].split("=");
        obj[key_val[0]] = key_val[1];
    }
    return obj;
}  
onload = function () {
    obj = getValue();
    console.log(obj);
    document.getElementById("dis").innerText = obj.dis;
}