function wheel(wins,opts,runOpts){
    //初始化参数
    this.init(wins,opts,runOpts);
    //获取窗口
    this.getWindow();
    //创建盒子
    this.createBox();
    //创建轮播列表
    this.createLists();
    //创建按钮
    this.createBtns();
    //自动轮播
    this.auto();
    //点击播放
    this.click();
}
wheel.prototype={
    init(wins,opts,runOpts){
    this.opts=opts;
    this.runOpts=runOpts;
    var wins=document.querySelector(wins);
    var win=wins;
    if(!(wins && wins.nodeType==1)){
        console.error("窗口元素not find");
        return;
    }
    this.wins=this.win=wins;
    //图片的地址添加一个
    opts.imgs.push(opts.imgs[0]);
    //链接的地址添加一个
    opts.links.push(opts.links[0]);
    //颜色添加一个
    opts.imgColor.push(opts.imgColor[0]);

    this.imgLength=opts.imgs.length;
    if(this.imgLength==0){
        console.error("没有传入相应的轮播内容");
        return;
    }
    this.imgSize=opts.imgSize;
    if(!(this.imgSize instanceof Array)){
        console.error("请传入合法的尺寸类型");
    }
    if(this.imgSize.length==0){
        this.imgSize[0]=document.documentElement.clientWidth;
        this.imgSize[1]=400;
    }
    if(this.imgSize.some(function(val){
        return val==0;
    })){
        for(var i=0;i<2;i++){
            if(this.imgSize[i]==0){
                this.imgSize[i]=500;
            }
        }
    }
    // console.log(imgSize)
    this.btnColor=opts.btnColor||"green";
    this.btnActive=opts.btnActive||"red";
    this.btnPos=opts.btnPos||["center","20"];

//删掉runopts的对象
    this.runOpts=runOpts||{}
    this.time=0;
    if(runOpts.time){
        this.time=runOpts.time*1000;
    }else{
        this.time=5000;
    }

    this.eachTime=0;
    if(runOpts.eachTime){
        this.eachTime=runOpts.eachTime*1000;
    }else{
        this.eachTime=500;
    }

    this.runStyle=null;
    if(runOpts.runStyle=="linear"||!(runOpts.runStyle)){
        this.runStyle=Tween.Linear;
    }else if(runOpts.runStyle=="in"){
        this.runStyle=Tween.Quad.easeIn;
    }else if(runOpts.runStyle=="out"){
        this.runStyle=Tween.Quad.easeOut;
    }

    },
    getWindow(){
       this.wins.style.cssText="width:100%;height:"+this.imgSize[1]+"px;over flow:hidden; position:relative;";
    },
    createBox(){
        this.box=document.createElement("div");
        this.box.style.cssText="width:"+this.imgLength*100+"%;height:100%;border:1px solid red";
        this.wins.appendChild(this.box);
    },
    createLists(){
        for(var i=0;i<this.imgLength;i++){
            var divList=document.createElement("div");
            divList.style.cssText=`float: left;width:${100/this.imgLength}%;height: 100%;background:${this.opts.imgColor[i]}`;
    
            var link=document.createElement("a");
            link.href=this.opts.links[0];
            link.style.cssText="width:"+this.imgSize[0]+"px;height:"+this.imgSize[1]+"px;display:block; margin:auto; background:url("+this.opts.imgs[i]+") no-repeat 0 0";
            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    createBtns(){
        var btnBox=document.createElement("div");
        btnBox.style.cssText="width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+this.btnPos[1]+"px";
        this.btns=[];
    
        for(var i=0;i<this.imgLength-1;i++){
            // if(i==0){
            //     var bgcolor=btnActive;
            // }else{
            //     var bgcolor=btnColor;
            // }
            var bgcolor=i==0?this.btnActive:this.btnColor;
            var btn=document.createElement("div");
            btn.style.cssText="width:20px;height:20px;background:"+bgcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left;"
            btnBox.appendChild(btn);
            this.btns.push(btn);    
        }
        this.wins.appendChild(btnBox);
    },
    auto(){
//这个功能没有实现，错误是this.btns.length,用控制台输出时报错，btns就没有接收到值

    var winW=parseInt(getComputedStyle(this.win,null).width);
  
    var num = 0;

    function move(){
        num++;
        if(num>this.btns.length-1){
            animate(box,{
            "marginLeft":-num*winW
        },eachTime,runStyle,function(){   
            box.style.marginLeft=0;
        })
             num=0;
        }else{
            animate(box,{
                "marginLeft":-num*winW
            },eachTime,runStyle)
        }
        for(var i=0;i<this.btns.length;i++){
            btns[i].style.background=this.btnColor;
        }
        btns[num].style.background=this.btnActive;
    }

    var t=setInterval(move,this.time)

    },
click(){
//这个功能没有实现，错误是this.btns.length,用控制台输出时报错，btns就没有接收到值
//move中（）得不到bts的长度，move中的box无法获取到属性
        for (let i=0;i<this.btns.length;i++){
            this.btns[i].onclick=function(){
                num=i;
                animate(this.box,{
                "marginLeft":-num*winW
            },eachTime,runStyle)
            for(var j=0;j<this.btns.length;j++){
                btns[j].style.background=this.btnColor;
            }
            btns[num].style.background=this.btnActive;
            }
        }
  
        //鼠标的移入移出
        this.win.onmouseover=function(){
            clearInterval(t);
        }
        this.win.onmouseout=function(){
            t=setInterval(move, 3000)
        }
    }
}