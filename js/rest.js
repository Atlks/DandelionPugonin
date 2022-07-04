
Vue.prototype.tagLinks90= function (e){
    return tagLinksAll(e);
}

Vue.prototype.tagLinks99= function (e){
    return tagLinksAll(e);
}

function list_by_url(url, targetDivName) {
    console.log("--------------vue ini....")
    Vue.filter("tagLinks90",function (e){
        return tagLinksAll(e);
    });
    Vue.use(VueLazyload)
    Vue.use(VueResource);   //这个一定要加上，指的是调用vue-resource.js
    var example1 = new Vue({
        el: '#' + targetDivName,
        data: {
            items: [
                {pinlun: 'Foo', time: '2222-22-22', pinlun: 'xxxxxxxxxxx', user: 'attt'},
                {pinlun: 'Bar'}
            ]
        },
      

        //   host_app +
        created: function () { //created方法，页面初始调用

            // var url = "/rpt/vodList_idxcate.php?typeid=" + typeid + "&lmt=" + lmt+"&rdm="+Math.random();

            this.$http.get(url).then(function (data) {  //ajax请求封装
                console.log(url);
                var index_data_start = data.bodyText.indexOf('-----attilax---');

                var true_data = data.bodyText.substr(index_data_start + 15);
                //     var items = JSON.parse(data);
                //  console.log('truedata:'+true_data)
                //我的json数据参考下面
                //   alert(true_data)
                this.items = JSON.parse(true_data);
            }, function (response) {   //返回失败方法调用，暂不处理
                console.info(response);
            })
        }


    });   //end vue
}


/**

  filters:{
            tagLinks90:function (tags)
            {
                return tagLinksAll(tags);
            },
            tagLinks:function (tags)
            {
                return tagLinksAll(tags);
            }
        },

        */