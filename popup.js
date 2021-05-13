var shuffle = document.getElementById('shuffle');
var list = document.getElementById('list');
var inputList = document.getElementById('custom-list-area');
var inputListBt = document.getElementById('custom-list-bt');

const printParticipantsList = (participants) => {
  list.innerHTML = participants
    .map((participant, index) => `<li>${index + 1} - ${participant}</li>`)
    .join('');
};

shuffle.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var participants = null;
    if (inputList.value !== '') {
      var regex = /,|\n/gm;
      participants = inputList.value.split(regex);
    }
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'randomize', participants },
      function (response) {
        if (response && response.data) {
          printParticipantsList(response.data);
        }
      }
    );
  });
};

shuffle.click();

inputListBt.onclick = () => {
  if (inputList.parentNode.classList.contains('hidden')) {
    inputList.value = '';
    inputList.parentNode.classList.remove('hidden');
    inputListBt.setAttribute('src', 'images/hide.png');
    inputListBt.setAttribute('title', 'Hide custom list');
  } else {
    inputList.parentNode.classList.add('hidden');
    inputListBt.setAttribute('src', 'images/list.png');
    inputListBt.setAttribute('title', 'Add custom list');
  }
};
