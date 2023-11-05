$(document).ready(function() {
    // Initialize variables to keep track of the state
    var missingWords = ["rossi", "stickers","doctor"];
    var completedWords = [];
    var wordTiles = $(".word-tile");
    var submitButton = $("#gamebtn");
    var notification = $(".gamenotify");

    // Add drag and drop functionality
    wordTiles.draggable({
        revert: "invalid",
        start: function(event, ui) {
            var word = $(this).data("word");
            completedWords = completedWords.filter(item => item !== word);
        }
    });

    $('.word-bank').droppable({
        accept: ".word-tile",
        drop: function(event,ui){

        }
    });

    $(".missing-word").droppable({
        accept: ".word-tile",
        drop: function(event, ui) {
            var word = ui.helper.data("word");
            var missingWord = $(this).data("word");

            if (word === missingWord) {
                completedWords.push(word);
            }
        }
    });

    // Handle submit button click
    submitButton.click(function() {
        let check = false;
        missingWords = missingWords.slice().sort();
        completedWords = completedWords.slice().sort();
        for (let i = 0; i<missingWords.length;i++){
            if (missingWords[i]!==completedWords[i]){
                check=false;
                break;
            }
            check=true;
        }
        if (check) {
            // Correct combination
            notification.removeClass("hidden");
            submitButton.css('display','none');
        } else {
            // Incorrect combination
            notification.text("Better luck next time!");
            notification.css('background-color','crimson');
            notification.removeClass("hidden");
            submitButton.css('display','none');
        }
    });
});