// var targetWindow = null;
// var tabCount = 0;
// function start(tab) {
//     chrome.windows.getCurrent(getWindows);
// }
// function getWindows(win) {
//     targetWindow = win;
//     chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
// }
// function getTabs(tabs) {
//     tabCount = tabs.length;
//     // We require all the tab information to be populated.
//     chrome.windows.getAll({"populate" : true}, moveTabs);
// }
// function moveTabs(windows) {
//     var numWindows = windows.length;
//     var tabPosition = tabCount;
//     for (var i = 0; i < numWindows; i++) {
//         var win = windows[i];
//         if (targetWindow.id == win.id) {
//             var numTabs = win.tabs.length;
//             for (var j = 0; j < numTabs; j++) {
//                 var tab = win.tabs[j];
//                 // Move the tab into the window that triggered the browser action.
//                 // chrome.tabs.move(tab.id,
//                 //     {"windowId": targetWindow.id, "index": tabPosition});
//                 // tabPosition++;
//                 console.log("abs");
//             }
//         }
//     }
// }
// // Set up a click handler so that we can merge all the windows.
// chrome.browserAction.onClicked.addListener(start);

var tabs = null;
var oldBooks = null;

document.addEventListener("DOMContentLoaded", function(){
    var nameInput = document.getElementById("saveName");
    var saveSubmit = document.getElementById("saveBut");
    chrome.storage.sync.get(function(result){
        console.log(result);
        oldBooks = result;
    });
    saveSubmit.addEventListener("click", function(){
        chrome.windows.getCurrent({"populate" : true}, function(curWin){
            // Checking for input
            var storeName = nameInput.value;
            console.log(storeName);

            tabs = curWin["tabs"];
            console.log(tabs);
            var storeObj = tabs.map(function(el){
                return el["url"]
            });

            chrome.storage.sync.set({[storeName]: storeObj}, function(){
                console.log("done");
            });
        });
    });


    // Pressing enter in input field should trigger saveSubmit
    nameInput.addEventListener("keypress", function(ev){
        if(ev.keyCode == 13){
            saveSubmit.click();
        }
    });
});

// function onSub(){
//     chrome.windows.getCurrent(function(curWin){
//         // alert(curWin);
//         alert(curWin["tabs"]);
//     })
// }