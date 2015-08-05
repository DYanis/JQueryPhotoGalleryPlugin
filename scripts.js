
    $.fn.gallery = function(cols) {
        $(this).addClass('gallery');
        String.format = function() {
            // The string containing the format items (e.g. "{0}")
            // will and always has to be the first argument.
            var theString = arguments[0];

            // start with the second argument (i = 1)
            for (var i = 1; i < arguments.length; i++) {
                // "gm" = RegEx options for Global search (more than one instance)
                // and for Multiline search
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                theString = theString.replace(regEx, arguments[i]);
            }

            return theString;
        }
        $('.selected').css('display', 'none');
        var $imgContainers = $('.image-container');
        var $galleryList = $('.gallery-list');

        // make colons
        $imgContainers.each(function(index, el) {
            if (index % cols === 0) {
                $(this).addClass('clearfix');
            }
        });

        $galleryList.click(function(event) {
            $(".gallery-list").append('<div class="disabled-background">');
            $('.selected').css('display', 'inline-block');
            var $targetIMG = $(event.target);
            var $currentIMG = $('.selected .current-image img');
            var targetDateInfo = $targetIMG.attr('data-info');

            $currentIMG.attr('src', $targetIMG.attr('src'));
            $currentIMG.attr('data-info', targetDateInfo);

            changePreviousIMG(targetDateInfo);
            changeNextIMG(targetDateInfo);

            $galleryList.addClass('blurred');
        });

        $('#previous-image').click(function(event) {
            var $targetIMG = $(event.target);
            var $currentIMG = $('.selected .current-image img');
            var targetDateInfo = $targetIMG.attr('data-info');

            $currentIMG.attr('src', $targetIMG.attr('src'));
            $currentIMG.attr('data-info', targetDateInfo);

            changePreviousIMG(targetDateInfo);
            changeNextIMG(targetDateInfo);
        });

        $('#current-image').click(function(event) {
            $('.selected').css('display', 'none');
            $('.disabled-background').remove();
            $galleryList.removeClass('blurred');
        });

        $('#next-image').click(function(event) {
            var $targetIMG = $(event.target);
            var $currentIMG = $('.selected .current-image img');
            var targetDateInfo = $targetIMG.attr('data-info');

            $currentIMG.attr('src', $targetIMG.attr('src'));
            $currentIMG.attr('data-info', targetDateInfo);

            changePreviousIMG(targetDateInfo);
            changeNextIMG(targetDateInfo);
        });

        function changePreviousIMG(targetDateInfo) {
            if (targetDateInfo < 2) {
                var $previousIMG = $('#previous-image');
                var $lastIMG = $(String.format('[data-info="{0}"]', $imgContainers.length));

                $previousIMG.attr('src', $lastIMG.attr('src'));
                $previousIMG.attr('data-info', $lastIMG.attr('data-info'));
            } else {
                var $previousIMG = $('#previous-image');
                var $previousOfTarget = $(String.format('[data-info="{0}"]', targetDateInfo - 1));

                $previousIMG.attr('src', $previousOfTarget.attr('src'));
                $previousIMG.attr('data-info', $previousOfTarget.attr('data-info'));
            }
        }

        function changeNextIMG(targetDateInfo) {
            if (parseInt(targetDateInfo) == $imgContainers.length) {
                var $nextIMG = $('#next-image');
                var $firstIMG = $($imgContainers.children('img')[0]);

                $nextIMG.attr('src', $firstIMG.attr('src'));
                $nextIMG.attr('data-info', $firstIMG.attr('data-info'));
            } else {
                var $nextIMG = $('#next-image');
                var $nextOfTarget = $(String.format('[data-info="{0}"]', parseInt(targetDateInfo) + 1));

                $nextIMG.attr('src', $nextOfTarget.attr('src'));
                $nextIMG.attr('data-info', $nextOfTarget.attr('data-info'));
            }
        }
    };

