var url = require ('url');
var fs = require ('fs');
var queryString = require ('querystring'); //处理post请求
var MongoClient = require('mongodb').MongoClient; //mongo数据库的客户端
var DB_CONN_STR = 'mongodb://localhost:27017/test';

module.exports = {
    home:function(req,res){
        /*res.write('首页');
        res.end();*/
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        files.readFile('./templates/home.html',res);
    },
    /*注册处理*/
    registor:function(req,res){
        res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
        var post = "";
        req.on('data',function(chunk){
            post +=chunk;
        });
        req.on('end',function(){
            console.log(post);
            console.log(typeof post);
            var urlObject = queryString.parse(post);
            // var urlObject = JSON.parse(post);
            console.log(urlObject);
            console.log(urlObject.username);
            console.log(urlObject.password);
            var username=urlObject.username;
   			var password=urlObject.password;
   			var msg;
   			var selectData = function(db, callback) {  
				//连接到表  
				var collection = db.collection('user');
				//查询数据
				var whereStr = {username:username};
				collection.find(whereStr).toArray(function(err, result) {
				    if(err){
				        console.log('Error:'+ err);
				        return;
				    }     
				    callback(result);
				});
			}
	        MongoClient.connect(DB_CONN_STR, function(err, db) {
	            console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result);
	    			if(result.length>=1){
	    				console.log("用户名已经被注册！");
	    				res.write('{"msg":"0"}');
	    				res.end();
	    			}else{
	    				var insertData = function(db, callback) {  
		    				//连接到表 user
			    			var collection = db.collection('user');
			   				//插入数据
			    			var data = [{username:username,password:password}];
			    			collection.insert(data, function(err, result) { 
			        			if(err){
						            console.log('Error:'+ err);
						            return;
						        }     
			        			callback(result);
			    			});
						}
						MongoClient.connect(DB_CONN_STR, function(err, db) {
						    console.log("连接成功！");
						    insertData(db, function(result) {
						        console.log(result);
						        res.write('{"msg":"1"}');
						        res.end();
						        db.close();
						    });
						});
					}
	    			db.close();
	  			});
			});
        });  
    },
    /*登录处理*/
    login:function(req,res){
       	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
       	var params = url.parse(req.url, true).query;
   		var username=params.username;
   		var password=params.password;
   		var msg;
   		var selectData = function(db, callback) {  
	  		//连接到表  
		  	var collection = db.collection('user');
		  	//查询数据
		  	var whereStr = {username:username};
		  	collection.find(whereStr).toArray(function(err, result) {
		    	if(err){
		      		console.log('Error:'+ err);
		      		return;
		    	}     
		    	callback(result);
		  	});
		} 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		  	console.log("连接成功！");
		  	selectData(db, function(result) {
		    	console.log(result);
		    	if(result.length==0){
		    		console.log("用户名输入错误！");
		    		res.write('{"msg":"0"}');
		    		res.end();
		    	}else{
					var selectData = function(db, callback) {  
					  	//连接到表  
					  	var collection = db.collection('user');
					  	//查询数据
					  	var whereStr = {username:username,password:password};
					  	collection.find(whereStr).toArray(function(err, result) {
					    	if(err){
						        console.log('Error:'+ err);
						        return;
						    }     
						    callback(result);
						});
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
				  		console.log("连接成功！");
				  		selectData(db, function(result) {
				    		console.log(result+"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
				    		console.log(result.length);
				    		if(result.length==0){
				    			console.log("密码输入错误！");
				    			res.write('{"msg":"1"}');
				    			res.end();
				    		}else if(result.length==1){
								res.write('{"msg":"2"}');
						        res.end();

				    		}
				    		db.close();
				  		});
					});
				}
		    	db.close();
		  	});
		});
    console.log(params.username+"-------------"+params.password);   
    },
    //商品列表
    goodslist:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();
    },
    //商品信息
    goodsinfo:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
		var goodsid=params.goodsid;
		var selectData = function(db, callback) {  
		    //连接到表  
		    var collection = db.collection('goodsinfo');
		    //查询数据
		    var whereStr = {"goodsid":goodsid};
		    collection.find(whereStr).toArray(function(err, result) {
			    if(err){
			        console.log('Error:'+ err);
			        return;
			    }     
			    callback(result);
		    });
		}
		 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		    console.log("连接成功！");
		    selectData(db, function(result) {
		        console.log(result);
		        if(result.length==1){
		        	console.log(result.length);
		        }
		        res.write(JSON.stringify(result)); //将对象转化为字符串
		        res.end();
		    	db.close();
		  	});
		});
    },
    //加入购物车
    addgoodscart:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var goodsid=params.goodsid;
    	var goodsname=params.goodsname;
    	var goodsimg=params.goodsimg;
    	var goodscolor=params.goodscolor;
    	var goodssize=params.goodssize;
    	var goodsnum=params.goodsnum;
    	var username=params.username;
    	var goodsprice=params.goodsprice;
    	var totalnum=params.totalnum;
    	var name=params.name;
		var selectData = function(db, callback) {  
			//连接到表  
			var collection = db.collection('goodscart');
			//查询数据
			var whereStr = {username:username,goodsid:goodsid,goodscolor:goodscolor,goodssize:goodssize,name:name};
			collection.find(whereStr).toArray(function(err, result) {
				if(err){
				    console.log('Error:'+ err);
				    return;
				}     
				    callback(result);
			});
		}
				 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("连接成功！");
			selectData(db, function(result) {
				console.log(result);
				if(result.length==0){
					//直接存入数据库，此商品以前没加入过购物车不需要做商品数量的累加
					var insertData = function(db, callback) {  
					    //连接到表 site
					    var collection = db.collection('goodscart');
					    //插入数据
					    var data = {"username":username,"goodsid":goodsid,"goodsimg":goodsimg,"goodscolor":goodscolor,"goodssize":goodssize,"goodsnum":goodsnum,"goodsname":goodsname,"goodsprice":goodsprice,"totalnum":totalnum,"name":name};
					    collection.insert(data, function(err, result) { 
					        if(err)
					        {
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					 
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    insertData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"0"}');
					        res.end();
					        db.close();
					    });
					});
				}else{
					var number=parseInt(result[0].goodsnum);
					goodsnum=parseInt(goodsnum)+number;
					console.log(number);
					var updateData = function(db, callback) {  
					    //连接到表  
					    var collection = db.collection('goodscart');
					    //更新数据
					    var whereStr = {"username":username,"goodsid":goodsid,"goodssize":goodssize,"goodscolor":goodscolor};
					    var updateStr = {$set: { "goodsnum" : goodsnum}};
					    collection.update(whereStr,updateStr, function(err, result) {
					        if(err)
					        {
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					 
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    updateData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"0"}');
					        res.end();
					        db.close();
					    });
					});
				}
				db.close();
			});
		});
    },
    getgoodsnum:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var username=params.username;
    	var num=0;
    	var selectData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('goodscart');
  			//查询数据
  			var whereStr = {"username":username};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			if(result.length==0){
    				res.write('{"number":"0"}');
    				res.end();
    			}else{
    				for(var i=0;i<result.length;i++){
    					num=num+parseInt(result[i].goodsnum);
    					console.log(num);
    				}
    				var obj={"number":num};
    				res.write(JSON.stringify(obj));
    				res.end();
    			}
    			db.close();
  			});
		});
    },
    goodscart:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var username=params.username;
    	var selectData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('goodscart');
  			//查询数据
  			var whereStr = {"username":username};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			if(result.length==0){
    				res.write('{"msg":"0"}');
    				res.end();
    			}else{
    				//result=JSON.stringify(result);
    				var obj={"msg":result}
    				res.write(JSON.stringify(obj));
    				res.end();
    			}
    			db.close();
  			});
		});
    },
    //改变购物车商品数据
    changenum:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var username=params.username;
    	var goodsid=params.goodsid;
    	var goodscolor=params.goodscolor;
    	var goodssize=params.goodssize;
    	var goodsnum=params.goodsnum;
    	var updateData = function(db, callback) {  
		    //连接到表  
		    var collection = db.collection('goodscart');
		    //更新数据
		    var whereStr = {username:username,goodsid:goodsid,goodscolor:goodscolor,goodssize:goodssize};
		    var updateStr = {$set: { goodsnum : goodsnum }};
		    collection.update(whereStr,updateStr, function(err, result) {
		        if(err)
		        {
		            console.log('Error:'+ err);
		            return;
		        }     
		        callback(result);
		    });
		}
		 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		    console.log("连接成功！");
		    updateData(db, function(result) {
		        console.log(result);
		        res.write('{"msg":"0"}');
		        res.end();
		        db.close();
		    });
		});
    },
    //删除购物车商品
    deletegoods:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var username=params.username;
    	var goodsid=params.goodsid;
    	var goodscolor=params.goodscolor;
    	var goodssize=params.goodssize;
    	console.log(username+"---"+goodsid+"---"+goodscolor+"---"+goodssize);
    	var delData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('goodscart');
  			//删除数据
  			var whereStr = {username:username,goodsid:goodsid,goodscolor:goodscolor,goodssize:goodssize};
  			collection.remove(whereStr, function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			delData(db, function(result) {
  				console.log("---------------------------------------------------");
    			console.log(result);
    			console.log("---------------------------------------------------");
    			res.write('{"msg":"0"}');
    			res.end();
    			db.close();
  			});
		});
    },
    //搜索
    searchgoods:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
    	var goodsname=params.goodsname;
    	if(goodsname==undefined){
    		goodsname="";
    	}
    	console.log(goodsname);
    	var selectData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('goodsinfo');
 			//查询数据
 			var str=eval("/"+goodsname+"/");
 			console.log(str+"------"+typeof str);
  			var whereStr = {h5:{$regex:str}}
  			console.log(whereStr);
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(typeof result+"&&&&&&&&&&&&&&&&&&&&&&&&");
    			console.log(result.length);
				var obj={'name':result}
    			res.write(JSON.stringify(obj));
    			res.end();
    			db.close();
  			});
		});
	},
	getgoodsid:function(req,res){
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var goodsname=params.goodsname;
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('goodsinfo');
  			//查询数据
  			var whereStr = {h5:goodsname};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			console.log(result.length);
    			if(result.length==1){
    				var obj={msg:result[0].goodsid}
	    			res.write(JSON.stringify(obj));
	    			res.end();
    			}else{
    				var selectData = function(db, callback) {  
			  			//连接到表  
			  			var collection = db.collection('goodsinfo');
			 			//查询数据
			 			var str=eval("/"+goodsname+"/");
			 			console.log(str+"------"+typeof str);
			  			var whereStr = {$or:[{h5:{$regex:str}},{h4:{$regex:str}},{h3:{$regex:str}}]};
			  			console.log(whereStr);
			  			collection.find(whereStr).toArray(function(err, result) {
			    			if(err){
			      				console.log('Error:'+ err);
			      				return;
			    			}     
			    			callback(result);
			  			});
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
			  			console.log("连接成功！");
			  			selectData(db, function(result) {
			    			console.log(typeof result+"&&&&&&&&&&&&&&&&&&&&&&&&");
			    			console.log(result.length);
			    			if(result.length==0){
			    				var obj={msg:"0"};
				    			res.write(JSON.stringify(obj));
				    			res.end();
			    			}else{
			    				var obj={msg:result};
				    			res.write(JSON.stringify(obj));
				    			res.end();
			    			}
			    			db.close();
			  			});
					});
    			}
    			db.close();
  			});
		});
	},
	//店铺列表
	shoplist:function(req,res){
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var shopid=params.shopid;
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('shoplist');
  			//查询数据
  			var whereStr = {shopid:shopid};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			console.log(result.length);
    			var obj={msg:result}
    			res.write(JSON.stringify(obj));
    			res.end();
    			db.close();
  			});
		});
	},
	//我的收藏
	myfavorite:function(req,res){
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var goodsid=params.goodsid;
		var goodsname=params.goodsname;
		var goodsprice=params.goodsprice;
		var goodsimg=params.goodsimg;
		var name=params.name;
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('myfavorite');
  			//查询数据
  			var whereStr = {username:username,goodsid:goodsid};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
 
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			console.log(result.length);
    			if(result.length==1){
    				res.write('{"msg":"0"}');
    				res.end();
    			}else{
    				var insertData = function(db, callback) {  
    					//连接到表 myfavorite
    					var collection = db.collection('myfavorite');
    					//插入数据
    					var data = {"username":username,"goodsid":goodsid,"goodsname":goodsname,"goodsprice":goodsprice,"goodsimg":goodsimg,"name":name};
    					collection.insert(data, function(err, result) { 
	        				if(err){
	            				console.log('Error:'+ err);
	            				return;
	        				}     
	        				callback(result);
	    				});
					}
 
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    insertData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"1"}');
					        res.end();
					        db.close();
					    });
					});
    			}
    			/*var obj={msg:result}
    			res.write(JSON.stringify(obj));
    			res.end();*/
    			db.close();
  			});
		});
	},
	getfavorite:function(req,res){
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('myfavorite');
  			//查询数据
  			var whereStr = {username:username};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result+"---111---111---111");
    			console.log(result.length);
    			res.write(JSON.stringify(result));
    			res.end();
    			db.close();
  			});
		});
	},
	//取消收藏
	delshoucang:function(req,res){
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var goodsid=params.goodsid;
		var delData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('myfavorite');
  			//删除数据
  			var whereStr = {"username":username,"goodsid":goodsid};
  			collection.remove(whereStr, function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			delData(db, function(result) {
    			console.log(result);
    			db.close();
  			});
		});
	},
	//商品列表女装
    getnvzhuang:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		console.log(leibie+"??????");
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={};
	  			collection.find(whereStr).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr = {leibie:{$regex:str}};
	  			collection.find(whereStr).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    getnvzhuangbyxiaoliang:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={};
	  			collection.find(whereStr).sort({xiaoliang:-1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr = {leibie:{$regex:str}};
	  			collection.find(whereStr).sort({xiaoliang:-1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    getnvzhuangbyshijian:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={};
	  			collection.find(whereStr).sort({days:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr = {leibie:{$regex:str}};
	  			collection.find(whereStr).sort({days:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    getnvzhuangbypricesheng:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={};
	  			collection.find(whereStr).sort({price2:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr = {leibie:{$regex:str}};
	  			collection.find(whereStr).sort({price2:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    getnvzhuangbypricejiang:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={};
	  			collection.find(whereStr).sort({price2:-1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr = {leibie:{$regex:str}};
	  			collection.find(whereStr).sort({price2:-1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    getnvzhuangbypricequjian:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var smallnum=params.smallnum;
		var bignum=params.bignum;
		var leibie=params.leibie;
		console.log(smallnum+"--"+bignum+"--"+leibie);
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var whereStr={"price2":{"$gte":smallnum,"$lte":bignum}};
	  			collection.find(whereStr).sort({price2:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	  			//var whereStr={$and:[{"price2":{"$gte":smallnum,"$lte":bignum}},{leibie:{$regex:str}}]};
	  			var whereStr={leibie:{$regex:str},"price2":{"$gte":smallnum,"$lte":bignum}};
	  			collection.find(whereStr).sort({price2:1}).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
		
    },
    userinfo:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var nicheng=params.nicheng;
		var realname=params.realname;
		var provice=params.provice;
		var city=params.city;
		var country=params.country;
		var tel=params.tel;
		var qqnum=params.qqnum;
		var selectData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('userinfo');
  			//查询数据
  			var whereStr = {"username":username};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			if(result.length==1){
    				var updateData = function(db, callback) {  
					    //连接到表  
					    var collection = db.collection('userinfo');
					    //更新数据
					    var whereStr = {"username":username};
					    var updateStr = {$set: {"nicheng":nicheng,"realname":realname,"provice":provice,"city":city,"country":country,"tel":tel,"qqnum":qqnum}};
					    collection.update(whereStr,updateStr, function(err, result) {
					        if(err){
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    updateData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"1"}');
					        res.end();
					        db.close();
					    });
					});
    			}else{
    				var insertData = function(db, callback) {  
					    //连接到表 userinfo
					    var collection = db.collection('userinfo');
					    //插入数据
					    var data = {"username":username,"nicheng":nicheng,"realname":realname,"provice":provice,"city":city,"country":country,"tel":tel,"qqnum":qqnum};
					    collection.insert(data, function(err, result) { 
					        if(err)
					        {
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    insertData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"1"}');
					        res.end();
					        db.close();
					    });
					});
    			}
    			db.close();
  			});
		});
   },
   getuserinfo:function(req,res){
   		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var selectData = function(db, callback) {  
		  	//连接到表  
		  	var collection = db.collection('userinfo');
		  	//查询数据
		  	var whereStr = {"username":username};
		  	collection.find(whereStr).toArray(function(err, result) {
		    	if(err){
		      		console.log('Error:'+ err);
		      		return;
		    	}     
		    	callback(result);
		  	});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		  	console.log("连接成功！");
		  	selectData(db, function(result) {
		    	console.log(result);
		    	res.write(JSON.stringify(result));
		    	res.end();
		    	db.close();
		  	});
		});
   	},
   	useraddress:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var shouhuoname=params.shouhuoname;
		var addjuti=params.addjuti;
		var provice=params.provice;
		var city=params.city;
		var country=params.country;
		var telnum=params.telnum;
		var zipcode=params.zipcode;
		var selectData = function(db, callback) {  
  			//连接到表  
  			var collection = db.collection('useraddress');
  			//查询数据
  			var whereStr = {"username":username};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result);
    			if(result.length==1){
    				var updateData = function(db, callback) {  
					    //连接到表  
					    var collection = db.collection('useraddress');
					    //更新数据
					    var whereStr = {"username":username};
					    var updateStr = {$set: {"shouhuoname":shouhuoname,"addjuti":addjuti,"provice":provice,"city":city,"country":country,"telnum":telnum,"zipcode":zipcode}};
					    collection.update(whereStr,updateStr, function(err, result) {
					        if(err){
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    updateData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"1"}');
					        res.end();
					        db.close();
					    });
					});
    			}else{
    				var insertData = function(db, callback) {  
					    //连接到表 useraddress
					    var collection = db.collection('useraddress');
					    //插入数据
					    var data = {"username":username,"shouhuoname":shouhuoname,"addjuti":addjuti,"provice":provice,"city":city,"country":country,"telnum":telnum,"zipcode":zipcode};
					    collection.insert(data, function(err, result) { 
					        if(err)
					        {
					            console.log('Error:'+ err);
					            return;
					        }     
					        callback(result);
					    });
					}
					MongoClient.connect(DB_CONN_STR, function(err, db) {
					    console.log("连接成功！");
					    insertData(db, function(result) {
					        console.log(result);
					        res.write('{"msg":"1"}');
					        res.end();
					        db.close();
					    });
					});
    			}
    			db.close();
  			});
		});
   	},
   	getuseraddress:function(req,res){
   		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var username=params.username;
		var selectData = function(db, callback) {  
		  	//连接到表  
		  	var collection = db.collection('useraddress');
		  	//查询数据
		  	var whereStr = {"username":username};
		  	collection.find(whereStr).toArray(function(err, result) {
		    	if(err){
		      		console.log('Error:'+ err);
		      		return;
		    	}     
		    	callback(result);
		  	});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		  	console.log("连接成功！");
		  	selectData(db, function(result) {
		    	console.log(result);
		    	res.write(JSON.stringify(result));
		    	res.end();
		    	db.close();
		  	});
		});
   	},
   	gettuijiangoods:function(req,res){
   		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var params = url.parse(req.url, true).query;
		var goodsid=params.goodsid;
		console.log(goodsid);
		var selectData = function(db, callback) {  
		  	//连接到表  
		  	var collection = db.collection('goodsinfo');
		  	//查询数据
		  	var whereStr = {"goodsid":goodsid};
		  	collection.find(whereStr).toArray(function(err, result) {
		    	if(err){
		      		console.log('Error:'+ err);
		      		return;
		    	}     
		    	callback(result);
		  	});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		  	console.log("连接成功！");
		  	selectData(db, function(result) {
		    	console.log(result);
				console.log(result[0].h4);
				var str1=result[0].h4;
				var selectData = function(db, callback) {  
				  	//连接到表  
				  	var collection = db.collection('goodsinfo');
				  	//查询数据
				  	var str=eval("/"+str1+"/");
			 		console.log(str+"------"+typeof str);
			  		var whereStr = {$or:[{h4:{$regex:str}},{h5:{$regex:str}}]};
				  	collection.find(whereStr).toArray(function(err, result) {
				    	if(err){
				      		console.log('Error:'+ err);
				      		return;
				    	}     
				    	callback(result);
				  	});
				}
				MongoClient.connect(DB_CONN_STR, function(err, db) {
				  	console.log("连接成功！");
				  	selectData(db, function(result) {
				    	console.log(result);
				    	res.write(JSON.stringify(result));
				    	res.end();
				    	db.close();
				  	});
				});
		    	db.close();
		  	});
		});
   	},
   	getnvzhuang2:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		var arg1=params.arg1;
		console.log(leibie+"??????");
		if(leibie=="0"){
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+arg1+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr ={leibie:{$regex:str}};
	  			collection.find(whereStr).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}else{
			var selectData = function(db, callback) {  
	  			//连接到表  
	 	 		var collection = db.collection('goodslist');
	  			//查询数据
	  			var str=eval("/"+leibie+"/");
	  			var str1=eval("/"+arg1+"/");
	 			console.log(str+"------"+typeof str);
	  			var whereStr ={$and:[{leibie:{$regex:str}},{leibie:{$regex:str1}}]};
	  			collection.find(whereStr).toArray(function(err, result) {
	    			if(err){
	      				console.log('Error:'+ err);
	      				return;
	    			}     
	    			callback(result);
	  			});
			}
			MongoClient.connect(DB_CONN_STR, function(err, db) {
	  			console.log("连接成功！");
	  			selectData(db, function(result) {
	    			console.log(result+"---111---111---111");
	    			console.log(result.length);
	    			res.write(JSON.stringify(result));
	    			res.end();
	    			db.close();
	  			});
			});
		}
    },
    getnvzhuang3:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		var arg1=params.arg1;
		var arg2=params.arg2;
		console.log(leibie+"??????");       
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('goodslist');
  			//查询数据
  			var str=eval("/"+leibie+"/");
  			var str1=eval("/"+arg1+"/");
  			var str2=eval("/"+arg2+"/");
 			console.log(str+"------"+typeof str);
  			var whereStr ={$and:[{leibie:{$regex:str}},{leibie:{$regex:str1}},{leibie:{$regex:str2}}]};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result+"---111---111---111");
    			console.log(result.length);
    			res.write(JSON.stringify(result));
    			res.end();
    			db.close();
  			});
		});
    },
    getnvzhuang4:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		var arg1=params.arg1;
		var arg2=params.arg2;
		var arg3=params.arg3;
		console.log(leibie+"??????");       
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('goodslist');
  			//查询数据
  			var str=eval("/"+leibie+"/");
  			var str1=eval("/"+arg1+"/");
  			var str2=eval("/"+arg2+"/");
  			var str3=eval("/"+arg3+"/");
 			console.log(str+"------"+typeof str);
  			var whereStr ={$and:[{leibie:{$regex:str}},{leibie:{$regex:str1}},{leibie:{$regex:str2}},{leibie:{$regex:str3}}]};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result+"---111---111---111");
    			console.log(result.length);
    			res.write(JSON.stringify(result));
    			res.end();
    			db.close();
  			});
		});
    },
    getnvzhuang5:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		var arg1=params.arg1;
		var arg2=params.arg2;
		var arg3=params.arg3;
		var arg4=params.arg4;
		console.log(leibie+"??????");       
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('goodslist');
  			//查询数据
  			var str=eval("/"+leibie+"/");
  			var str1=eval("/"+arg1+"/");
  			var str2=eval("/"+arg2+"/");
  			var str3=eval("/"+arg3+"/");
  			var str4=eval("/"+arg4+"/");
 			console.log(str+"------"+typeof str);
  			var whereStr ={$and:[{leibie:{$regex:str}},{leibie:{$regex:str1}},{leibie:{$regex:str2}},{leibie:{$regex:str3}},{leibie:{$regex:str4}}]};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result+"---111---111---111");
    			console.log(result.length);
    			res.write(JSON.stringify(result));
    			res.end();
    			db.close();
  			});
		});
    },
    getnvzhuang6:function(req,res){
    	res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    	/*str=fs.readFileSync('goodslist.txt');
  		res.write(str);
		res.end();*/
		var params = url.parse(req.url, true).query;
		var leibie=params.leibie;
		var arg1=params.arg1;
		var arg2=params.arg2;
		var arg3=params.arg3;
		var arg4=params.arg4;
		var arg5=params.arg5;
		console.log(leibie+"??????");       
		var selectData = function(db, callback) {  
  			//连接到表  
 	 		var collection = db.collection('goodslist');
  			//查询数据
  			var str=eval("/"+leibie+"/");
  			var str1=eval("/"+arg1+"/");
  			var str2=eval("/"+arg2+"/");
  			var str3=eval("/"+arg3+"/");
  			var str4=eval("/"+arg4+"/");
  			var str5=eval("/"+arg5+"/");
 			console.log(str+"------"+typeof str);
  			var whereStr ={$and:[{leibie:{$regex:str}},{leibie:{$regex:str1}},{leibie:{$regex:str2}},{leibie:{$regex:str3}},{leibie:{$regex:str4}},{leibie:{$regex:str5}}]};
  			collection.find(whereStr).toArray(function(err, result) {
    			if(err){
      				console.log('Error:'+ err);
      				return;
    			}     
    			callback(result);
  			});
		}
		MongoClient.connect(DB_CONN_STR, function(err, db) {
  			console.log("连接成功！");
  			selectData(db, function(result) {
    			console.log(result+"---111---111---111");
    			console.log(result.length);
    			res.write(JSON.stringify(result));
    			res.end();
    			db.close();
  			});
		});
    }
}