
//引入服务器模块
var http=require("http");
//引入文件操作模块
var fs=require('fs');
//引入一个路径模块
var url =require("url");

//引入处理上传文件信息的模块
var Formidable=require('formidable');
//创建一个服务器

 var server=http.createServer(function(req,res){

    var urlStr=req.url;
     var urlobj=url.parse(urlStr,true);
     if(urlobj.pathname="/"||urlobj.pathname=="/upload.html"){
         //创建可读流
         var rs=fs.createReadStream("upload.html");
         //把可读流返回给前端，前端接收之后，会解析掉，在浏览其里会直接显示页面
         rs.pipe(res);



     }
     else if(urlobj.pathname=="/upload"){
        var form=new Formidable.IncomingForm();
         form.parse(req,function(err,fields,files){
       //file:前端传过来的文件详情，
             //获取上次的临时路径
             var temPath=files.file.path;
             //有了临时路径后，将临时路径以可读流方式读出来
             //然后再找一个文件夹存进去
             var rs=fs.createReadStream(tempPath);
             //创建可写流
             var ws= fs.createWriteStream('./'+files.file.name);
          rs.pipe(ws);
         })
     }

});
server.listen(8888,function(){
    console.log("服务器启动成功")
})
