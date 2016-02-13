let connections = new Map<number, chrome.runtime.Port>();

chrome.runtime.onConnect.addListener(port => {

  let frontendListener = (message, sender) => {
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.name === 'init') {
      connections.set(message.tabId, port);
    }

    chrome.tabs.sendMessage(message.tabId, message);
    // other message handling
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(frontendListener);

  port.onDisconnect.addListener(_port => {

    _port.onMessage.removeListener(frontendListener);
    connections.forEach((value, key, map) => {
      if (value === port) {
        map.delete(key);
      }
    });
  });

});

// Receive message from content script and
// relay to the devTools page for the current tab
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    // Messages from content scripts should have sender.tab set
    if (sender.tab && connections.has(sender.tab.id)) {
      if (message.from === 'content-script') {
        sendResponse({connection: true});
      }
      connections.get(sender.tab.id).postMessage(message);
    }

    return true;
  });

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'My menu',
    id: 'menu1', // you'll use this in the handler function to identify this context menu item
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log(info, tab);
});
