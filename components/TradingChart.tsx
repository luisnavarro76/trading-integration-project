"use client";

import { useEffect, useRef } from 'react';

interface TradingChartProps {
  data?: Array<{ time: string; value: number }>;
}

export default function TradingChart({ data }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    let chart: any;

    const initChart = async () => {
      const { createChart, ColorType } = await import('lightweight-charts');

      chart = createChart(chartContainerRef.current!, {
        layout: {
          background: { type: ColorType.Solid, color: '#050505' },
          textColor: '#666',
        },
        grid: {
          vertLines: { color: '#1a1a1a' },
          horzLines: { color: '#1a1a1a' },
        },
        width: chartContainerRef.current!.clientWidth,
        height: chartContainerRef.current!.clientHeight,
        timeScale: {
          borderColor: '#1a1a1a',
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          borderColor: '#1a1a1a',
        },
        crosshair: {
          mode: 1 as any,
          vertLine: {
            color: '#EC4E02',
            width: 1,
            style: 2 as any,
            labelBackgroundColor: '#EC4E02',
          },
          horzLine: {
            color: '#EC4E02',
            width: 1,
            style: 2 as any,
            labelBackgroundColor: '#EC4E02',
          },
        },
      });

      const areaSeries = chart.addAreaSeries({
        lineColor: '#2962FF',
        topColor: 'rgba(41, 98, 255, 0.4)',
        bottomColor: 'rgba(41, 98, 255, 0.0)',
        lineWidth: 2,
      });

      const defaultData = [
        { time: '2025-01-01', value: 0.0487 },
        { time: '2025-01-02', value: 0.0489 },
        { time: '2025-01-03', value: 0.0492 },
        { time: '2025-01-04', value: 0.0488 },
        { time: '2025-01-05', value: 0.0495 },
        { time: '2025-01-06', value: 0.0498 },
        { time: '2025-01-07', value: 0.0494 },
        { time: '2025-01-08', value: 0.0497 },
        { time: '2025-01-09', value: 0.0493 },
        { time: '2025-01-10', value: 0.0490 },
        { time: '2025-01-11', value: 0.0496 },
        { time: '2025-01-12', value: 0.0499 },
        { time: '2025-01-13', value: 0.0495 },
        { time: '2025-01-14', value: 0.0491 },
        { time: '2025-01-15', value: 0.0489 },
      ];

      areaSeries.setData(data || defaultData);
      chart.timeScale().fitContent();

      const handleResize = () => {
        if (chartContainerRef.current && chart) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chart) {
          chart.remove();
        }
      };
    };

    initChart();

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
