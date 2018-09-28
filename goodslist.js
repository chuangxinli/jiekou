//var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test'; // 数据库为 test
 
var insertData = function(db, callback) {  
    //连接到表 goodsinfo
    var collection = db.collection('goodslist');
    //插入数据
    //var data=fs.readFileSync('goodsinfo.txt');
    var data = [
{"src":"images/xiangqing1-01.jpg","price":"￥55","time":"近6天上新","fangshi":"打包","infor":"2017 冬季新款韩系甜美小清新百搭气质蝴蝶结绑带兔绒毛衣 女","goodsid":"1","days":"020","xiaoliang":"02000","price2":"00000055","leibie":"女装毛衣女士针织衫高档甜美装雪纺衫涤纶"},
{"src":"images/xp-2.jpg","price":"￥56","time":"近5天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"2","days":"029","xiaoliang":"03000","price2":"00000056","leibie":"女装连衣裙中档精致高贵淑女装连衣裙合成纤维蕾丝花边"},
{"src":"images/xp-3.jpg","price":"￥888","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"3","days":"008","xiaoliang":"02500","price2":"00000888","leibie":"女装裤子低档休闲随意纯棉破洞复合"},
{"src":"images/xp-4.jpg","price":"￥59","time":"近2天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"4","days":"055","xiaoliang":"02090","price2":"00000059","leibie":"包包单肩包单肩皮包"},
{"src":"images/xp-5.jpg","price":"￥77","time":"近3天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"5","days":"002","xiaoliang":"02890","price2":"00000077","leibie":"女装裤子高档精致高贵文艺个性套装"},
{"src":"images/xp-6.jpeg","price":"￥66","time":"近16天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"6","days":"021","xiaoliang":"01000","price2":"00000066","leibie":"女装裤子中档休闲随意前卫潮女套装涤纶破洞"},
{"src":"images/xp-7.jpeg","price":"￥67","time":"近2天上新","fangshi":"拿货","infor":"2017秋款新品","goodsid":"7","days":"005","xiaoliang":"02330","price2":"00000067","leibie":"女装短袖女士T恤低档甜美装休闲随意T恤棉麻"},
{"src":"images/xp-8.jpg","price":"￥99","time":"近6天上新","fangshi":"打包","infor":"2017秋款新品","goodsid":"8","days":"010","xiaoliang":"02111","price2":"00000099","leibie":"男装男士运动服低档清纯帅气休闲随意夹克氨纶纯色"},
{"src":"images/xp-9.jpeg","price":"￥15","time":"近4天上新","fangshi":"拿货","infor":"2017秋款新品","goodsid":"9","days":"011","xiaoliang":"03110","price2":"00000015","leibie":"女装女士背心高档休闲随意腈纶"},
{"src":"images/xp-10.jpg","price":"￥89","time":"近3天上新","fangshi":"打包","infor":"2017秋款新品","goodsid":"10","days":"100","xiaoliang":"01111","price2":"00000089","leibie":"女装女士连衣裙女装夏季新款中档精致高贵淑女装连衣裙合成纤维印花"},
{"src":"images/xp-11.jpg","price":"￥79","time":"近2天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"11","days":"101","xiaoliang":"02009","price2":"00000079","leibie":"女装女士毛衣女士毛织衫低档淑女装文艺个性毛衣纯棉"},
{"src":"images/xp-12.jpg","price":"￥95","time":"近1天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"12","days":"015","xiaoliang":"02020","price2":"00000095","leibie":"女装女士毛衣女士毛织衫低档淑女装文艺个性毛衣纯棉"},
{"src":"images/xp-13.jpg","price":"￥755","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"13","days":"014","xiaoliang":"00800","price2":"00000755","leibie":"女士包包皮包"},
{"src":"images/xp-14.jpg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"14","days":"033","xiaoliang":"00200","price2":"00000088","leibie":"男装男士短袖男士T恤衬衫男士衬衫低档稳重正装文艺个性丝光棉"},
{"src":"images/xp-15.jpg","price":"￥87","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"15","days":"044","xiaoliang":"00100","price2":"00000087","leibie":"女装女士裤子女士休闲裤子高档休闲随意精致高贵套装腈纶"},
{"src":"images/xp-16.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"16","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"女装T恤女士短袖女士T恤女装夏季新款中档休闲随意文艺个性T恤复合"},
{"src":"images/xp-17.png","price":"￥355","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"17","days":"014","xiaoliang":"00330","price2":"00000355","leibie":"女装女士裤子低档休闲随意纯棉"},
{"src":"images/xp-18.jpg","price":"￥46","time":"近1天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"18","days":"023","xiaoliang":"02055","price2":"00000046","leibie":"男装男士短袖男士T恤高档休闲随意棉麻印花"},
{"src":"images/xp-19.jpg","price":"￥133","time":"近1天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"19","days":"041","xiaoliang":"04100","price2":"00000133","leibie":"女士包包单肩包斜挎包"},
{"src":"images/xp-20.jpg","price":"￥155","time":"近3天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"20","days":"020","xiaoliang":"02080","price2":"00000155","leibie":"女士内裤"},
{"src":"images/xp-21.jpg","price":"￥456","time":"近5天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"21","days":"066","xiaoliang":"09000","price2":"00000456","leibie":"女装女士裤子女士牛仔裤低档休闲随意前卫潮女棉麻"},
{"src":"images/xp-22.jpg","price":"￥955","time":"近1天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"22","days":"067","xiaoliang":"10000","price2":"00000955","leibie":"女装女士裤子女士牛仔裤中档休闲随意前卫潮女棉麻"},
{"src":"images/xp-23.jpg","price":"￥255","time":"近2天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"23","days":"068","xiaoliang":"07800","price2":"00000255","leibie":"女装女士休闲裤女士漏洞库"},
{"src":"images/xp-24.jpg","price":"￥421","time":"近3天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"24","days":"069","xiaoliang":"07200","price2":"00000421","leibie":"女士皮包挎包女士单肩包女士斜挎包"},
{"src":"images/banner1-5.jpg","price":"￥55","time":"近6天上新","fangshi":"打包","infor":"2017 冬季新款韩系甜美小清新百搭气质蝴蝶结绑带兔绒毛衣 女","goodsid":"25","days":"020","xiaoliang":"02000","price2":"00000077","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-6.jpg","price":"￥56","time":"近5天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"26","days":"029","xiaoliang":"03000","price2":"00000066","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉纯色"},
{"src":"images/banner1-7.jpg","price":"￥888","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"27","days":"008","xiaoliang":"02500","price2":"00000067","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-8.jpg","price":"￥59","time":"近2天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"28","days":"055","xiaoliang":"02090","price2":"00000099","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-9.jpg","price":"￥77","time":"近3天上新","fangshi":"散批","infor":"供应秋款新品","goodsid":"29","days":"002","xiaoliang":"02890","price2":"00000015","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-10.jpg","price":"￥66","time":"近16天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"30","days":"021","xiaoliang":"01000","price2":"00000089","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-11.jpg","price":"￥67","time":"近2天上新","fangshi":"拿货","infor":"2017秋款新品","goodsid":"31","days":"005","xiaoliang":"02330","price2":"00000079","leibie":"男装男士短袖男士T恤中档前卫潮男纯棉字母"},
{"src":"images/banner1-12.jpg","price":"￥99","time":"近6天上新","fangshi":"打包","infor":"2017秋款新品","goodsid":"32","days":"010","xiaoliang":"02111","price2":"00000095","leibie":"男装男士短袖男士T恤高档清纯帅气稳重正装亚麻纯色"},
{"src":"images/banner1-13.jpg","price":"￥15","time":"近4天上新","fangshi":"拿货","infor":"2017秋款新品","goodsid":"33","days":"011","xiaoliang":"03110","price2":"00000055","leibie":"童装男童衬衫男士短袖男士T恤高档前卫潮男合成纤维字母小童(3-4)1-100元"},
{"src":"images/banner1-14.jpg","price":"￥89","time":"近3天上新","fangshi":"打包","infor":"2017秋款新品","goodsid":"34","days":"100","xiaoliang":"01111","price2":"00000089","leibie":"童装男童短袖男童T恤儿童套装高档前卫潮男合成纤维字母小童(3-4)1-100元"},
{"src":"images/banner1-15.jpg","price":"￥79","time":"近2天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"35","days":"101","xiaoliang":"02009","price2":"00000079","leibie":"童装男童短袖男童T恤小童(3-4)1-100元"},
{"src":"images/banner1-16.jpg","price":"￥95","time":"近1天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"36","days":"015","xiaoliang":"02020","price2":"00000095","leibie":"童装男童短袖男童T恤儿童套装小童(3-4)1-100元"},
{"src":"images/banner1-1.jpg","price":"￥755","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"37","days":"014","xiaoliang":"00800","price2":"00000755","leibie":"男装男士短袖男士T恤"},
{"src":"images/banner1-2.jpg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"38","days":"033","xiaoliang":"00200","price2":"00000088","leibie":"男装男士短袖男士T恤高档前卫潮男合成纤维字母"},
{"src":"images/banner1-3.jpg","price":"￥87","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"39","days":"044","xiaoliang":"00100","price2":"00000087","leibie":"男装男士短袖男士T恤高档前卫潮男合成纤维字母"},
{"src":"images/banner1-4.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"40","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"男装男士短袖男士T恤高档前卫潮男合成纤维字母"},
{"src":"images/bao-1.jpg","price":"￥755","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"505","days":"014","xiaoliang":"00800","price2":"00000755","leibie":"女士包包皮包女士手拿包手提包"},
{"src":"images/bao-2.jpg","price":"￥288","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"506","days":"033","xiaoliang":"00200","price2":"00000288","leibie":"女士包包女士帆布包女士手拿包女士手提包"},
{"src":"images/bao-3.jpg","price":"￥487","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"507","days":"044","xiaoliang":"00100","price2":"00000487","leibie":"女士包皮包女士钱包"},
{"src":"images/bao-4.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"508","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"男士包男士皮包男士钱包"},
{"src":"images/neiyi-1.jpg","price":"￥355","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"509","days":"014","xiaoliang":"00800","price2":"00000355","leibie":"内衣女女士睡衣氨纶"},
{"src":"images/neiyi-2.jpeg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"510","days":"033","xiaoliang":"00200","price2":"00000088","leibie":"内衣女士内衣女士睡衣纯棉"},
{"src":"images/neiyi-3.jpg","price":"￥487","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"511","days":"044","xiaoliang":"00100","price2":"00000487","leibie":"内衣女士胸罩文胸蕾丝"},
{"src":"images/neiyi-4.png","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"512","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"内衣袜子纯棉"},
{"src":"images/tong-1.jpg","price":"￥355","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"513","days":"094","xiaoliang":"00800","price2":"00000355","leibie":"女童裙子女士童装女童装裙子01女童裙装小童(3-4)300-400元"},
{"src":"images/tong-2.jpg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"514","days":"033","xiaoliang":"00200","price2":"00000088","leibie":"女士童装裤子女童牛仔裤童套装小童(3-4)1-100元"},
{"src":"images/tong-3.jpg","price":"￥487","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"515","days":"044","xiaoliang":"00100","price2":"00000487","leibie":"女童童装裙子女童裙装儿童套装小童(3-4)400元以上女童裙子"},
{"src":"images/tong-4.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"516","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"女童裙子童装童装短袖女士女童短袖童套装儿童套装女童套装小童(3-4)1-100元"},
{"src":"images/xie-1.jpeg","price":"￥355","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"517","days":"014","xiaoliang":"00110","price2":"00000355","leibie":"女士鞋子女士凉鞋01皮质牛皮中跟"},
{"src":"images/xie-2.jpeg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"518","days":"033","xiaoliang":"00200","price2":"00000088","leibie":"女士鞋子女士凉鞋02皮质拖鞋中跟"},
{"src":"images/xie-3.jpg","price":"￥487","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"519","days":"044","xiaoliang":"00100","price2":"00000487","leibie":"女士鞋子女士凉鞋03凉鞋皮革低跟"},
{"src":"images/xie-4.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"520","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"男士鞋子运动鞋男士休闲鞋男士板鞋男生单鞋运动鞋皮革低跟"},
{"src":"images/yishi-1.jpg","price":"￥355","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"521","days":"014","xiaoliang":"00110","price2":"00000355","leibie":"衣饰墨镜潮流眼镜"},
{"src":"images/yishi-2.jpg","price":"￥88","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"522","days":"063","xiaoliang":"00200","price2":"00000088","leibie":"衣饰腰带男士腰带皮带"},
{"src":"images/yishi-3.jpg","price":"￥487","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"523","days":"044","xiaoliang":"00100","price2":"00000487","leibie":"衣饰男士领带男领带"},
{"src":"images/yishi-4.jpg","price":"￥96","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"524","days":"055","xiaoliang":"00020","price2":"00000096","leibie":"衣饰手表机械手表"},
{"src":"images/yishi-5.jpg","price":"￥455","time":"近6天上新","fangshi":"拿货","infor":"供应秋款新品","goodsid":"525","days":"04","xiaoliang":"00010","price2":"00000455","leibie":"衣饰墨镜潮流眼镜"},
{"src":"images/yishi-6.jpg","price":"￥68","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"526","days":"033","xiaoliang":"00400","price2":"00000068","leibie":"衣饰腰带男士腰带皮带"},
{"src":"images/yishi-7.jpg","price":"￥787","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"527","days":"024","xiaoliang":"00800","price2":"00000787","leibie":"衣饰男士手表机械手表"},
{"src":"images/yishi-8.jpg","price":"￥99","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"528","days":"075","xiaoliang":"00030","price2":"00000099","leibie":"衣饰男士领带男领带"},
{"src":"images/neiyi-5.jpg","price":"￥188","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"529","days":"013","xiaoliang":"00210","price2":"00000188","leibie":"内衣女士内衣女士内裤蕾丝"},
{"src":"images/neiyi-6.jpeg","price":"￥287","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"530","days":"024","xiaoliang":"00110","price2":"00000287","leibie":"内衣袜子男士袜子女士袜子纯棉"},
{"src":"images/banshenqun-1.jpg","price":"￥781","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"531","days":"022","xiaoliang":"00300","price2":"00000781","leibie":"女装女士半身裙裙子女装夏季新款高档精致高贵甜美装合成纤维蕾丝花边"},
{"src":"images/banshenqun-2.jpeg","price":"￥91","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"532","days":"075","xiaoliang":"00030","price2":"00000091","leibie":"女装女士半身裙裙子女装夏季新款中档精致高贵前卫潮女包臀复合"},
{"src":"images/shishang-1.jpeg","price":"￥181","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"533","days":"012","xiaoliang":"00211","price2":"00000181","leibie":"女装女时尚套装短裙裙子女装夏季新款精致高贵高档淑女装棉麻半身裙"},
{"src":"images/shishang-2.jpg","price":"￥281","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"534","days":"014","xiaoliang":"00111","price2":"00000281","leibie":"女装女时尚套装短裙裙子女装夏季新款半身裙高档纯棉淑女装前卫潮女"},
{"src":"images/njk-1.jpg","price":"￥717","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"535","days":"021","xiaoliang":"00810","price2":"00000717","leibie":"男装男士夹克男外套男士外套高档休闲随意文艺个性夹克丝光棉"},
{"src":"images/njk-2.jpg","price":"￥919","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"536","days":"075","xiaoliang":"00031","price2":"00000919","leibie":"男装男士夹克男外套男士外套高档休闲随意文艺个性夹克丝光棉"},
{"src":"images/nzzs-1.jpg","price":"￥118","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"537","days":"013","xiaoliang":"00110","price2":"00000118","leibie":"男装男针织衫男士毛衣男毛衣高档商务休闲纯棉"},
{"src":"images/nzzs-2.jpg","price":"￥217","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"538","days":"024","xiaoliang":"00111","price2":"00000217","leibie":"男装男针织衫男士毛衣男毛衣高档商务休闲纯棉纯色"},
{"src":"images/nnzk-1.jpg","price":"￥780","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"539","days":"0229","xiaoliang":"00301","price2":"00000780","leibie":"男装男士裤子男士牛仔裤男牛仔裤低档前卫潮男清纯帅气牛仔裤涤纶"},
{"src":"images/nnzk-2.jpg","price":"￥93","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"540","days":"074","xiaoliang":"00039","price2":"00000093","leibie":"男装男士裤子男士牛仔裤男牛仔裤低档前卫潮男清纯帅气牛仔裤涤纶"},
{"src":"images/nxxk-1.jpg","price":"￥180","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"541","days":"012","xiaoliang":"00210","price2":"00000180","leibie":"男装男士裤子男士休闲裤男休闲裤高档时尚正装休闲裤丝光棉纯色"},
{"src":"images/nxxk-2.jpg","price":"￥280","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"542","days":"017","xiaoliang":"00112","price2":"00000280","leibie":"男装男士裤子男士休闲裤男休闲裤低档时尚正装休闲裤丝光棉印花"},
{"src":"images/twy-1.jpg","price":"￥118","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"543","days":"013","xiaoliang":"00110","price2":"00000118","leibie":"童装男童卫衣男童秋衣小童(3-4)100-200元"},
{"src":"images/twy-2.jpeg","price":"￥217","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"544","days":"024","xiaoliang":"00111","price2":"00000217","leibie":"童装女童卫衣女童秋衣小童(3-4)200-300元"},
{"src":"images/ssb-1.jpg","price":"￥780","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"545","days":"0229","xiaoliang":"00301","price2":"00000780","leibie":"箱包男士双肩包男生双肩包男双肩包"},
{"src":"images/ssb-2.jpeg","price":"￥93","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"546","days":"074","xiaoliang":"00039","price2":"00000093","leibie":"箱包女士双肩包女生双肩包女双肩包"},
{"src":"images/xie-5.jpg","price":"￥180","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"547","days":"012","xiaoliang":"00210","price2":"00000180","leibie":"鞋子男士运动鞋男士帆布鞋男士球鞋男士休闲鞋男生板鞋男生单鞋男生低帮鞋平跟"},
{"src":"images/xie-6.jpg","price":"￥280","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"548","days":"017","xiaoliang":"00112","price2":"00000280","leibie":"鞋子女士运动鞋女士球鞋女生板鞋女生单鞋女生低帮鞋板鞋皮革低跟"},
{"src":"images/xiangg-1.jpg","price":"￥118","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"549","days":"013","xiaoliang":"00110","price2":"00000118","leibie":"箱包行李箱旅行箱"},
{"src":"images/xiangg-2.jpg","price":"￥217","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"550","days":"024","xiaoliang":"00111","price2":"00000217","leibie":"箱包行李箱旅行箱"},
{"src":"images/pixie-1.jpeg","price":"￥780","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"551","days":"0229","xiaoliang":"00301","price2":"00000780","leibie":"鞋类男士皮鞋男士休闲皮鞋男皮鞋皮鞋真皮皮质平跟"},
{"src":"images/pixie-2.jpeg","price":"￥93","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"552","days":"074","xiaoliang":"00039","price2":"00000093","leibie":"鞋类男士皮鞋男士休闲皮鞋男皮鞋皮鞋真皮皮质平跟"},
{"src":"images/tuoxie-1.jpg","price":"￥180","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"553","days":"012","xiaoliang":"00210","price2":"00000180","leibie":"鞋类女士拖鞋鞋子平跟"},
{"src":"images/tuoxie-2.jpeg","price":"￥280","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"554","days":"017","xiaoliang":"00112","price2":"00000280","leibie":"鞋类男士拖鞋鞋子男生拖鞋平跟"},
{"src":"images/ershi-1.jpg","price":"￥1118","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"555","days":"083","xiaoliang":"01110","price2":"000001118","leibie":"衣饰耳饰女士耳饰女耳饰耳环"},
{"src":"images/ershi-2.jpg","price":"￥2217","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"556","days":"024","xiaoliang":"06111","price2":"00002217","leibie":"衣饰耳饰女士耳饰女耳饰耳环"},
{"src":"images/maozi-1.jpg","price":"￥780","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"557","days":"0229","xiaoliang":"00301","price2":"00000780","leibie":"衣饰帽子女士帽子男士帽子"},
{"src":"images/maozi-2.jpg","price":"￥93","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"557","days":"074","xiaoliang":"00039","price2":"00000093","leibie":"衣饰帽子女士帽子男士帽子"},
{"src":"images/shoulian-1.jpg","price":"￥180","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"559","days":"012","xiaoliang":"00210","price2":"00000180","leibie":"衣饰女士手链女手链"},
{"src":"images/shoulian-2.jpg","price":"￥280","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"560","days":"017","xiaoliang":"00112","price2":"00000280","leibie":"衣饰女士手链女手链"},
{"src":"images/xianglian-1.jpg","price":"￥1118","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"561","days":"083","xiaoliang":"01110","price2":"000001118","leibie":"衣饰女士项链"},
{"src":"images/xianglian-2.jpg","price":"￥2217","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"562","days":"024","xiaoliang":"06111","price2":"00002217","leibie":"衣饰女士项链"},
{"src":"images/nanchenshan-1.jpg","price":"￥93","time":"近3天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"563","days":"074","xiaoliang":"00039","price2":"00000093","leibie":"男装男士衬衣男士衬衫高档稳重正装衬衫合成纤维"},
{"src":"images/shuiqun-1.jpeg","price":"￥180","time":"近4天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"564","days":"012","xiaoliang":"00210","price2":"00000180","leibie":"女装睡裙女士睡裙裙子内衣女士睡衣高档精致高贵连衣裙腈纶蕾丝花边氨纶"},
{"src":"images/shuiqun-2.jpeg","price":"￥280","time":"近6天上新","fangshi":"打包","infor":"供应秋款新品","goodsid":"565","days":"017","xiaoliang":"00112","price2":"00000280","leibie":"女装睡裙女士睡裙裙子内衣高档精致高贵连衣裙腈纶氨纶"}
];
    console.log(data);
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
        db.close();
    });
});
