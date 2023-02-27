import { ResponsivePie } from '@nivo/pie';
import { FC } from 'react';
import {useTranslation} from 'react-i18next';
import s from './Diagram.module.css';

export const MyResponsivePie: FC< { data: Array<{ id: string; label: string; value: number | undefined; color: string; }>; }> = ({ data }) => {
  const {t} = useTranslation('common');

  return (
    <div className={s.wrapper}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={6}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.2
                  ]
              ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='#e3e3e3'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      2
                  ]
              ]
          }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: `${t('finishGameStatistics.correctChars')}`
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: `${t('finishGameStatistics.incorrectChars')}`
                  },
                  id: 'lines'
              },
            
          ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 150,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
      )
    </div>
  );
};
