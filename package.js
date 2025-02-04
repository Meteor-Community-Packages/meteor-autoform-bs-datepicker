Package.describe({
  name: 'aldeed:autoform-bs-datepicker',
  summary: 'Custom bootstrap-datepicker input type for AutoForm',
  version: '2.0.1',
  git: 'https://github.com/aldeed/meteor-autoform-bs-datepicker.git'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.12.1', '2.16']);
  api.use('templating');
  api.use('blaze');
  api.use('underscore');
  api.use('aldeed:autoform@6.0.0');
  api.addFiles([
    'autoform-bs-datepicker.html',
    'autoform-bs-datepicker.js'
  ], 'client');
});
