Package.describe({
  name: 'aldeed:autoform-bs-datepicker',
  summary: 'Custom bootstrap-datepicker input type for AutoForm',
  version: '2.0.2',
  git: 'https://github.com/aldeed/meteor-autoform-bs-datepicker.git'
});

Package.onUse(function(api) {
  api.versionsFrom('2.16');
  api.use('templating@1.0.0 || 1.4.4');
  api.use('blaze@2.0.0 || 2.9.0 || 3.0.1');
  api.use('underscore');
  api.use('aldeed:autoform@6.0.0');
  api.addFiles([
    'autoform-bs-datepicker.html',
    'autoform-bs-datepicker.js'
  ], 'client');
});
