/*  ==========代码参考来源===========
    CSDN 博主：薛定谔的死猫
    博文：绘制六芒星战斗力属性图 —— h5 canvas 初体验
    （https://blog.csdn.net/Emptyset110/article/details/48153237?spm=1001.2101.3001.6650.15&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-15.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-15.pc_relevant_default&utm_relevant_index=18）
    ===============================
*/

mui.ready(function(){
    var hex = document.getElementById("polygon-strength");
    var ability_value = new Object;
    var ability_name = new Object;
    //设置能力值
    ability_value[0] = 0.4;
    ability_value[1] = 0.55;
    ability_value[2] = 0.6;
    ability_value[3] = 0.6;
    ability_value[4] = 0.8;
    ability_value[5] = 0.7;
    //设置能力属性名
    ability_name[0] = '爆发力 40分';
    ability_name[1] = '速度 55分';
    ability_name[2] = '协调性 60分';
    ability_name[3] = '柔韧性 60分';
    ability_name[4] = '耐力 80分';
    ability_name[5] = '力量 70分';
    polygon(hex, 6, 6, ability_value, ability_name);            
});

//绘制多边形能力图
function polygon(obj, side, part, ability_value, ability_name) {
    var ability = obj.getContext('2d');
    ability.canvas.width = 350;
    ability.canvas.height = 300;
/*  ability.canvas.width = window.innerWidth*0.7;
    ability.canvas.height = window.innerWidth*0.7;
    */
    var width = obj.width;
    var height = obj.height;
    var xCenter = width * 0.5;
    var yCenter = height * 0.5;
    var radius = width * 0.3;
    var space = radius/part;
    var theta = Math.PI*2/side;

    //绘制渐变多边形底层
    for (var j=part;j>=1;j--) {
        ability.beginPath();
        for (var i=0; i<=side; i++) {
            ability.lineTo(Math.cos(i*theta)*space*j+xCenter,-Math.sin(i*theta)*space*j+yCenter);
        }
        var r=73, g=101, b=115;
        ability.fillStyle = "rgba("+73+","+101+","+115+"," + 0.4 + ")";
        ability.fill();
        ability.closePath();
    }

    //绘制能力多边形
    ability.beginPath();
    for (var i=0; i<=side; i++) {
        var x = Math.cos(i*theta)*radius*ability_value[i%side]+xCenter;
        var y = -Math.sin(i*theta)*radius*ability_value[i%side]+yCenter;
        ability.lineTo(x,y);
    }
    ability.strokeStyle="rgba(255,255,96,1)";
    ability.lineWidth = 2;
    ability.stroke();
    ability.closePath();

    //绘制字体
    for (var i=0; i<side; i++) {
        ability.fillStyle="rgba(0,0,0,1)";
        ability.font = "normal 12px Microsoft Yahei";
        if (Math.cos(i*theta)*radius>0) {
            var x = Math.cos(i*theta)*radius+3+xCenter;
            var y = -Math.sin(i*theta)*radius*1.3+yCenter;
        } else {
            var x = Math.cos(i*theta)*radius*1.5+xCenter;
            var y = -Math.sin(i*theta)*radius*1.3+yCenter;
        }
        ability.fillText(ability_name[i],x,y);              
    }
}