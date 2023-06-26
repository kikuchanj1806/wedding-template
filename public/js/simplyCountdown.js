(function() {
    'use strict';
  
    function extend(out) {
      out = out || {};
  
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
  
        if (obj) {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object') {
                out[key] = extend(out[key], obj[key]);
              } else {
                out[key] = obj[key];
              }
            }
          }
        }
      }
  
      return out;
    }
  
    function createCountdownElt(countdown, parameters, typeClass) {
      var innerSectionTag = document.createElement('div');
      var sectionTag = document.createElement('div');
      var amountTag = document.createElement('span');
      var wordTag = document.createElement('span');
  
      innerSectionTag.appendChild(amountTag);
      innerSectionTag.appendChild(wordTag);
      sectionTag.appendChild(innerSectionTag);
  
      sectionTag.className = parameters.sectionClass + ' ' + typeClass;
      amountTag.className = parameters.amountClass;
      wordTag.className = parameters.wordClass;
  
      countdown.appendChild(sectionTag);
  
      return {
        full: sectionTag,
        amount: amountTag,
        word: wordTag
      };
    }
  
    function createElements(parameters, countdown) {
      if (!parameters.inline) {
        return {
          days: createCountdownElt(countdown, parameters, 'simply-days-section'),
          hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
          minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
          seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
        };
      } else {
        var spanTag = document.createElement('span');
        spanTag.className = parameters.inlineClass;
        return spanTag;
      }
    }
  
    function simplyCountdown(elt, args) {
      var defaultParameters = {
        year: 2023,
        month: 4,
        day: 5,
        hours: 8,
        minutes: 30,
        seconds: 0,
        words: {
          days: 'day',
          hours: 'hour',
          minutes: 'minute',
          seconds: 'second',
          pluralLetter: 's'
        },
        plural: true,
        inline: false,
        enableUtc: true,
        onEnd: function() {},
        refresh: 1000,
        inlineClass: 'simply-countdown-inline',
        sectionClass: 'simply-section',
        amountClass: 'simply-amount',
        wordClass: 'simply-word',
        zeroPad: false
      };
  
      var parameters = extend(defaultParameters, args);
      var interval;
      var targetDate;
      var targetTmpDate;
      var now;
      var nowUtc;
      var secondsLeft;
      var days;
      var hours;
      var minutes;
      var seconds;
      var cd = document.querySelectorAll(elt);
  
      targetTmpDate = new Date(
        parameters.year,
        parameters.month - 1,
        parameters.day,
        parameters.hours,
        parameters.minutes,
        parameters.seconds
      );
  
      if (parameters.enableUtc) {
        targetDate = new Date(
          targetTmpDate.getUTCFullYear(),
          targetTmpDate.getUTCMonth(),
          targetTmpDate.getUTCDate(),
          targetTmpDate.getUTCHours(),
          targetTmpDate.getUTCMinutes(),
          targetTmpDate.getUTCSeconds()
        );
      } else {
        targetDate = targetTmpDate;
      }
  
      Array.prototype.forEach.call(cd, function(countdown) {
        var fullCountDown = createElements(parameters, countdown);
  
        function refresh() {
          var dayWord;
          var hourWord;
          var minuteWord;
          var secondWord;
  
          now = new Date();
  
          if (parameters.enableUtc) {
            nowUtc = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              now.getHours(),
              now.getMinutes(),
              now.getSeconds()
            );
            secondsLeft = (targetDate - nowUtc.getTime()) / 1000;
          } else {
            secondsLeft = (targetDate - now.getTime()) / 1000;
          }
  
          if (secondsLeft > 0) {
            days = parseInt(secondsLeft / 86400, 10);
            secondsLeft = secondsLeft % 86400;
  
            hours = parseInt(secondsLeft / 3600, 10);
            secondsLeft = secondsLeft % 3600;
  
            minutes = parseInt(secondsLeft / 60, 10);
            seconds = parseInt(secondsLeft % 60, 10);
          } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
            window.clearInterval(interval);
            parameters.onEnd();
          }
  
          if (parameters.plural) {
            dayWord = days > 1 ? parameters.words.days + parameters.words.pluralLetter : parameters.words.days;
            hourWord = hours > 1 ? parameters.words.hours + parameters.words.pluralLetter : parameters.words.hours;
            minuteWord = minutes > 1 ? parameters.words.minutes + parameters.words.pluralLetter : parameters.words.minutes;
            secondWord = seconds > 1 ? parameters.words.seconds + parameters.words.pluralLetter : parameters.words.seconds;
          } else {
            dayWord = parameters.words.days;
            hourWord = parameters.words.hours;
            minuteWord = parameters.words.minutes;
            secondWord = parameters.words.seconds;
          }
  
          if (parameters.inline) {
            countdown.innerHTML =
              days + ' ' + dayWord + ', ' +
              hours + ' ' + hourWord + ', ' +
              minutes + ' ' + minuteWord + ', ' +
              seconds + ' ' + secondWord + '.';
          } else {
            fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
            fullCountDown.days.word.textContent = dayWord;
  
            fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
            fullCountDown.hours.word.textContent = hourWord;
  
            fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
            fullCountDown.minutes.word.textContent = minuteWord;
  
            fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
            fullCountDown.seconds.word.textContent = secondWord;
          }
        }
  
        refresh();
        interval = window.setInterval(refresh, parameters.refresh);
      });
    }
  
    window.simplyCountdown = simplyCountdown;
  })();
  