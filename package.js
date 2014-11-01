Package.describe({
  name: 'aldeed:autoform-bs-datepicker',
  summary: 'Custom bootstrap-datepicker input type for AutoForm',
  version: '1.0.0',
  git: ''
});

Package.onUse(function(api) {
  api.use('aldeed:autoform@4.0.0-rc9');
  api.addFiles([
    'autoform-bs-datepicker.html',
    'autoform-bs-datepicker.js'
  ], 'client');
});