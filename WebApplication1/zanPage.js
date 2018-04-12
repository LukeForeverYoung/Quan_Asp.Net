//zanPage
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
var obj;
function goIndex() { window.location.href = 'index.html'; }
function zanAction() {
    if (document.getElementById("zanBtn").innerText == "为他助力") {
        console.log(returnCitySN.cip);
        $.ajax({
            type: "post",
            url: "api/Zans/Zan",
            contentType: 'application/json',
            data: JSON.stringify({ type: "1", guid: obj.guid, ip: returnCitySN.cip }),
            success: function (data, status) {
                if (data) {
                    alert("助力成功");
                    document.getElementById("zanBtn").innerHTML = "查看进度";
                    console.log(data);
                    $(".shareTip").fadeIn(500);
                }
            }
        });
    }
    else {
        window.location.href = "showZan.html" + "?guid=" + obj.guid;
    }
}

var zanCount = 0;
function getZan() {
    $.ajax({
        type: "post",
        url: "api/Zans/Zan",
        contentType: 'application/json',
        data: JSON.stringify({ type: "0", guid: obj.guid }),
        success: function (data, status) {
            console.log(data);
            if (data) {
                var sarr = data.split(',');
                var zansu = sarr[0];
                var name = sarr[1];
                var lak = 30 - zansu;
                if (lak < 0) lak = 0;
                var zc = document.getElementById("zancount");
                var zname = document.getElementById("zanname");
                if (data == "-1")
                    zc.innerHTML = "无效用户";
                else {
                    //zname.innerHTML = name;
                    zc.innerHTML = "当前助力人数:" + zansu + "  (还需" + lak + "人助力)";
                }
            }
        }
    });
}
onload = function () {
    initShare();
    document.addEventListener("WeixinJSBridgeReady", function () {
        document.getElementById('media').play();
    }, false);
    $(".img_1").slideDown(2000);
    $("body").on("touchmove", function (event) {
        event.preventDefault;
    }, false)
    //重要！禁止移动端滑动的默认事件
    document.body.addEventListener('touchmove', function (event) {
        event = event ? event : window.event;
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }, false)
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
    zanCount = 0;
    obj = getValue();
    guid = obj.guid;
    console.log(obj.guid);
    getZan();
}