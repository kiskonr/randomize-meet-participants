/**
 * Shuffles the elements of array
 * @param {array} array
 * @returns {array}
 */
const shuffleArray = (array) => {
  let index = array.length - 1,
    randomIndex,
    tempValue;

  for (index; index > 0; index--) {
    randomIndex = Math.floor(Math.random() * index);
    tempValue = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
};

/**
 * Removes duplicate elements of array
 * @param {array} array
 * @returns {void}
 */
const removeDuplicates = (array) => {
  array.splice(0, array.length, ...new Set(array));
};

/**
 * Obtains container HTML node of participants list
 * @returns {Element}
 */
const getParticipantsContainer = () => {
  let participantsContainer;
  let firstKey = document.querySelector('*[data-sort-key]');

  while (firstKey && !participantsContainer) {
    if (firstKey.hasAttribute('data-is-persistent')) {
      participantsContainer = firstKey;
    }
    firstKey = firstKey.parentElement;
  }

  return participantsContainer;
};

/**
 * Resets the participants container node height
 * @returns {void}
 */
const resetparticipantsContainerHeight = () => {
  const participantsContainer = getParticipantsContainer();

  if (participantsContainer && participantsContainer.style.height) {
    participantsContainer.style.height = '';
  }
};

/**
 * Gets all participants and randomize the list order
 * @returns {array}
 */
export const randomizeParticipants = () => {
  var participantsNodes = Array.from(
    document.querySelectorAll('*[role="listitem"]')
  );
  var participants = participantsNodes.map(
    (node) => node.innerText.split(/\n/g)[0]
  );
  resetparticipantsContainerHeight();

  // If there are users sharing their screen, they appear duplicates
  removeDuplicates(participants);

  return shuffleArray(participants);
};

/**
 * Google lazy loads the list of participants based on browser height. This solution is based on
 * similar extension (https://github.com/LambyPants/google-meet-participant-randomizer), basically
 * makes the browser think it's taller than it really is so it loads all participants.
 * If you know a better solution to do this feel free to open a PR
 * @async
 * @returns {void}
 */
export const loadAllParticipants = async () => {
  let parentController;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const participantsContainer = getParticipantsContainer();
      if (participantsContainer) {
        // arbitrarily large value
        participantsContainer.style.height = '100000px';
        // tell the browser to redraw all the nametags
        window.dispatchEvent(new CustomEvent('resize'));
        setTimeout(() => {
          resolve(participantsContainer);
        }, 300);
      } else {
        resolve(false);
      }
    }, 300);
  });
};
