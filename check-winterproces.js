(function () {
  var ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScsJsROzSIAOufbTEjwbZl8H-5f_c2JbZFGHO3rdaHvFGnxcA/formResponse';
  var TEL_OK = /^\+?[0-9 ()-]{10,16}$/;
  var form = document.getElementById('aanmeldform');
  var tel = document.getElementById('tel');
  var fout = document.getElementById('fout');
  var bedankt = document.getElementById('bedankt');
  var knop = form.querySelector('button[type="submit"]');

  tel.addEventListener('input', function () { tel.setCustomValidity(''); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fout.hidden = true;
    tel.value = tel.value.trim();
    tel.setCustomValidity(TEL_OK.test(tel.value) ? '' : 'Vul een telefoonnummer in, bijvoorbeeld 06 12 34 56 78.');
    if (!form.reportValidity()) return;

    var data = new URLSearchParams(new FormData(form));
    data.append('fvv', '1');
    data.append('pageHistory', '0');
    knop.disabled = true;
    knop.textContent = 'Versturen…';

    fetch(ACTION, { method: 'POST', mode: 'no-cors', body: data })
      .then(function () {
        form.hidden = true;
        bedankt.hidden = false;
        bedankt.scrollIntoView({ block: 'center' });
      })
      .catch(function () {
        knop.disabled = false;
        knop.textContent = 'Bel mij terug';
        fout.textContent = 'Versturen lukte niet. Probeer het nog eens, of bel of app me: 06 12 80 96 64.';
        fout.hidden = false;
      });
  });
})();
