import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

interface PieChartProps {
    data: { name: string; value: number }[];
    text: string;
    subtext: string;
}

const PieChart = ({ data, text, subtext }: PieChartProps) => {
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const chartDiv = useRef(null);
    const resizeTimeout = useRef<number | undefined>(undefined);

    const newData = data?.map(item => {
        return { ...item, name: item?.name }
    });

    useEffect(() => {
        const resizeHandler = () => {
            clearTimeout(resizeTimeout.current);
            resizeTimeout.current = window.setTimeout(() => {
                if (chartInstance) {
                    chartInstance.resize();
                }
            }, 1);
        };

        const observer = new ResizeObserver(resizeHandler);
        if (chartDiv.current) {
            observer.observe(chartDiv.current);
        }

        return () => {
            observer.disconnect();
            clearTimeout(resizeTimeout.current);
        };
    }, [chartInstance]);

    useEffect(() => {
        const chart = echarts.init(chartDiv.current);
        setChartInstance(chart);

        chart.setOption({
            title: {
                text: text,
                subtext: subtext,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: newData?.map(item => item?.name)
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: newData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    }
                }
            ]
        });

        return () => {
            chart.dispose();
        };
    }, [data, text, subtext]);

    return <div ref={chartDiv} style={{ width: '100%', height: '400px' }} />;
};

export default PieChart;
