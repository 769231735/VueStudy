//解决方法三：
Vue.prototype.$http = axios;
new Vue({
    el:"#cart",
    data:{
        productList:[],
        checkedAll:false,
        showToast:false,
        delIndex:-1
    },
    methods:{
        //改变数字
        changeNum(type,index){
            console.log(type);
            if(type=='add'){
                this.productList[index].productQuentity++;
            }else{

                this.productList[index].productQuentity--;
                if (this.productList[index].productQuentity<1){
                    this.productList[index].productQuentity=1
                }
            }
        },
        selected(item){
            console.log(item);
            if(item.checked == undefined){
                //    第一点击，向item中添加checked属性
                //     item.checked = true;
                this.$set(item,'checked',true)
            }else{
                item.checked=!item.checked;
            }

            //    全部选中，全选亮
            var num=0;
            this.productList.forEach(function (item,index) {
                // console.log(index);//0,1,2
                if(item.checked){
                    num++;
                }
            })
            if(num==this.productList.length){
                this.checkedAll=true;
            }else{
                this.checkedAll=false;
            }
        },
        checkAll(type){

            this.productList.forEach((item,index)=>{
                console.log(item);
                //数组或者对象里一开始没有这个值,往里添加的属性使用$set来设置,
                //可以打印出item看看对象或者数组里的具体某项有没有get 属性  和 set 属性
                if(item.checked==undefined){
                    this.$set(item,"checked",type)
                }else{
                    item.checked=type;
                }


            })
            this.checkedAll = type;
        },
        del(index){
            this.showToast = true;
            this.delIndex = index;
        },
        delFn(){
            this.productList.splice(this.delIndex,1);
            this.showToast = false;
        }

    },
    computed:{
        totalPrice(){
        //    总价=每一项的数量*每一项的单价之和
            var total = 0;
            this.productList.forEach((item)=>{
                if(item.checked){
                    total+=item.productQuentity*item.productPrice;
                }
            })
            return total;
        }
    },
    //设置过滤器
    filters:{
        currency(val){
            return "￥"+val.toFixed(2);
        }
    },
    created(){
    //    发起网络请求
    //    如果使用普通的函数this指向window
    //     解决方法1：this = _this
    //      解决方法2：箭头函数
    //     axios.get("data/cart.json").then((res)=>{
    //         console.log(res.data);
    //         console.log(this);
    //         if(res.data.status){
    //             this.productList = res.data.result.productList;
    //
    //         }
    //     }).catch((err)=>{
    //         console.errror(err);
    //     })
    //    将axios放在Vue的原型里,节省性能
        this.$http.get("data/cart.json").then((res)=> {
            // console.log(this);
            var data = res.data;
            console.log(data);
            if(res.data.status){
                this.productList = res.data.result.productList;
            }
        }).catch((err)=>{
            console.errror(err);
        })


    }


})