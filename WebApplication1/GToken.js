function getToken() {
    var url = window.location.href;
    $.ajax({
        type: "post",
        url: "api/Token/Token",
        contentType: 'application/json',
        data: JSON.stringify({ link: url }),
        success: function (data, status) {
            console.log(data);
            var jsonData = $.parseJSON(data);
            //alert(jsonData.timestamp + "\n" + jsonData.signature + "\n" + jsonData.nonceStr);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxd740783563259bf0', // 必填，公众号的唯一标识
                timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
                nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
                signature: jsonData.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
}
function initShare() {
    getToken();
    wx.ready(function () {
        var tit = '快来帮我助力免费赢取永州千人团圆宴入场券';
        var des = '参与游戏，赢取永州千人团圆宴入场券';
        wx.onMenuShareTimeline({
            title: tit, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.206279.com/icon.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: tit, // 分享标题
            desc: des, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: , // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: tit, // 分享标题
            desc: des, // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: 'http://www.206279.com/icon.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}
