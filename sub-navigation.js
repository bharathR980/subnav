var SubNavigation = function() {
  var my = {
    inputData: {},
    state: {
      loaded: false
    }
  };

  my.initialize = function() {
    Services
      .getSalaryInformation()
      .then(function(salaryInformation) {
        var salaryUnformatted = salaryInformation.salaryUnformatted || '0';
        var payFrequency = salaryInformation.payFrequency || '0';

        $.when(
          Services.getContributions(salaryUnformatted, payFrequency),
          Services.getParticipant()
        ).then(function(contributions, participant) {
          if (contributions.err || !contributions.showContributionTab) {
            $('.nav-tabs li:contains(\'Contribution\')').remove();
          }

          if (!participant.err) {
            my.inputData.participantAge = parseInt(participant.age.substring(0,2));
            my.inputData.participantStatus = parseInt(participant.status);
          }
					
          my.registerSubNavigationTabListeners();
          my.checkWhichTabToLoad();
          my.subNavADA();
        });
      });
  };

  my.registerSubNavigationTabListeners = function() {
    $('.nav-tabs a').on('show.bs.tab', function() {
      var contentPath = $(this).data('content');
      var tabId = $(this).data('tabid');

      $.get(contentPath, function(result) {
        var resultHtml = $(result).find('.root').html();
        $('#' + tabId).html(resultHtml);
      }).then(function() {
        if (!my.state.loaded) {
          setTimeout(function() {
            WorkplaceCommon.dispatchCustomEvent(WorkplaceCommon.fdi.events.subNavLoaded.event);
            my.state.loaded = true;
          }, 0);
        }
        $(document).localize();
      });

      WorkplaceCommon.updateViewURLAnchor(tabId, WorkplaceCommon.fdi.url.anchors.index.SUB_NAV);
    });
  };

  my.checkWhichTabToLoad = function() {
    var tabId = WorkplaceCommon.getViewURLAnchor(WorkplaceCommon.fdi.url.anchors.index.SUB_NAV);

    if (tabId) {
      var tabElement = $('.sub-navigation-container a[data-target="#' + tabId + '"]');
      var tabElementId = tabId + 'Tab';

      if (tabElement.attr('id') === tabElementId) {
        tabElement.tab('show').trigger('focus');

        if ($(window).width() < 768) {
          $([document.documentElement, document.body]).animate({
            scrollTop: $('.sub-navigation-container').offset().top - 60
          }, 1000);
          $('.sub-navigation-container ul').animate({
            scrollLeft: tabElement.offset().left
          }, 500);
        } else {
          $([document.documentElement, document.body]).animate({
            scrollTop: $('.sub-navigation-container').offset().top - 90
          }, 1000);
        }
      }
    } else {
        $('.nav-tabs li:first a').tab('show');
    }

    $('.sub-navigation-container').removeClass('hidden');
  };

  my.subNavADA = function (){
    $('li[role*=\'presentation\']').on('keyup',function(e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      if(keycode === 13) {
        $(this).find('> a').trigger('click');
      }
    })
  };
  return my;
}();

$(document).ready(function() {
  SubNavigation.initialize();
});

//# sourceURL=sub-navigation.js
