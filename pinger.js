$(function () {
    
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    
        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'line',
                marginRight: 10,
                events: {
                    load: function() {
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime();
                            var startTime = (new Date()).getTime();
                            var img = new Image();
                            img.onload = function(){
                                var responseTime = (new Date()).getTime() - startTime;
                                console.log(responseTime);
                                series.addPoint([x, responseTime], true);
                              };
                            img.onerror = function(){
                                console.log("in error");
                                series.addPoint([x, 0], true);
                            };
                            img.src = "https://lh3.googleusercontent.com/-exdVIn73GqA/AAAAAAAAAAI/AAAAAAAAAAA/BwCer9DYe3I/s30-c/photo.jpg?cachebreaker="+new Date().getTime();
                            
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live internet ping'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Response time'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: []
            }]
        });
});