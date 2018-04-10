var vm = new Vue({
    el:"#address",
    data:{
        addressList:[],
        limit:3,
        // checked:false,
        currentIndex:0//默认第一个选中
    },
    methods:{
        setDefault(index){
            this.limitAddress.forEach((item,i)=>{
                console.log(item);
                if(index==i){
                    item.isDefault=true
                }else{
                    item.isDefault=false;
                }
            })
            // this.addressList[index].isDefault = true;
        },
        del(index){
            this.addressList.splice(index,1);
        }
    },
    computed:{
        limitAddress(){
        //    返回页面需要渲染的地址列表
        //     return this.addressList.splice(0,this.limit)
            return this.addressList.slice(0,this.limit);
        }
    },
    created(){
        axios.get("data/address.json").then((res)=>{
            var data = res.data;
            console.log(data);
            if(data.status==0){
                this.addressList = data.result;
            }
        }).catch((err)=>{
            console.error(err);
        })
    }
});