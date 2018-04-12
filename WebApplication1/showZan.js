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
var Guid;
var Dis;
var Name;
var Count;
var clickable;
function getZan() {
    Guid = getValue().guid;
    $.ajax({
        type: "post",
        url: "api/Zans/Zan",
        contentType: 'application/json',
        data: JSON.stringify({ type: "0", guid: obj.guid }),
        success: function (data, status) {
            console.log(data);
            if (data) {
                var sarr = data.split(',');
                Count = parseInt(sarr[0]);
                Name = sarr[1];
                Dis = parseInt(Math.round(sarr[2]));
                document.getElementById("dis").innerHTML = Dis + "km";
                var lak = 30 - Count;
                if (lak <= 0) {
                    clickable = true;
                    document.getElementById("btn").removeAttribute("disabled");
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
                    lak = 0;
                }
                var zc = document.getElementById("zancount");
                var zname = document.getElementById("zanname");
                if (data == "-1")
                    ;
                    //zc.innerHTML = "无效用户";
                else {
                   // zname.innerHTML = Name;
                    //zc.innerHTML = "当前赞数:" + Count + "  (还需要" + lak + "个赞)";
                    var per = Math.round((30 - lak) / 30 * 100);
                    console.log(per);
                    var widp = per + "%";
                    var css = {
                        "width": widp
                    }
                    $("#bar").css("width", widp);
                }
            }
        }
    });
}
function goQuan() {
    if (!clickable) return;
    window.location.href = "good.html";
}
onload = function () {
    initShare();
    document.addEventListener("WeixinJSBridgeReady", function () {
        document.getElementById('media').play();
    }, false);
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
    
    clickable = false;
    $(".quan").fadeIn(2000);
    obj = getValue();
    getZan();
}