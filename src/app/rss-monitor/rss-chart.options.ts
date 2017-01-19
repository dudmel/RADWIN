export namespace RssChart {
    'use strict';
    export let legend: boolean = false;
    export let type: string = 'line';
    export let lineChartOptions: any = {
        animation: false,
        scaleShowVerticalLines: false,
        reponsive: true,
        lineTension: 0,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time [sec]',
                },
                ticks: {
                    fontSize: 8
                },
                gridLines: {
                    display: true,
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'RSS [dBm]'
                },
                ticks: {
                    reverse: false,
                    min: -90,
                    max: -40,
                    stepSize: 5,
                    fontSize: 9
                },
                gridLines: {
                }
            }]
        },
    };

    export let currentColor: string = 'rgba(141, 181, 211, 1)';
    export let averageColor: string = 'rgba(244, 127, 107, 1)';
    export let maxColor: string = 'rgba(114, 205, 154, 1)';
    export let lineChartColors: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: currentColor,
            pointBackgroundColor: currentColor,
            pointBorderColor: currentColor,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: currentColor
        },
        {
            backgroundColor: 'transparent',
            borderColor: maxColor,
            pointBackgroundColor: maxColor,
            pointBorderColor: maxColor,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: maxColor
        }
    ];
}




