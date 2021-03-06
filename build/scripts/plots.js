$(document).ready(function () {
    plot1 = $.jqplot('mastery-winrate', [winrateData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'Winrate',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'Winrate: %s%<br>Mastery Points: %s'
        }

    });

    plot2 = $.jqplot('mastery-kda', [kdaData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'KDA',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'KDA: %.1f<br>Mastery Points: %s'
        }

    });
    plot3 = $.jqplot('mastery-tower', [towerData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'Turrets Destroyed',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                min: 0,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'Turrets Destroyed: %s<br>Mastery Points: %s'
        }

    });
    plot4 = $.jqplot('mastery-damage', [damageDealtData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'Total Damage Dealt',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                min: 0,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'Damage Dealt: %s<br>Mastery Points: %s'
        }

    });
    plot5 = $.jqplot('mastery-minions', [minionsData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'Minions Killed',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                min: 0,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'Minions Killed: %s<br>Mastery Points: %s'
        }

    });
    plot6 = $.jqplot('mastery-gold', [goldData], {
        seriesDefaults: {
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                autoscalePointsFactor: -0.25,
                autoscaleMultiplier: 0.55,
                bubbleAlpha: 0.7,
                highlightAlpha: 1
            },
            shadow: true,
            shadowAlpha: 0.05,

        },
        axes: {
            xaxis: {
                pad: 0,
                tickOptions: {
                    showGridline: true
                },
                showTicks: true,
                drawMinorTickMarks: false,
                label: 'Mastery Points',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010'
                },
            },
            yaxis: {
                showTicks: true,
                label: 'Total Gold Earned',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                min: 0,
                labelOptions: {
                    fontFamily: "'Muli', sans-serif",
                    fontSize: '16pt',
                    textColor: '#101010',

                },
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'yx',
            yvalues: 1,
            tooltipOffset: 20,
            tooltipFadeSpeed: 'def',
            tooltipLocation: 'n',
            formatString: 'Gold Earned: %s<br>Mastery Points: %s'
        }

    });
    GraphImages();
    FixAxes();
});
$(window).resize(debouncer(function () {
    plot1.replot({resetAxes: true});
    plot2.replot({resetAxes: true});
    plot3.replot({resetAxes: true});
    plot3.replot({resetAxes: true});
    plot4.replot({resetAxes: true});
    plot5.replot({resetAxes: true});
    plot6.replot({resetAxes: true});
    GraphImages();
    FixAxes();
}));
var GraphImages = function () {
    var count = $('.jqplot-bubble-label').length;

    for (var i = 0; i < count; i++) {
        var data = $('.jqplot-bubble-label')[i].innerHTML;
        result = data.split(',');
        var champName = result[0];
        var lvl = result[1];
        champName = champName.replace(/ |'/g, '');
        var current = $('.jqplot-bubble-label')[i];
        var bgImg = "http://ddragon.leagueoflegends.com/cdn/" + version.toString() + "/img/champion/" + champName;
        $(current).css("background", "url(" + bgImg + ")");
        $(current).append("<span class='sprite sprite-champ-mastery-" + lvl + "'></span>");
    }
};
var FixAxes = function () {
    var count = $('.plot-percent>.jqplot-yaxis>.jqplot-yaxis-tick').length;

    for (var i = 0; i < count; i++) {
        var current = $('.plot-percent>.jqplot-yaxis>.jqplot-yaxis-tick')[i];
        var value = current.innerHTML;

        if (value > 100 || value < 0) {
            $(current).hide();
        }


    }
    var count = $('.jqplot-xaxis-tick').length;

    for (var i = 0; i < count; i++) {
        var current = $('.jqplot-xaxis-tick')[i];
        var value = current.innerHTML;

        if (value < 0) {
            $(current).hide();
        } else if (i % 2 == 0) {
            $(current).hide();
        }


    }
};

function debouncer (func, timeout) {
    var timeoutID, timeout = timeout || 200;
    return function () {
        var scope = this, args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function () {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    }
}