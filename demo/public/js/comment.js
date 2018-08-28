var perpage = 2;
var page = 1;
var pages = 0;
var comments = [];

$('#messageBtn').on('click', function() {
  $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid : $('#contentId').val(),
            content : $('#messageContent').val()
        },
        success:function (responseData) {
            // console.log(responseData)
            $('#messageContent').val('');
            comments = responseData.data.comments.reverse();
            renderComment(comments);
        }
    })
});

$.ajax({
    url:'/api/comment',
    data:{
        contentid : $('#contentId').val()
    },
    success:function (responseData) {
        $('#messageContent').val('')
        comments = responseData.data.reverse()
        renderComment(comments);
    }
});

$('.page_index').on('click', 'a', function() {
  if ($(this).parent().hasClass('previous')) {
    page--;
  } else {
    page++;
  }
  renderComment();
});

// 品论添加
function renderComment() {
  $('#messageCount').html(comments.length);

  pages = Math.max(1,Math.ceil(comments.length / perpage));
  var start =Math.max(0,(page-1)*perpage)
  var end = Math.min(start +perpage,comments.length)
  var $lis = $('.page_index li');
  $lis.eq(1).find('strong').html(page + ' / ' + pages);

  if (page <= 1) {
    page = 1;
    $lis.eq(0).html('没有上一页');
  } else {
    $lis.eq(0).html('<a href="javascript:;">上一页</a>');
  }
  if (page >= pages) {
    page = pages;
    $lis.eq(2).html('没有下一页');
  } else {
    $lis.eq(2).html('<a href="javascript:;">下一页</a>');
  }

  if (comments.length == 0) {
    $('.message-list ul').html('<li>暂时没有评论</li>');
  } else {
    var html = '';
    for (var i = start; i < end; i++) {
      html += '<li><span>'+comments[i].username+'</span><time>'+formatData(comments[i].postTime)+'</time><p>'+comments[i].content+'</p></li>'
    }
    $('.message-list ul').html(html);
    $('.colDefault .colInfo').eq(3).html(comments.length);
  }
}

// 时间处理
function formatData(d) {
  var date1 = new Date(d);
  return date1.getFullYear()+'年'+(date1.getMonth()+1)+'月'+date1.getDate()+'日 '+date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds();
}
