(async () => {
  const src = chrome.runtime.getURL("./helper.js");
  const helper = await import(src);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "randomize") {
      if (request.participants !== null) {
        setTimeout(() =>
          sendResponse({ data: helper.shuffleArray(request.participants) })
        );
      } else {
        (async () => {
          const showParticipantsButton =
            document.querySelector('button[data-panel-id~="1"]') ||
            document.querySelector('*[data-tab-id~="1"]');

          if (showParticipantsButton) {
            if (
              showParticipantsButton.getAttribute("aria-pressed") !== "true"
            ) {
              showParticipantsButton.click();
            }
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
