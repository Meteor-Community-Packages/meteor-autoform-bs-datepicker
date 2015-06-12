/* global AutoForm, $ */

AutoForm.addInputType("bootstrap-datepicker", {
  template: "afBootstrapDatepicker",
  valueOut: function () {
    var val;
    if (this.val()) {
      val = this.datepicker('getUTCDate');
    }
    return (val instanceof Date) ? val : this.val();
  },
  valueConverters: {
    "string": function (val) {
      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;
    },
    "stringArray": function (val) {
      if (val instanceof Date) {
        return [AutoForm.Utility.dateToDateStringUTC(val)];
      }
      return val;
    },
    "number": function (val) {
      return (val instanceof Date) ? val.getTime() : val;
    },
    "numberArray": function (val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return val;
    },
    "dateArray": function (val) {
      if (val instanceof Date) {
        return [val];
      }
      return val;
    }
  }
});

Template.afBootstrapDatepicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.datePickerOptions;
    return atts;
  }
});

Template.afBootstrapDatepicker.rendered = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  var data = this.data;

  // instanciate datepicker
  $input.datepicker(data.atts.datePickerOptions);

  // set and reactively update values
  this.autorun(function () {
    var data = Template.currentData();

    // set field value
    if (data.value instanceof Date) {
      $input.datepicker('setUTCDate', data.value);
    } else if (typeof data.value === "string") {
      $input.datepicker('update', data.value);
    }

    // set start date if there's a min in the schema
    if (data.min instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      var startDate = utcToLocal(data.min);
      $input.datepicker('setStartDate', startDate);
    }

    // set end date if there's a max in the schema
    if (data.max instanceof Date) {
      // datepicker plugin expects local Date object,
      // so convert UTC Date object to local
      var endDate = utcToLocal(data.max);
      $input.datepicker('setEndDate', endDate);
    }
  });
};

Template.afBootstrapDatepicker.destroyed = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  $input.datepicker('remove');
};

function utcToLocal(utcDate) {
  var localDateObj = new Date();
  localDateObj.setDate(utcDate.getUTCDate());
  localDateObj.setMonth(utcDate.getUTCMonth());
  localDateObj.setFullYear(utcDate.getUTCFullYear());
  localDateObj.setHours(0);
  localDateObj.setMinutes(0);
  localDateObj.setSeconds(0);
  localDateObj.setMilliseconds(0);
  return localDateObj;
}
