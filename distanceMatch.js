// 欧式距离计算模块：
// 功能1：以某一志愿者为中心，查找与所有老人的地面最短距离，并按距离升序排列；
// 功能2：以某一老人为中心，查找与所有志愿者的地面最短距离，并按距离升序排列;

var express = require('express');
var async = require('async');
var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',  //数据库服务器
    user:'root',    //用户名
    password:'root',   //密码
    database :'connection', //数据库
});
con.connect();

// 距离计算模块：
// -以某一志愿者为中心，搜索周围的老人
// -以某一老人为中心，搜索周围的志愿者
// 实现思路：
// =获取所有老人or志愿者坐标
// =遍历计算
// =得到结果，二维数组

//--------计算老人周围的志愿者-------

/**距离计算模块
 * 获取两经纬度之间的距离
 * @param {number} e1 点1的东经, 单位:角度, 如果是西经则为负
 * @param {number} n1 点1的北纬, 单位:角度, 如果是南纬则为负
 * @param {number} e2
 * @param {number} n2
 */
function getDistance(e1, n1, e2, n2){
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    
    /** 根据经纬度获取点的坐标 */
    let getPoint = (e, n) => {
        e *= PI/180
        n *= PI/180
        //这里 R* 被去掉, 相当于先求单位圆上两点的距, 最后会再将这个距离放大 R 倍
        return {x: cos(n)*cos(e), y: cos(n)*sin(e), z: sin(n)}
    }
    
    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c/2)*2*R
    return r
    //单位km
}


app.get('/distanceInOld',function(req,res){

/*----------------前端接口----------*/
      /*--输入作为查询中心的老人的id------*/
var idOld='o004';
/*----------------前端接口----------*/

var  sqll1 = 'SELECT * FROM locationold WHERE id =\"'+idOld+'\"';
var  sqll2 = 'SELECT * FROM locationvol';
var  sqll3 = 'SELECT COUNT(id) AS countrow FROM locationvol';
//var 获取单个志愿者sql
var dataLocationVol;
var dataLocationOld;

function getLocationOfVols() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll2,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        dataLocationVol=result;
        resolve(dataLocationVol);  //resolve在第一个语句中， 提交datax
        return;});
  });
}

function getLocationOfOld() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll1,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        dataLocationOld=result;
        resolve(dataLocationOld);  //resolve在第一个语句中， 提交datax
        return;});
  });
}

var getCountVol;
function getCountOfVol() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll3,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        getCountVol=result;
        resolve(getCountVol);  //resolve在第一个语句中， 提交datax
        return;});
  });
}


//回调函数中处理数据
async function asyncCallLocation1() {

  const result = await getLocationOfVols();
  const result2 = await getLocationOfOld();
  const result3 = await getCountOfVol();
  console.log(dataLocationVol);
  console.log(dataLocationOld);
  // console.log(getCountVol[0]);
  console.log("sql search over!")

    var idMax=getCountVol[0].countrow
    //定义一个二维数组
    var calculatedd = new Array();
        for(var i = 0; i < idMax; i++) {
            calculatedd[i] = new Array();
    }

    e1=dataLocationOld[0].longitude;
    n1=dataLocationOld[0].latitude;

    for (var i = 0; i <idMax; i++) {
    e2=dataLocationVol[i].longitude
    n2=dataLocationVol[i].latitude

    dd=getDistance(e1,n1,e2,n2);

    calculatedd[i][0]=dataLocationOld[0].id;
    calculatedd[i][1]=dataLocationVol[i].id;
    calculatedd[i][2]=dd;
    }
    //二维数组排序
    var resultSort = calculatedd.sort(function(a,b){
          return a[2]-b[2];
        });
    console.log(resultSort)

}

asyncCallLocation1();
});




app.get('/distanceInVol',function(req,res){


/*----------------前端接口----------*/
      /*--输入作为查询中心的志愿者id------*/
var idvol='v004';
/*----------------前端接口----------*/

var  sqll4 = 'SELECT * FROM locationvol WHERE id =\"'+idvol+'\"';
var  sqll5 = 'SELECT * FROM locationold';
var  sqll6 = 'SELECT COUNT(id) AS countrow FROM locationold';

var dataLocationOfVol;
var dataLocationOfOld;


function getLocationOfVol() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll4,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        dataLocationOfVol=result;
        resolve(dataLocationOfVol);  //resolve在第一个语句中， 提交datax
        return;});
  });
}

function getLocationOfOlds() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll5,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        dataLocationOfOld=result;
        resolve(dataLocationOfOld);  //resolve在第一个语句中， 提交datax
        return;});
  });
}

var getCountOld;
function getCountOld() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll6,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        getCountOld=result;
        resolve(getCountOld);  //resolve在第一个语句中， 提交datax
        return;});
  });
}


//回调函数中处理数据
async function asyncCallLocation2() {

  const result = await getLocationOfVol();
  const result2 = await getLocationOfOlds();
  const result3 = await getCountOld();
  console.log(dataLocationOfVol);
  console.log(dataLocationOfOld);
  // console.log(getCountVol[0]);
  console.log("sql search over!")

    var idMax=getCountOld[0].countrow
    //定义一个二维数组
    var calculatedd = new Array();
        for(var i = 0; i < idMax; i++) {
            calculatedd[i] = new Array();
    }

    //志愿者坐标
    e1=dataLocationOfVol[0].longitude;
    n1=dataLocationOfVol[0].latitude;

    for (var i = 0; i <idMax; i++) {
    e2=dataLocationOfOld[i].longitude
    n2=dataLocationOfOld[i].latitude

    dd=getDistance(e1,n1,e2,n2);
    calculatedd[i][0]=dataLocationOfVol[0].id;
    calculatedd[i][1]=dataLocationOfOld[i].id;
    calculatedd[i][2]=dd;
    }

    //二维数组排序
    var resultSort = calculatedd.sort(function(a,b){
          return a[2]-b[2];
        });

    console.log(resultSort)

}

asyncCallLocation2();
});

var server = app.listen('5000',function(){
    console.log('server start 127.0.0.1');
});

result[0][1]