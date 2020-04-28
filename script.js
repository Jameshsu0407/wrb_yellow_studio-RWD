setTimeout(function(){
  $(".loading").removeClass("show");
  $(".loading").addClass("hide");
  $(".loading").css("height","0px");
  $(".loading").css("width","0px");
},3000);

$(window).scroll(function(e){
    // console.log($(window).scrollTop());
    if ($(window).scrollTop()<=0)
      $(".explore,.navbar").addClass("at_top");
    else
      $(".explore,.navbar").removeClass("at_top");
  });
  
$(document).on('click','a',function(event){
  event.preventDefault();
  var target= $(this).attr("href");
  $('html,body').animate({
    scrollTop: $(target).offset().top
  },1000);
  
});

function detect_cat(cat_id,x){
  var catplace=$(cat_id).offset().left+$(cat_id).width()/2;
  if(Math.abs(x-catplace)<80)
    $(cat_id).css("bottom","0px")
  else
    $(cat_id).css("bottom","-50px")
}

$(window).mousemove(function(evt){
  var pagex=evt.pageX;
  var pagey=evt.pageY;
  
  var x=pagex-$("#section_about").offset().left;
  var y=pagey-$("#section_about").offset().top;
  
  // console.log(x+","+y)
  
  // 山移動
  $(".mountain").css("transform","translateX("+(pagex/-20+50)+"px)")
  
  // 文字移動
  $(".r1text").css("transform","translateX("+(y/-5)+"px)")
  $(".r2text").css("transform","translateX("+(y/-10)+"px)")
  $(".r3text").css("transform","translateX("+(y/-12)+"px)")
  
  // 三角形移動
  $(".tri1").css("transform","translateX("+(x/-5)+"px)")
  $(".tri2").css("transform","translateX("+(x/-10)+"px)")
  $(".tri3").css("transform","translateX("+(x/-12)+"px)")
  $(".tri4").css("transform","translateX("+(x/-14)+"px)")
  $(".tri5").css("transform","translateX("+(x/-16)+"px)")
  
  // 叉叉一起動
  if(y<0 || y>$("#section_about").outerHeight())
    $("#cross").css("opacity",0);
  else
    $("#cross").css("opacity",1);
  
  $("#cross").css("left",x+"px");
  $("#cross").css("top",y+"px");
  
  // 貓咪看叉叉
  var catplace=$("#cat").offset().left+$("#cat").width()/2;
  var cattop=$("#cat").offset().top;
  
  var img_url="https://awiclass.monoame.com/catpic/";
  
  if (pagex<catplace-50)
    $("#cat").attr("src",img_url+"cat_left.png")
  else if (pagex>catplace+50)
    $("#cat").attr("src",img_url+"cat_right.png")
  else
    $("#cat").attr("src",img_url+"cat_top.png")
  
  if (pagex<catplace-50 && pagey<cattop)
    $("#cat").attr("src",img_url+"cat_lefttop.png")
  if (pagex>catplace+50 && pagey<cattop)
    $("#cat").attr("src",img_url+"cat_righttop.png")
  
  // 讓貓咪站起來
  detect_cat("#cat_yellow",pagex);
  detect_cat("#cat_blue",pagex);
  detect_cat("#cat_grey",pagex);
});  

var vm = new Vue({
  el: "#app",
  data: {
    works: []
  },
  mounted: function(){
    var vobj =this;
    $.ajax({
      url: "https://awiclass.monoame.com/api/command.php?type=get&name=projects",
      success: function(res){
        vobj.works=JSON.parse(res);
      }
    })
  }
})