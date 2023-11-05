$(document).ready(function (){
    var curcolor=0;
    var inAnimation = false;
    $(document).keydown(function(event){
        if (!inAnimation) {
            var code = event.key;
            if (code === "ArrowLeft") {
                if (curcolor !== 0) {
                    curcolor--;
                }
                switch (curcolor) {
                    case 0: {
                        inAnimation = true;
                        $('.color').animate({backgroundColor: "#4d5154"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 1: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "red"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 2: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "purple"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 3: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "blue"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                }
            }
            if (code === "ArrowRight") {
                if (curcolor !== 3) {
                    curcolor++;
                }
                switch (curcolor) {
                    case 0: {
                        inAnimation = true;
                        $('.color').animate({backgroundColor: "#4d5154"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 1: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "red"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 2: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "purple"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                    case 3: {
                        inAnimation=true;
                        $('.color').animate({backgroundColor: "blue"}, 500,function (){
                            inAnimation=false;
                        });
                        break;
                    }
                }
            }
        }
    })
})