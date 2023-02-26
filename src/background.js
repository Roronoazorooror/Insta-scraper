chrome.action.onClicked.addListener((tab) => {
  console.log("Hello");
  chrome.tabs.sendMessage(tab.id, {
    type: "TEXT",
  });
});

