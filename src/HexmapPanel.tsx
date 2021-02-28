import React from 'react';
import { css, cx } from 'emotion';

import { Field, FieldType, PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

import { PanelWizard } from 'grafana-plugin-support';

import { HexagonGroup } from './HexagonGroup';
import { SimpleOptions } from './types';

type Group = {
  [value: string]: { indexes: number[]; next?: Group };
};

const usage = {
  schema: [{ type: FieldType.number, description: 'Value' }],
  url: 'https://github.com/marcusolsson/grafana-hexmap-panel',
};

type Props = PanelProps<SimpleOptions>;

export const HexmapPanel = ({ options, data, width, height }: Props) => {
  const { padding, background, guides } = options;

  const styles = getStyles();

  const { sizeByField, colorByField, groupByField } = options;

  if (data.series.length === 0) {
    return <PanelWizard {...usage} />;
  }

  const frame = data.series[0];

  const sizeField = frame.fields.find((f) => f.name === sizeByField);

  const colorField = colorByField
    ? frame.fields.find((f) => f.name === colorByField)
    : frame.fields.find((f) => f.type === FieldType.number);

  if (!colorField) {
    return <PanelWizard {...usage} fields={frame.fields} />;
  }

  const groupedField = frame.fields.find((f) => f.name === groupByField);

  const margin = 0;

  const chartWidth = width - margin * 2;
  const chartHeight = height - margin * 2;

  let groupedData = groupedField
    ? groupData(groupedField)
    : { All: { indexes: Array.from({ length: frame.length }).map((_, i) => i) } };

  const aspectRatio = chartWidth / chartHeight;

  const numGroups = Object.keys(groupedData).length;
  const numColumns = aspectRatio < 0.5 ? 1 : Math.min(Math.ceil(aspectRatio) + 1, numGroups);
  const numRows = Math.ceil(numGroups / numColumns);

  let subWidth = chartWidth / numColumns;
  let subHeight = chartHeight / numRows;

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <g transform={`translate(${margin}, ${margin})`}>
          {guides && (
            <rect
              width={chartWidth}
              height={chartHeight}
              className={css`
                fill: none;
                stroke-width: 1;
                stroke: #ffff00;
              `}
            />
          )}

          {Object.entries(groupedData).map(([key, value], i) => {
            return (
              <g
                key={i}
                transform={`translate(${(i % numColumns) * subWidth}, ${Math.floor(i / numColumns) * subHeight})`}
              >
                <HexagonGroup
                  label={Object.keys(groupedData).length > 1 ? key : undefined}
                  padding={padding}
                  background={background}
                  width={subWidth}
                  height={subHeight}
                  colorField={colorField}
                  sizeField={sizeField}
                  indexes={value.indexes}
                  guides={guides}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});

const groupData = (field: Field): Group => {
  return field.values
    .toArray()
    .map((value, index) => ({ value, index }))
    .reduce<Group>((acc, curr) => {
      if (!acc[curr.value]) {
        acc[curr.value] = {
          indexes: [],
        };
      }
      acc[curr.value].indexes.push(curr.index);
      return acc;
    }, {});
};
