import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {ResponsiveLine} from '@nivo/line';

const WeeklyData = ({totalBreaks, dateOfBreaks}) => {
  let breakDate = Object.values(dateOfBreaks)
  let breakArr = breakDate.map(el =>el.createdAt)
  console.log(breakDate)
  console.log(breakArr)
    return (
        <>
      <h4>Daily Break Count</h4>
      <ReactEcharts
        option={{
          xAxis: [
            {
              // adapters: {
              //  date: {locale: Date.now()},
              //   type: "time",
              //   distributions: "linear",
              //   time: {
              //     parser: "yyyy-MM-dd",
              //     unit: "month"
              //   }
              // },
              
              axisLabel: {
                interval: 0,
                rotate: 55,
                // formatter: (function(createdBreak){
                //     return moment(createdBreak).format('MM/DD');
                // }),
                
                textStyle: {
                  baseline: "top",
                  color: "#333",
                  fontSize: 10,
                  fontWeight: "bold",
                 
                }
              },
             type: 'category',
            data: [breakArr]
            // data: [timeArr]
          }
        ],
          yAxis: [
            {
              axisLabel: {
                textStyle: { fontSize: 10,
              color: "#333" }
              },
              axisLine: { show: false },
              axisTick: { show: false },
              name: "Break Count",
              // may need a break time graph
              splitLine: {
                lineStyle: {
                  type: "dotted"
                }
              },
            type: 'value'
          }
        ],
          series: [{ 
            data: [totalBreaks],
            type: 'line'
          }]
        }}
      />
{/* <ResponsiveLine
        data={[
          data
        }]
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    /> */}

<div className='break_table'>
            <div>
            <h4>Break information</h4>
            {Object.values(dateOfBreaks &&
        dateOfBreaks).map((breaks, index) => (
          <div key={index}>
            <p>
              {breaks.createdAt}
               
            </p>

          </div>
        ))}
              
              </div>
            </div>




        
            
      </>
    );
  }

export default WeeklyData;