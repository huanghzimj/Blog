

// 顶部小轮播





$(function() {
  var $login = $('#login');
  var $register = $('#register');
  var $userInfo = $('#userInfo');

  $login.find('a.colMint').on('click', function() {
    $register.show();
    $login.hide();
  });

  $register.find('a.colMint').on('click', function() {
    $login.show();
    $register.hide();
  });

  $register.find('button').on('click', function() {
     if($register.find('[name="username"]').val().length>4){

         $.ajax({
             type: 'post',
             url: '/api/user/register',
             data: {
                 username: $register.find('[name="username"]').val(),
                 name: $register.find('[name="name"]').val(),
                 password: $register.find('[name="password"]').val(),
                 repassword: $register.find('[name="repassword"]').val()
             },
             dataType: 'json',
             success: function(result) {
                 $register.find('.colWarning').html(result.message);


                 if (!result.code) {
                     setTimeout(function() {
                         $login.show();
                         $register.hide();
                     }, 1000);
                 }
             }
         });
     }
     else{
         $register.find('.colWarning').html('注册账号应大于5位数');
     }


  });

  $login.find('button').on('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        username: $login.find('[name="username"]').val(),
        password: $login.find('[name="password"]').val()
      },
      dataType: 'json',
      success: function(result) {
          $login.find('.colWarning').html(result.message);
          if (!result.code) {
              // 登陆成功
              window.location.reload();


          }

      }

    });


  });


  // logoutBtn
  $('#logoutBtn').on('click', function () {
    $.ajax({
      url: '/api/user/logout',
      success: function(result) {
        if (!result.code) {
          window.location.reload();
        }
      }
    });
  });

});
// // 轮播图
$(".w385 li:not(li:eq(0))") .css('display','none');
var a=0;
$(".next_vr").click(function(){
    if(a==0){
        $(".w385 li:eq(1)") .css('display','block');
        $(".w385 li:not(li:eq(1))") .css('display','none');
        a++;
        return;
    }
    if(a==1){
        $(".w385 li:eq(2)") .css('display','block');
        $(".w385 li:not(li:eq(2))") .css('display','none');
        a++;
        return;
    }

    if(a==2){
        $(".w385 li:eq(3)") .css('display','block');
        $(".w385 li:not(li:eq(3))") .css('display','none');
        a++;

        return;
    }


    if(a==3){
        $(".w385 li:eq(4)") .css('display','block');
        $(".w385 li:not(li:eq(4))") .css('display','none');
        a++;

        return;

    }

    if(a==4){
        $(".w385 li:eq(0)") .css('display','block');
        $(".w385 li:not(li:eq(0))") .css('display','none');
        a=0;

        return;

    }



});
$(".prev_vr").click(function(){
    if(a==4){
        $(".w385 li:eq(3)") .css('display','block');
        $(".w385 li:not(li:eq(3))") .css('display','none');
        a--;

        return;
    }
    if(a==3){
        $(".w385 li:eq(2)") .css('display','block');
        $(".w385 li:not(li:eq(2))") .css('display','none');
        a--;

        return;
    }
    if(a==2){
        $(".w385 li:eq(1)") .css('display','block');
        $(".w385 li:not(li:eq(1))") .css('display','none');
        a--;

        return;
    }
    if(a==1){
        $(".w385 li:eq(0)") .css('display','block');
        $(".w385 li:not(li:eq(0))") .css('display','none');
        a--

        return;
    }
    if(a==0){
        $(".w385 li:eq(4)") .css('display','block');
        $(".w385 li:not(li:eq(4))") .css('display','none');
        a=4

        return;
    }



});

function dingshiqi(){
    a++;
    $(".w385 li:eq("+a+")") .css('display','block');
    $(".w385 li:not(li:eq("+a+"))") .css('display','none');
    if(a==4){
        a=-1;

        return;

    }

}

var timer=setInterval(dingshiqi,3000)
$('.smzdm_c').mousemove(function(){
    clearInterval(timer);
})
$('.smzdm_c').mouseout(function(){

    timer=setInterval(dingshiqi,3000)

})


$(window).ready(function(){

    $('.foot-box-1').fadeIn(100);
    $('.center-top1-foot-li-1').click(function(){
        // $('.foot-box-1').css('display','block');
        $('.foot-box-2').css('display','none');
        $('.foot-box-3').css('display','none');
        $('.foot-box-4').css('display','none');
        $('.foot-box-1').fadeIn(500);

    })

    $('.center-top1-foot-li-2').click(function(){
        $('.foot-box-1').css('display','none');
        $('.foot-box-2').fadeIn(500);
        $('.foot-box-3').css('display','none');
        $('.foot-box-4').css('display','none');

    })
    $('.center-top1-foot-li-3').click(function(){
        $('.foot-box-1').css('display','none');
        $('.foot-box-2').css('display','none');
        $('.foot-box-3').fadeIn(500);
        $('.foot-box-4').css('display','none');

    })
    $('.center-top1-foot-li-4').click(function(){
        $('.foot-box-1').css('display','none');
        $('.foot-box-2').css('display','none');
        $('.foot-box-3').css('display','none');
        $('.foot-box-4').fadeIn(500);

    })


});



