$(document).ready(function(){
  
  var streamers=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "RobotCaleb", "noobs2ninjas"];
  var conected=[false,false,false,false,false,false,false];
  
  //get data with JSON
  for (var i=0;i<streamers.length;i++){
    getData(i);
  }    
  function getData(n){
    var target="https://wind-bow.glitch.me/twitch-api/streams/"+streamers[n];
    $.getJSON(target,function(json){
      if (json.stream===null){
        conected[n]=false;
        target="#status"+n;
        console.log(target);
        $(target).html("Not Streaming").css("color","#ff0000");
      }else{
        conected[n]=true;
        target="#status"+n;
        console.log(target);
        $(target).html("Streaming").css("color","#005900");
        target="#description"+n;
        $(target).html(json.stream.game);
        target="#img"+n;
        $(target).attr("src",json.stream.preview.medium);
      }
    });
  }
  
  //filtering
  $(".navBtn").click(function(){
    if ($(this).hasClass("active")==false){
      $("li").removeClass("active");
      $(this).addClass("active");
      if ($(this).attr("id")=="All"){
        for (var i=0;i<streamers.length;i++){
          var target="#user"+i;
          $(target).css("display","block");
        }
      }else if ($(this).attr("id")=="On"){
        for (var i=0;i<streamers.length;i++){
          if (conected[i]){
            var target="#user"+i;
            $(target).css("display","block");
          }else{
            var target="#user"+i;
            $(target).css("display","none");
          }
        }
      }else{
        for (var i=0;i<streamers.length;i++){
          if (conected[i]){
            var target="#user"+i;
            $(target).css("display","none");
          }else{
            var target="#user"+i;
            $(target).css("display","block");
          }
        }
      }
    }
  });
 
});