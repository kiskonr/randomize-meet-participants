var refresh = document.getElementById('refresh');
var list = document.getElementById('list');

const printParticipantsList = (participants) => {
  list.innerHTML = participants
    .map((participant, index) => `<li>${index + 1} - ${participant}</li>`)
    .join('');
};

refresh.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'randomize' }, function (
      response
    ) {
      if (response && response.data) {
        printParticipantsList(response.data);
      }
    });
  });
};

refresh.click();
