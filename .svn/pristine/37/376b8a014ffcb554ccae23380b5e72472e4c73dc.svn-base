export namespace SpectrumChart {
    'use strict';

    export let legend: boolean = true;
    export let type: string = 'bar';
    export let barChartOptions: any = {
        scaleShowVerticalLines: false,
        // display: false,
        responsive: true,
        // legend: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data){
                    return tooltipItem.yLabel - 100;
                }
            }
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Frequency (MHz)'
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Power (dBm)'
                },
                ticks: {
                    reverse: false,
                    min: 0,
                    max: 60,
                    stepSize: 10,
                    callback: function(label, index, lables){
                        return label - 100;
                    }
                },
                gridLines: {
                    // display: false
                }
            }]
        }
    };

    export let currentColor: string = 'rgba(141, 181, 211, 1)';
    export let averageColor: string = 'rgba(244, 127, 107, 1)';
    export let maxColor: string = 'rgba(114, 205, 154, 1)';
    export let barChartColors: Array<any> = [
        {
            backgroundColor: currentColor,
            borderColor: currentColor,
            pointBackgroundColor: currentColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: currentColor
        },
        {
            backgroundColor: averageColor,
            borderColor: averageColor,
            pointBackgroundColor: averageColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: averageColor
        },
        {
            backgroundColor: maxColor,
            borderColor: maxColor,
            pointBackgroundColor: maxColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: maxColor
        }
    ];
}




