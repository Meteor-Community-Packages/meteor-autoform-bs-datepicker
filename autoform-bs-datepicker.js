/* global AutoForm, $ */

AutoForm.addInputType('bootstrap-datepicker', {
  template: 'afBootstrapDatepicker',
  valueOut: function () {
    var val;
    if (this.val()) {
      val = this.datepicker('getUTCDate');
    }
    return (val instanceof Date) ? val : this.val();
  },
  valueConverters: {
    string: function (val) {
      return (val instanceof Date) ? AutoForm.valueConverters.dateToDateStringUTC(val) : val;
    },
    stringArray: function (val) {
      if (val instanceof Date) {
        return [AutoForm.valueConverters.dateToDateStringUTC(val)];
      }
      return val;
    },
    number: function (val) {
      return (val instanceof Date) ? val.getTime() : val;
    },
    numberArray: function (val) {
      if (val instanceof Date) {
        return [val.getTime()];
      }
      return val;
    },
    dateArray: function (val) {
      var valArray = this.datepicker('getUTCDates');
      if (allArrayItemsAreDates(valArray)) return valArray;
      return val;
    },
  },
});

Template.afBootstrapDatepicker.helpers({
  atts: function addFormControlAtts() {
    var atts = { ...this.atts };
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, 'form-control');
    delete atts.datePickerOptions;
    return atts;
  }
});

Template.afBootstrapDatepicker.onRendered(function onRendered() {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  var data = this.data;

  // instanciate datepicker
  $input.datepicker(data.atts.datePickerOptions);

  // set and reactively update values
  var previousValue;
  this.autorun(function () {
    var data = Template.currentData();
    var nextValue = data.value;

    // set field value
    if (String(previousValue) !== String(nextValue)) {
      if (typeof nextValue === 'string' && AutoForm.Utility.isValidDateString(nextValue)) {
        nextValue = utcToLocal(new Date(nextValue + 'T00:00:00.000Z'));
      }

      if (nextValue instanceof Date) {
        $input.datepicker('setUTCDate', nextValue);
      } else if (typeof nextValue === 'string') {
        $input.datepicker('update', nextValue);
      }

      if (Array.isArray(nextValue)) {
        if (allArrayItemsAreDates(nextValue)) {
          $input.datepicker('setUTCDates', nextValue);
        } else if (allArrayItemsAreValidDateStrings(nextValue)) {
          var nextUTCDates = nextValue.map(function (dateString) {
            return utcToLocal(new Date(dateString + 'T00:00:00.000Z'));
          });
          $input.datepicker('setUTCDates', nextUTCDates);
        } else {
          $input.datepicker('update', nextValue);
        }
      }

      previousValue = nextValue;
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
});

Template.afBootstrapDatepicker.onDestroyed(function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.date') : this.$('input');
  $input.datepicker('remove');
});

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

function allArrayItemsAreDates(items) {
  var nonDates = items.filter(function(val) { return !(val instanceof Date); });
  return nonDates.length === 0;
}

function allArrayItemsAreValidDateStrings(items) {
  var nonValid = items.filter(function(val) {
    return !(typeof val === 'string' && AutoForm.Utility.isValidDateString(val));
  });
  return nonValid.length === 0;
}
