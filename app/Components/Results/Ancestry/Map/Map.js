import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { Tooltip, Box } from '@mantine/core';

import { useAtom } from 'jotai'
import { dataAtom } from "../../../../utils/atoms";



const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0, 1])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [userData, setUserData] = useAtom(dataAtom)

  useEffect(() => {
    const handleMouseMove = (event) => {
        const xOffset = 10; // Horizontal offset from the mouse cursor
        const yOffset = 20; // Vertical offset to position the tooltip above the mouse cursor
    
        setMousePosition({ x: event.clientX + xOffset, y: event.clientY - yOffset });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const tooltipStyle = {
    position: 'fixed',
    left: `${mousePosition.x + 10}px`,
    top: `${mousePosition.y + 10}px`,
    pointerEvents: 'none', // Makes the tooltip click-through
  };


  return (
    <>
    <Box style={tooltipStyle}>
        <Tooltip label={tooltipContent} opened={tooltipOpen}>
          <div style={{ height: '1px', width: '1px', opacity: 0 }}></div>
        </Tooltip>
      </Box>
    <ComposableMap
    height={400}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      {userData.countries.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = userData.countries.find((s) => s[0] === geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d[1]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    if (d) {
                        setTooltipContent(`${d[0]}: ${d[1]}`);
                        setTooltipOpen(true);
                    }
                    }}
                    onMouseLeave={() => {
                        setTooltipOpen(false);
                        }}
                  style={{
                    default: {
                        outline: 'none'
                    },
                    hover: {
                        outline: 'none'
                    },
                    pressed: {
                        outline: 'none'
                    }
                }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap></>
  );
};

export default MapChart;
