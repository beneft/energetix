$step = 1;                  //circle sector
$loops = Math.round(100 / $step);   //how many circle sectors
$increment = 360 / $loops;              //a degree of a circle sector
$half = Math.round($loops / 2);     //second half of a circle
$barColor = '#16F1FF';
$backColor = '#BFECFF';

$(function(){
    clock.init();           //initialize clock on page load
});
clock={                     //create clock object
    interval:null,
    init:function(){
        $('.input-btn').click(function(){           //set function for a start button
            $('#win').addClass('d-none');
            switch($(this).data('action')){
                case'start':
                    clock.stop();
                    clock.start($('.input-num').val());         //take number from the field
                    break;
                case'stop':
                    clock.stop();
                    break;
            }
        });
    },
    start:function(time){
        var pie = 0;
        var num = 0;
        var min = time?time:1;
        var sec = min*60;
        var secalert = 5*60;
        var lop = sec;
        var audio = new Audio("audio/tick_new.mp3");
        audio.load();
        $('.count').text(min);          //set counter text to our minutes
        if(min>0){                      //decide what is depicted mins or secs
            $('.count').addClass('min')
        }else{
            $('.count').addClass('sec')
        }
        clock.interval = setInterval(function(){    //create a function that executes at 1000ms interval
            sec = sec-1;
            audio.play();
            if (secalert==0) {
                alert("5 minutes have passed");
                secalert=5;
            }
            else secalert--;
            if(min>1){
                pie = pie+(100/(lop/min));  //calculate the size of a 1 tick and increment
            }else{
                pie = pie+(100/(lop));
            }
            if(pie>=101){ pie = 1; }        //reset clock pie on fulfillment
            num = (sec/60).toFixed(2).slice(0,-3);      //recalculate minutes
            if(num==0){                                            //change the text when run out of minutes
                $('.count').removeClass('min').addClass('sec').text(sec);
            }else{
                $('.count').removeClass('sec').addClass('min').text(num);
            }
            $i = (pie.toFixed(2).slice(0,-3))-1;    //pick an exact sector
            if($i < $half){
                $nextdeg = (90 + ( $increment * $i ))+'deg';        //we start at 90deg then up to 270deg which is the right half of a circle
                $('.clock').css({'background-image':'linear-gradient(90deg,'+$backColor+' 50%,transparent 50%,transparent),linear-gradient('+$nextdeg+','+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
            }else{
                $nextdeg = (-90 + ( $increment * ( $i - $half ) ))+'deg';
                $('.clock').css({'background-image':'linear-gradient('+$nextdeg+','+$barColor+' 50%,transparent 50%,transparent),linear-gradient(270deg,'+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
            }
            if(sec==0){         //terminate loop on time running out
                clearInterval(clock.interval);
                $('.count').text(0);
                $('.clock').removeAttr('style');
                $('#win').removeClass('d-none');
            }
        },1000);
    },
    stop:function(){
        clearInterval(clock.interval);
        $('.count').text(0);
        $('.clock').removeAttr('style');
    }
}