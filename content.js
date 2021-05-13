(async () => {
  const src = chrome.runtime.getURL('./helper.js');
  const helper = await import(src);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'randomize') {
      if (request.participants !== null) {
        setTimeout(() =>
          sendResponse({ data: helper.shuffleArray(request.participants) })
        );
      } else {
        (async () => {
          const showParticipantsButton = document.querySelector(
            '*[data-tab-id~="1"]'
          );
          if (showParticipantsButton) {
            showParticipantsButton.click();
            await helper.loadAllParticipants();
            sendResponse({ data: helper.randomizeParticipants() });
          }

          sendResponse({ data: [] });
        })();
      }
      return true; // keep the messaging channel open for sendResponse
    }
  });
})();
