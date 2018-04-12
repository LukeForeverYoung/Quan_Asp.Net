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
function check(name) {
    var reg = /^(\w|[\u4E00-\u9FA5])*$/;
    if (arr = name.match(reg)) {
        return true;
    }
    else {
 
        return false;
    }
}
function removeBlank(str) {
    return str.replace(/\s+/g, "");
}
function addQ(name, phone, dis, city) {
    //check user input
    var inputFlag = true;
    name = removeBlank(name);
    phone = removeBlank(phone);
    if (name.length == 0) {
        inputFlag = false;
        alert("请输入姓名");
        return;
    }
    if (name.length > 10) {
        //用户名输入过长
        inputFlag = false;
        alert("姓名过长");
        return;
    }
    if (name.length==0||!check(name)) {
        //用户名不合法（中文英文数字）
        inputFlag = false;
        alert("姓名不合法");
        return;
    }
    if (phone.length != 11) {
        //电话号码不是11位
        inputFlag = false;
        alert("手机号码不合法");
        return;
    }
    if (isNaN(phone)) {
        //电话号码不正确
        inputFlag = false;
        alert("手机号码不合法");
        return;
    }
    //如果输入不正确则拒绝继续
    if (!inputFlag)
        return;
    var host = window.location.host;
    console.log(name + " " + phone + " " + dis + " " + city+" "+host);
    $.ajax({
        type: "post",
        url: "api/User/Add",
        contentType: 'application/json',
        data: JSON.stringify({ name: name,phone:phone,dis:dis,city:city,host:host }),
        success: function (data, status) {
            if (data) {
               
                guid = getValue(data).guid;
                dis = getValue(data).dis;
                console.log(returnCitySN.cip);
                $.ajax({
                    type: "post",
                    url: "api/Zans/Zan",
                    contentType: 'application/json',
                    data: JSON.stringify({ type: "2", guid: guid, ip: returnCitySN.cip }),
                });
                window.location.href = "zanPage.html?guid=" + guid;
            }
        }
    });
}
function pushPost() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    addQ(name, phone, obj.dis, decodeURI(obj.city));
}
onload = function () {
    initShare();
    document.addEventListener("WeixinJSBridgeReady", function () {
        console.log("a");
        document.getElementById('media').play();
    }, false);
    $("#imgDiv").height = $(".img_1").height;
    $(".img_1").hide();
    $(".img_1").slideDown(2000);
    obj = getValue();
    console.log(obj);
    var fx = 1;
    function btnBlink() {
        if (fx == 1) {
            var css = {
                "opacity": 0.7
            }
            fx = 0;
        }
        else if (fx == 0) {
            var css = {
                "opacity": 1
            }
            fx = 1;
        }
        else {
            $(".fblink").css("opacity", 1);
            return;
        }
        $(".fblink").animate(css, 200, btnBlink);
    }
    btnBlink();
}