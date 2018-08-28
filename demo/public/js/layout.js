
$(function() {
    var $login = $('#login');
    var $register = $('#register');
    //注册
    $register.find('.btn-zhuce').on('click', function() {

        if($register.find('[name="username"]').val().length>5){
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

                    alert(result.message);


                }
            });
        }
        else{
            alert('注册账号应大于6位数');
        }
    });
//登录
    $login.find('.btn-denglu').on('click', function() {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $login.find('[name="username"]').val(),
                password: $login.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {
                if(result.message='登录成功'){
                    $(".dengluli").hide();
                }

//                                       $login.find('.colWarning').html(result.message);
                if (!result.code) {
                    // 登陆成功
                    window.location.reload();
                }
            }
        });
    });
    // logoutBtn
    $('#logoutBtn').on('click', function () {
        alert('退出登录');
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

