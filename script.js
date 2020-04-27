$(window).scroll(function(e){
    console.log($(window).scrollTop());
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