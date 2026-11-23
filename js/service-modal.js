(function () {
  'use strict';

  var form = document.getElementById('service-form');
  var modal = document.getElementById('service-modal');
  if (!form || !modal) return;

  var fields = Array.from(form.querySelectorAll('input, select'));

  function validateField(field) {
    var value = field.value.trim();
    var message = '';
    field.setCustomValidity('');

    if (!value) {
      message = field.tagName === 'SELECT' ? 'Оберіть напрям моніторингу.' : 'Заповніть це поле.';
    } else if (field.id === 'service-name' && !/^[\p{L}][\p{L}\p{M}'’ -]{1,79}$/u.test(value)) {
      message = 'Вкажіть ім’я від 2 до 80 символів, використовуючи літери, пробіли, апостроф або дефіс.';
    } else if (field.id === 'service-email' && (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      message = 'Вкажіть електронну адресу у форматі name@company.com.';
    } else if (field.id === 'service-company' && value.length < 2) {
      message = 'Назва компанії має містити щонайменше 2 символи.';
    } else if (field.maxLength > 0 && value.length > field.maxLength) {
      message = 'Скоротіть значення до ' + field.maxLength + ' символів.';
    }

    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  fields.forEach(function (field) {
    field.addEventListener('input', function () { validateField(field); });
    field.addEventListener('change', function () { validateField(field); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      form.reportValidity();
      return;
    }
    window.jQuery(modal).modal('hide');
  });

  window.jQuery(modal).on('shown.bs.modal', function () {
    fields[0].focus();
  });

  window.jQuery(modal).on('hidden.bs.modal', function () {
    form.reset();
    fields.forEach(function (field) {
      field.setCustomValidity('');
      field.removeAttribute('aria-invalid');
    });
  });

  document.querySelectorAll('[data-contact-form], .domain-form').forEach(function (localForm) {
    localForm.addEventListener('submit', function (event) {
      event.preventDefault();
      localForm.reportValidity();
    });
  });

  document.querySelectorAll('[data-check-fields]').forEach(function (button) {
    button.addEventListener('click', function () {
      button.form.reportValidity();
    });
  });
}());
