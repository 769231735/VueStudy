
fetch("./data/address.json").then(function (res) {
     // console.log(res);
     //默认的将res的json处理方法
     return res.json();
 }).then(function (json) {
     console.log(json);
     vm.addressList = json.result;
     var bolList = [];
     for (var i = 0; i < json.result.length; i++) {
        bolList.push(false);
     }
     vm.bolList = bolList;



 }).catch(function (err) {
     console.log(err);
 })
 var vm = new Vue({
     el:".container",
     data:{
         addressList:[],
         bolList:[],
         num:4
     },
     methods:{

         change(index){
             for (var i = 0; i < this.bolList.length; i++) {
                 this.$set(this.bolList,i,false);
             }
             this.$set(this.bolList,index,true);
         },
         setDefault(index){
             for (var i = 0; i < this.addressList.length; i++) {
                this.addressList[i].isDefault = false;
             }
            this.addressList[index].isDefault = true;

        },
        del(index){
            this.addressList.splice(index,1);
        },
        more(index){
            this.num=this.addressList.length;
        }
     }
 });
