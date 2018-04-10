
fetch("./data/cart.json").then(function (res) {
     // console.log(res);
     //默认的将res的json处理方法
     return res.json();
 }).then(function (json) {
     console.log(json);
     vm.productList = json.result.productList;


 }).catch(function (err) {
     console.log(err);
 })

 // 使用
var vm = new Vue({
    el:"#root",
    data:{
        productList:[],
        totalMoney:0,
        checkId:"",
        isCheckAll:false,
        isCheck:[false,false,false],
        createArr:true,
        singleCount:[0,0,0],//每个的总钱数
        clickChecked:false,
        bol:false,
        index:""

    },
    methods:{
        add(index){
            this.productList[index].productQuentity+=1;
            // 每个的钱总数

            this.$set(this.singleCount,index,this.productList[index].productPrice * this.productList[index].productQuentity);
            console.log(this.singleCount);

            if(this.isCheck[index]){
                this.totalMoney=0;
                for(var i = 0;i<this.singleCount.length;i++){
                    this.totalMoney+=this.singleCount[i];
                }
            }
        },
        dec(index){
            this.productList[index].productQuentity-=1;
            if(this.productList[index].productQuentity<1){
                this.productList[index].productQuentity=1;
            }
            this.$set(this.singleCount,index,this.productList[index].productPrice * this.productList[index].productQuentity)
            console.log(this.singleCount);
            if(this.isCheck[index]){
                this.totalMoney=0;
                for(var i = 0;i<this.singleCount.length;i++){
                    this.totalMoney+=this.singleCount[i];
                }
            }
        },
        changeCheck(index){
            this.$set(this.isCheck,index,!this.isCheck[index]);
            if(this.isCheck[index]){
                // 设置数组的对应价格
                this.$set(this.singleCount,index,this.productList[index].productPrice * this.productList[index].productQuentity);

            }else{
                this.$set(this.singleCount,index,0);
            }

            // console.log(this.singleCount);

            //每次点击初始化原来的钱为0，然后后面的循环将钱的总数增加
            this.totalMoney=0;
            for(var i = 0;i<this.singleCount.length;i++){

                this.totalMoney+=this.singleCount[i];
            }

            //判断所有为真全选点亮
            for(var i = 0;i<this.productList.length;i++){
                console.log(i);
                // 如果数组中有一个为false没有被选中，那么全选为false，如果全为true那么全选为true
                if(this.isCheck[i]==false){
                    this.isCheckAll = false;
                    return;
                }
            }
                this.isCheckAll = true;
                // console.log(this.isCheckAll);
        },
        checkAll(){
            // 全选
            var count = 0;
            for(var i=0;i<this.isCheck.length;i++){
                this.isCheck[i] = true;

                count +=this.productList[i].productPrice * this.productList[i].productQuentity

            }
            this.totalMoney  = count;
            this.isCheckAll = true;

        },
        disAll(){
            for(var i=0;i<this.isCheck.length;i++){
                this.isCheck[i] = false;
            }
            this.isCheckAll = false;
            this.totalMoney = 0;

        },
        del(index){
            this.bol = true;
            this.index = index;
            // console.log(this.bol);
            // this.totalMoney=0;
            // for(var i = 0;i<this.singleCount.length;i++){
            //
            //     this.totalMoney+=this.singleCount[i];
            // }
        },
        cancelModal(){
            this.bol = false;
        },
        sureDel(){
            console.log(this.index);
            this.productList.splice(this.index,1);
            this.singleCount.splice(this.index,1);
            this.isCheck.splice(this.index,1);
            this.bol = false;
            this.totalMoney=0;
            for(var i = 0;i<this.singleCount.length;i++){

                this.totalMoney+=this.singleCount[i];
            }

        }


    }
});
