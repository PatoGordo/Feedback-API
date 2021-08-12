// import "./styles/style.scss";
function GenerateId(len, base) {
    base =
        base || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomString = "";
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * base.length);
        randomString += base.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
var starRatingSurvey = document.querySelectorAll("star-rating-survey");
starRatingSurvey.forEach(function (item) {
    var title = item.getAttribute("title") || "Unnamed survey";
    var icon = item.getAttribute("icon") || "star";
    var maxCount = Number(item.getAttribute("maxCount")) || 5;
    var titleElement = document.createElement("h2");
    var starsElement = document.createElement("div");
    var buttonSubmitElement = document.createElement("button");
    var feedbackView = document.createElement("div");
    var afterSubmitView = document.createElement("div");
    var surveyID = "DKS_STAR_RATING_" + GenerateId(8);
    var stars = [];
    var _loop_1 = function (i) {
        var star = document.createElement("span");
        star.classList.add("fa");
        star.classList.add("fa-" + icon);
        if (i === 0) {
            star.classList.add("checked");
        }
        star.addEventListener("click", function () {
            var item = stars.indexOf(star);
            var allItemsBeforeStar = item > -1 ? stars.slice(0, item) : [];
            var allItemsAfterStar = stars.slice(item + 1);
            allItemsAfterStar.forEach(function (item) {
                item.classList.remove("checked");
            });
            allItemsBeforeStar.forEach(function (item) {
                item.classList.add("checked");
            });
            star.classList.add("checked");
        });
        stars.push(star);
    };
    for (var i = 0; i < maxCount; i++) {
        _loop_1(i);
    }
    stars.forEach(function (item) {
        starsElement.appendChild(item);
    });
    buttonSubmitElement.appendChild(document.createTextNode("Submit feedback"));
    titleElement.appendChild(document.createTextNode(title));
    feedbackView.appendChild(titleElement);
    feedbackView.appendChild(starsElement);
    feedbackView.appendChild(buttonSubmitElement);
    afterSubmitView.style.display = "none";
    var afterSubmitText = document.createElement("h2");
    var afterSubmitButton = document.createElement("button");
    afterSubmitButton.appendChild(document.createTextNode("Close"));
    // Button submit
    buttonSubmitElement.addEventListener("click", function () {
        var starFeedbackCount = 0;
        stars.map(function (star) {
            if (star.className === "fa fa-" + icon + " checked") {
                starFeedbackCount++;
            }
        });
        console.log(starFeedbackCount);
        feedbackView.style.display = "none";
        afterSubmitView.style.display = "block";
    });
    // Close button after submit
    afterSubmitButton.addEventListener("click", function () {
        item.style.display = "none";
    });
    afterSubmitText.appendChild(document.createTextNode("Thanks for the feedback!"));
    afterSubmitView.appendChild(afterSubmitText);
    afterSubmitView.appendChild(afterSubmitButton);
    item.appendChild(feedbackView);
    item.appendChild(afterSubmitView);
    item.id += surveyID;
});
