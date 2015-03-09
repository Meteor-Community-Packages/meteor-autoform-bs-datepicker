Package.describe({
  name: 'aldeed:autoform-bs-datepicker',
  summary: 'Custom bootstrap-datepicker input type for AutoForm',
  version: '1.1.1',
  git: 'https://github.com/aldeed/meteor-autoform-bs-datepicker.git'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.addFiles([
    'autoform-bs-datepicker.html',
    'autoform-bs-datepicker.js'
  ], 'client');
});
