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

app.get('/',function(req,res){
	res.sendFile(__dirname + '/' + 'form.html');
});

app.get('/form.html',function(req,res){
	res.sendFile(__dirname + '/' + 'form.html');
});


var GetData_all_olds;
var GetData_one_vol;



var sql_AllOlds = 'SELECT * FROM interestsold';//查找所有老人的兴趣
var sql_AllVols = 'SELECT * FROM interestsvol';//查找所有志愿者的兴趣


app.get('/match',function(req,res){


var id_vol = req.query.get_id_vol;

var sql_one_Vol = 'SELECT * FROM interestsvol WHERE id =\"'+id_vol+'\"';//查找特定志愿者的兴趣

function Select_AllOlds() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
		con.query(sql_AllOlds,function (err, result) {
		if(err){
		  console.log('[SELECT ERROR] - ',err.message);
		  return;
		}
		GetData_all_olds=result;
		resolve(GetData_all_olds);  //resolve在第一个语句中， 提交GetData_all_olds
		return;});

  });
}


function Select_one_vol() { //该函数用于同步处理数据库查询操作
  	return new Promise(resolve => {
		con.query(sql_one_Vol,function (err, result) {
		if(err){
		  console.log('[SELECT ERROR] - ',err.message);
		  return;
		}
		GetData_one_vol=result;
		resolve(GetData_one_vol);  //resolve在第一个语句中,GetData_one_vol
		return;
		});
	});
}

//回调函数中处理数据
async function asyncCall() {
//
  const result = await Select_AllOlds();
  const result2 = await Select_one_vol();


		//定义一个二维数组
		var match = new Array();
			for(var i = 0; i < 10; i++) {
				match[i] = new Array();
		}

	  

		console.log("循环开始");
		var m=0;//匹配计数
		for(i2=0;i2<10;i2++){
	
				if (GetData_one_vol[0].in1==GetData_all_olds[i2].in1&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in1==GetData_all_olds[i2].in2&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in1==GetData_all_olds[i2].in3&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in1==GetData_all_olds[i2].in4&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in1==GetData_all_olds[i2].in5&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}

				if (GetData_one_vol[0].in2==GetData_all_olds[i2].in1&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in2==GetData_all_olds[i2].in2&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in2==GetData_all_olds[i2].in3&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in2==GetData_all_olds[i2].in4&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in2==GetData_all_olds[i2].in5&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}

				if (GetData_one_vol[0].in3==GetData_all_olds[i2].in1&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in3==GetData_all_olds[i2].in2&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in3==GetData_all_olds[i2].in3&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in3==GetData_all_olds[i2].in4&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in3==GetData_all_olds[i2].in5&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}

				if (GetData_one_vol[0].in4==GetData_all_olds[i2].in1&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in4==GetData_all_olds[i2].in2&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in4==GetData_all_olds[i2].in3&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in4==GetData_all_olds[i2].in4&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}
				if (GetData_one_vol[0].in4==GetData_all_olds[i2].in5&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in1!='') {
					m++;}

				if (GetData_one_vol[0].in5==GetData_all_olds[i2].in1&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in5!='') {
					m++;}
				if (GetData_one_vol[0].in5==GetData_all_olds[i2].in2&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in5!='') {
					m++;}
				if (GetData_one_vol[0].in5==GetData_all_olds[i2].in3&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in5!='') {
					m++;}
				if (GetData_one_vol[0].in5==GetData_all_olds[i2].in4&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in5!='') {
					m++;}
				if (GetData_one_vol[0].in5==GetData_all_olds[i2].in5&&GetData_one_vol[0]!=null&&GetData_one_vol[0].in5!='') {
					m++;}

				match[i2][0] =GetData_all_olds[i2].id;
				match[i2][1] =m;
				m=0;
		}


   		var resultSort3 = match.sort(function(a,b){
          return b[1]-a[1];
        });
		//完成数据匹配之后，进行结果输出
		for (i=0;i<resultSort3.length;i++)
		{
		console.log("老人id      匹配数量")
		console.log(resultSort3[i][0] + "              "+resultSort3[i][1])

		}    
		res.send(resultSort3)
}

asyncCall(); //同步执行数据库查询和数据匹配功能

}); 



app.get('/match2',function(req,res){

var id_old = req.query.get_id_old;
var sql_one_old = 'SELECT * FROM interestsold WHERE id =\"'+id_old+'\"';//查找特定老人的兴趣

var GetData_all_vols;
var GetData_one_old;

function Select_one_old() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
		con.query(sql_one_old,function (err, result) {
		if(err){
		  console.log('[SELECT ERROR] - ',err.message);
		  return;
		}
		GetData_one_old=result;
		resolve(GetData_one_old);  //resolve在第一个语句中， 提交GetData_all_olds
		return;});

  });
}


function Select_all_vols() { //该函数用于同步处理数据库查询操作
  	return new Promise(resolve => {
		con.query(sql_AllVols,function (err, result) {
		if(err){
		  console.log('[SELECT ERROR] - ',err.message);
		  return;
		}
		GetData_all_vols=result;
		resolve(GetData_all_vols);  //resolve在第一个语句中,GetData_one_vol
		return;
		});
	});
}
var  sqll33 = 'SELECT COUNT(id) AS countrow FROM interestsvol';

function getCountOfVolInts() { //该函数用于同步处理数据库查询操作
  return new Promise(resolve => {
        con.query(sqll33,function (err, result) {
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
async function asyncCall() {
//
  const result3 = await Select_one_old();
  const result4 = await Select_all_vols();
  const result5 = await getCountOfVolInts();
  
  var idMax2=getCountVol[0].countrow
		//定义一个二维数组
var match2 = new Array();
	for(var i = 0; i < idMax2; i++) {
		match2[i] = new Array();
}

	  

		console.log("循环开始");
		var m=0;//匹配计数
		for(i2=0;i2<idMax2;i2++){
	
				if (GetData_one_old[0].in1==GetData_all_vols[i2].in1&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in1==GetData_all_vols[i2].in2&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in1==GetData_all_vols[i2].in3&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in1==GetData_all_vols[i2].in4&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in1==GetData_all_vols[i2].in5&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}

				if (GetData_one_old[0].in2==GetData_all_vols[i2].in1&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in2==GetData_all_vols[i2].in2&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in2==GetData_all_vols[i2].in3&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in2==GetData_all_vols[i2].in4&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in2==GetData_all_vols[i2].in5&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}

				if (GetData_one_old[0].in3==GetData_all_vols[i2].in1&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in3==GetData_all_vols[i2].in2&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in3==GetData_all_vols[i2].in3&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in3==GetData_all_vols[i2].in4&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in3==GetData_all_vols[i2].in5&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}

				if (GetData_one_old[0].in4==GetData_all_vols[i2].in1&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in4==GetData_all_vols[i2].in2&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in4==GetData_all_vols[i2].in3&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in4==GetData_all_vols[i2].in4&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}
				if (GetData_one_old[0].in4==GetData_all_vols[i2].in5&&GetData_one_old[0]!=null&&GetData_one_old[0].in1!='') {
					m++;}

				if (GetData_one_old[0].in5==GetData_all_vols[i2].in1&&GetData_one_old[0]!=null&&GetData_one_old[0].in5!='') {
					m++;}
				if (GetData_one_old[0].in5==GetData_all_vols[i2].in2&&GetData_one_old[0]!=null&&GetData_one_old[0].in5!='') {
					m++;}
				if (GetData_one_old[0].in5==GetData_all_vols[i2].in3&&GetData_one_old[0]!=null&&GetData_one_old[0].in5!='') {
					m++;}
				if (GetData_one_old[0].in5==GetData_all_vols[i2].in4&&GetData_one_old[0]!=null&&GetData_one_old[0].in5!='') {
					m++;}
				if (GetData_one_old[0].in5==GetData_all_vols[i2].in5&&GetData_one_old[0]!=null&&GetData_one_old[0].in5!='') {
					m++;}

				match2[i2][0] =GetData_all_vols[i2].id;
				match2[i2][1] =m;
				m=0;
		}
    	var resultSort2 = match2.sort(function(a,b){
          return b[1]-a[1];
        });


		//完成数据匹配之后，进行结果输出
		for (i=0;i<resultSort2.length;i++)
		{
		console.log("志愿者id      匹配数量")
		console.log(resultSort2[i][0] + "              "+resultSort2[i][1])
		}    

		res.send(resultSort2)
}

asyncCall(); //同步执行数据库查询和数据匹配功能

}); 


var server = app.listen('3000',function(){
	console.log('server start 127.0.0.1');
});



