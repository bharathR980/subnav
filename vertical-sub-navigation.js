var VerticalSubNavigation = function() {
    var my = {};
    my.initialize = function() {
        if (window.matchMedia('(max-width:769px)').matches) {
            $('#content a').on("click", function(e) {
                e.preventDefault();
                var url = $(this).attr("data-content");
                var href = $(this).attr("data-target");
                var panel = $(this);
                if ($(this).hasClass('in')) {
                    /*$(this).removeClass('in');
                    $('#content a').removeClass('in');*/
 					 setTimeout(function() {
                    	 $(this).removeClass('in');
                         $('#content a').removeClass('in');
                     },1000);
                } else {
                    $('#content a').removeClass('in');
                    $('#content div').removeClass('in');
                    $(this).addClass('in');
                }
                $(href).load(url, function(result) {
                    panel.collapse('show');

                });
                setTimeout(function() {
                    $(".expand-collapse-content [data-toggle='collapse']").click(function(e) {
                        e.preventDefault();
                        var target = $(this).attr("data-target");
                        $(target).collapse('toggle');
                        return false;
                    });

                }, 1000);
            });
            let firstTab = $(".vertical-sub-navigation-container #content .tab-pane .card-header:first-child a").attr("data-target");
          /*  $(firstTab).load($(".vertical-sub-navigation-container #content .tab-pane .card-header a").attr("data-content"), function(result) {
                $(firstTab).addClass('in');
            }); */
			 $.ajax({
					url:$(".vertical-sub-navigation-container #content .tab-pane .card-header a").attr("data-content"),
					dataType:'html',
					success: function(html){
				 		mobiledatahtml = html;
					}
			})
            setTimeout(function() {
				$(firstTab).html(mobiledatahtml);
                $(firstTab).addClass('in');
                const tempVar = "a[data-target='" + firstTab + "']";
                $(tempVar).addClass('in');
                $("[data-toggle='collapse']").click(function(e) {
                    e.preventDefault();
                    var target = $(this).attr("data-target");
                    $(target).collapse('toggle');
                    return false;
                });
            }, 2000);
            $('#content').on("show.bs.collapse", ".collapse", function(e) {
                $('#content').find(".vertical-subnav-collapse.collapse.in").collapse('hide');
            })

        } else {
            $('#vertical-sub-nav a').on("click", function(e) {
                e.preventDefault();
                var url = $(this).attr("data-content");
                var href = $(this).attr("data-target");
                var panel = $(this);

                $(href).load(url, function(result) {
                    panel.tab('show');
                })
                setTimeout(function() {
                    $(".expand-collapse-content [data-toggle='collapse']").click(function(e) {
                        e.preventDefault();
                        var target = $(this).attr("data-target");
                        $(target).collapse('toggle');
                        return false;
                    });

                }, 200);
            });
            $('#vertical-sub-nav').keypress(function(e) {
                if (e.which == 13) {
                    let el = e.target.children[0];
                    e.preventDefault();
                    var url = $(el).attr("data-content");
                    var href = $(el).attr("data-target");
                    var panel = $(el);

                    $(href).load(url, function(result) {
                        panel.tab('show');
                    })
                    setTimeout(function() {
                        panel.tab('show');
                        $(".expand-collapse-content [data-toggle='collapse']").click(function(e) {
                            e.preventDefault();
                            var target = $(this).attr("data-target");
                            $(target).collapse('toggle');
                            return false;
                        });

                    }, 200);
                }
            });
            let firstTab = $("#vertical-sub-nav li:first-child a").attr("data-target");
            /*$(firstTab).load($("#vertical-sub-nav li:first-child a").attr("data-content"), function(result) {
                $("#vertical-sub-nav li:first-child a").tab('show');
            });*/
             $.ajax({
					url:$("#vertical-sub-nav li:first-child a").attr("data-content"),
					dataType:'html',
					success: function(html){
				 		datahtml = html;
					}
			})
             setTimeout(function() {
            	$(firstTab).html(datahtml);
                $("#vertical-sub-nav li:first-child a").tab('show');
                $(".expand-collapse-content [data-toggle='collapse']").click(function(e) {

                    e.preventDefault();
                    var target = $(this).attr("data-target");
                    $(target).collapse('toggle');
                    return false;
                });

            }, 2000);
        }
    }
    return my;
}();

$(document).ready(function() {
    VerticalSubNavigation.initialize();
});
