var steps = [];
var testindex = 0;
var loadInProgress = false; //This is set to true when a page is still loading

// Settings
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;


console.log('All settings loaded, start with execution');

// Steps
steps = [
    //Step 1
    function() {
        console.log('Step 1');
        page.open("https://www.avito.ma/account/login");
    },
    //Step 2
    function() {
        console.log('Step 2');
        page.evaluate(function() {
            document.getElementById("email").value = "your_email";
            document.getElementById("passwd").value = "your_password";
            document.getElementsByClassName("panel-main")[0].submit();
        });
    },
    // Step 3
    function() {
        console.log("Step 3");
        page.render("login.png");
    },
    // Step 4
    function() {
        console.log("Step 4");
        var url = page.evaluate(function() {
            return document.getElementById('mypages_myads_deactivate_link').href;
        });
        page.open(url);
    },
    // Step 5
    function() {
        console.log("Step 5");
        page.render("disable_page.png");
    },
    // Step 6
    function() {
        console.log("Step 6");
        page.evaluate(function() {
            document.getElementsByName('deactivation_reason')[2].checked = true;
            document.getElementById('deactivate_action').click();
            document.getElementById("formAction").submit();
            page.render("disable_popin.png");
        });
    },
    // Step 7
    function() {
        console.log("Step 7");
        page.render("disable_confirm.png");
    },
];

// Execute steps one by one
interval = setInterval(executeRequestsStepByStep, 50);

function executeRequestsStepByStep() {
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}

/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
