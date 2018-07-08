'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const textInputs = form.querySelectorAll('input[type=text],textarea');

  const feedbackRegion = document.querySelector('.js-feedback');

  textInputs.forEach(function(el) {
    el.autocomplete = 'off';
  });

  /**
   * Prevent form from being submitted
   * and accidentally refreshing the page
   */
  form.addEventListener('submit', function(e) {
    const summary = e.target.summary.value;

    e.preventDefault();
    form.reset();

    // Immediately notify that a request has been made
    feedbackRegion.textContent = 'Saving...';

    // Take 3 seconds to simulate network latency
    setTimeout(() => {
      feedbackRegion.textContent = generateFeedbackMessage(summary);
    }, 3000);
  });

  addListenerMulti(form, 'input reset', function() {
    emptyElement(feedbackRegion);
  });
});

function emptyElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function generateFeedbackMessage(summary) {
  if (summary) {
    return `Thanks! Your dream about ${summary} has been recorded.`;
  }
  return 'I dunno why you wanna record a blank dream, but ok.';
}

/**
 * Add one or more listeners to an element
 * See: https://stackoverflow.com/a/8797106
 * @param {DOMElement} el DOM element to add listeners to
 * @param {string} evs space-separated list of event names, e.g. `'click change'`
 * @param {Function} handler function to attach for each event as a listener
 */
function addListenerMulti(el, evs, handler) {
  evs.split(' ').forEach(e => el.addEventListener(e, handler, false));
}
