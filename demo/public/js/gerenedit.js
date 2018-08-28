/**
 * Created by Administrator on 2018/1/30 0030.
 */
$('.tijiao').click( function() {
if($('#password').val()===$('#respassworld').val()){

    $.ajax({
        type: 'post',
        url: '/edituserbiao',
        data: {
            name: $('#name').val(),
            intro: $('#intro').val(),
            telephone: $('#telephone').val(),
            email: $('#email').val(),
            sex: $('#sex').val(),
            gexing: $('#gexing').val(),
            qq:$('#qq').val(),
            weixin: $('#weixin').val(),
            password: $('#password').val(),
            respassworld: $('#respassworld').val(),
            address: $('#address').val(),
            xuexing: $('#xuexing').val(),

        },
        dataType: 'json',
        success: function(result) {

            if (result) {
                // 修改成功
                window.location.reload();

            }
            alert(result)
        }

    });

}else{
    alert("两次输入密码不一致")
}


});