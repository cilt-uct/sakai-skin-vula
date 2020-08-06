var attached = false; // initial load

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function updatePresenceTimeout(_ms, _go) {
    if (window.sakaiLastPresenceTimeOut != null) {
        clearTimeout(window.sakaiLastPresenceTimeOut);
        window.sakaiLastPresenceTimeOut = null;
    }
    if (_go) {
        window.sakaiLastPresenceTimeOut = setTimeout('updatePresence()', _ms);
    }
}

// Triggers when visibility changes
function handleVisibilityChange() {
    if (document.hidden) {
        //console.log("hidden");
        updatePresenceTimeout(window.sakaiPresenceTimeDelay, false); //stop
    } else  {
        //console.log("visible");
        updatePresenceTimeout(window.sakaiPresenceTimeDelay, false); 
        updatePresence(); //start immediately
    }
}

function updatePresence() {
    if (!attached) {
        document.addEventListener("visibilitychange", handleVisibilityChange, false);
        attached = true;
        // console.log("initPresence: " + attached);
    }

    if (document.hidden) {
        // console.log("we started hidden - so wait");
        return;
    }

    //console.log("sakaiPresenceTimeDelay: "+ window.sakaiPresenceTimeDelay);
    //console.log("sakaiPresenceFragment: "+ window.sakaiPresenceFragment);
    //console.log("sakaiLastPresenceTimeOut: "+ window.sakaiLastPresenceTimeOut);
    //console.log(new Date().toLocaleTimeString());

    $PBJQ.ajax({
        url: sakaiPresenceFragment,
        cache: false,
        dataType : 'text',
        success: function(frag){

            var $presenceIframe = $PBJQ("#presenceIframe");
            $presenceIframe.html(frag);

            var $presenceCount = $PBJQ("#presenceCount");

            if ($presenceIframe.is(':empty')) {
                $presenceCount.html(' ');
                $presenceCount.removeClass('present').addClass('empty');
                location.reload();
                return;
            }

            var userCount = $presenceIframe.find('.listUser').length;

            // No need to attract attention you are alone :(
            if (userCount > 1) {
                $presenceCount.html(userCount + '');
                $presenceCount.removeClass('empty').addClass('present');
            }
            else if (userCount == 1) {
                $PBJQ("#presenceCount").html(userCount + '');
                $presenceCount.removeClass('present').addClass('empty');
            }
            else {
                $PBJQ("#presenceCount").html(' ');
                $presenceCount.removeClass('present').addClass('empty');
            }

            var chatUrl = $PBJQ('.nav-selected .icon-sakai-chat').attr('href');
            $PBJQ('#presenceIframe .presenceList div.inChat span').wrap('<a href="' + chatUrl + '"></a>');
            updatePresenceTimeout(60000, true); // 60 seconds
            // console.log(" > "+ new Date().toLocaleTimeString());
        },
        error: function(request, strError){
            // If we get an error, wait 120 seconds before retry
            updatePresenceTimeout(120000, true);
            // console.log(" > "+ new Date().toLocaleTimeString());
        }
    });
}
