/* eslint-disable react-hooks/exhaustive-deps */
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import './custom.scss';

interface BarChartProps {
    names: string[];
    data: number[];
    text: string;
    AdditionalData: { maxRating?: number; minRating?: number }[];
}

const BarChart = ({ names, data, text, AdditionalData }: BarChartProps) => {
    const chartDiv = useRef(null);
    let myChart = null;

    useEffect(() => {
        myChart = echarts.init(chartDiv.current);
        interface TooltipParams {
            data: number;
            dataIndex: number;
            name: string;
        }

        interface MarkPointData {
            type: string;
            name: string;
        }

        interface SeriesItemStyle {
            color: (params: { data: string }) => string;
        }

        interface Series {
            name: string;
            type: string;
            data: number[];
            markPoint: {
            data: MarkPointData[];
            };
            itemStyle: SeriesItemStyle;
        }

        interface XAxis {
            type: string;
            data: string[];
        }

        interface YAxis {
            type: string;
        }

        interface DataZoom {
            type: string;
            start: number;
            end: number;
        }

        interface ToolboxFeature {
            magicType: {
            show: boolean;
            type: string[];
            };
            saveAsImage: {
            show: boolean;
            };
        }

        interface Toolbox {
            show: boolean;
            feature: ToolboxFeature;
        }

        myChart.setOption({
            title: {
            text: text,
            padding: [0, 0, 10, 0]
            },
            dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 100
            } as DataZoom,
            {
                type: 'inside',
                start: 0,
                end: 0
            } as DataZoom
            ],
            tooltip: {
            trigger: 'axis',
            formatter: function (params: TooltipParams[]) {
                const data = params[0].data;
                const maxRating = AdditionalData[params[0].dataIndex]?.maxRating;
                const minRating = AdditionalData[params[0].dataIndex]?.minRating;
                return `<div>
                <h4 class="text-lg text-center font-semibold capitalize">${params[0].name}</h4>
                <p>Total Rating: ${data}</p>
                <p>Max Rating: ${maxRating}</p>
                <p>Min Rating: ${minRating}</p>
                </div>`;
            },
            },
            toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            } as ToolboxFeature
            } as Toolbox,
            calculable: true,
            xAxis: [
            {
                type: 'category',
                data: names
            } as XAxis
            ],
            yAxis: [
            {
                type: 'value'
            } as YAxis
            ],
            series: [
            {
                name: 'Total',
                type: 'bar',
                data: data,
                markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
                },
                itemStyle: {
                color: function (params: { data: string }) {
                    return params.data = '#1abc9c';
                }
                }
            } as Series
            ]
        });
    }, [names, data])

    return (
        <div ref={chartDiv} style={{ width: '100%', height: '400px' }}></div>
    )
}

export default BarChart
