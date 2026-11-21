// Live filter for the publication list.
(function () {
  var input = document.getElementById('pub-search');
  var count = document.getElementById('pub-count');
  var empty = document.getElementById('pub-empty');
  var pubs = Array.prototype.slice.call(document.querySelectorAll('.pub'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.year-group'));
  if (!input || !pubs.length) return;

  function update() {
    var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    pubs.forEach(function (li) {
      var text = li.textContent.toLowerCase();
      var match = terms.every(function (t) { return text.indexOf(t) !== -1; });
      li.hidden = !match;
      if (match) shown++;
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector('.pub:not([hidden])');
    });
    count.textContent = terms.length
      ? shown + ' of ' + pubs.length + ' publications'
      : pubs.length + ' publications';
    empty.hidden = shown !== 0;
  }

  input.addEventListener('input', update);
  update();
})();
