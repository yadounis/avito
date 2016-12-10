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
            document.getElementById("email").value = "login_email_here";
            document.getElementById("passwd").value = "password_here";
            document.getElementsByClassName("panel-main")[0].submit();
        });
        page.open("https://www2.avito.ma/ai/form/2");
    },
    // Step 3
    function() {
        console.log("Step 3");
        page.render("add_form.png");
    },
    // Step 4
    function() {
        console.log("Step 4");
        page.evaluate(function() {
            var form = document.getElementsByName('formular')[0];
            // Form data
            document.getElementById('category_group').value = 5060;
            document.getElementById('region').value = 5;
            document.getElementById('subject').value = "ad_title";
            document.getElementById('body').value = "ad_description";
            document.getElementById('price').value = 260;
            document.getElementById('name').value = 'your_name';
            document.getElementById('email').value = 'login_email';
            document.getElementById('phone').value = 'your_phone';
            document.getElementById('passwd').value = 'your_password';
            // Create images field
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "images_urls[]";
            input.value = '4525360344.jpg'; // Upload image in the form and put the link here
            form.appendChild(input);
            // Submit form
            form.submit();
        });
    },
    // Step 5
    function() {
        console.log("Step 5");
        page.render("add_form_with_data.png");
    }
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
