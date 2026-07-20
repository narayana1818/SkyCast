import React, { useContext } from 'react'
import { Weathercontext, usecontext } from '../context/Weathercontext';
import '../styling/hourlytemp.css'
const Hourlytemp = () => {
  const { tempData, aqiData, city, isMobile } = useContext(Weathercontext);
  let temparray = [];
  let hourlyCards = [];
  let graphWidth = 636;
  let points = [];
  let graphPath = "";

  if (!tempData) {

    for (let i = 0; i < 8; i++) {
      hourlyCards.push(
        <div key={i} className="card1">
          <h2 className="time1"></h2>
          <h2 className="emoji128"></h2>
          <h2 className="temp1"></h2>
        </div>
      );
    }
  }

  else {
    const currentHour = new Date(tempData.current.time).getHours();
    hourlyCards = [];
    for (let i = currentHour; i < currentHour + 8; i++) {
      temparray.push(tempData.hourly.temperature_2m[i]);
    }

    const maxTemp = Math.max(...temparray);
    const minTemp = Math.min(...temparray);
    const range = maxTemp - minTemp || 1;

    const top = 20;
    const bottom = 60;
    const cardWidth = 70;
    const cardGap = 10;

    const getPointColor = (temp) => {
      if (temp >= maxTemp - range / 3) return "#FF7A5C";
      if (temp <= minTemp + range / 3) return "#4FC3F7";
      return "#FFD54F";
    };

    points = temparray.map((temp, index) => {

      const x = cardGap + index * (cardWidth + cardGap) + cardWidth / 2;

      const y =
        top +
        ((maxTemp - temp) / range) *
        (bottom - top);

      return { x, y, temp, color: getPointColor(temp) };

    });

    if (points.length) {

      graphPath = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {

        const prev = points[i - 1];
        const curr = points[i];

        const midX = (prev.x + curr.x) / 2;

        graphPath += ` Q ${midX} ${prev.y} ${curr.x} ${curr.y}`;
      }
    }
    for (let i = currentHour; i < currentHour + 8; i++) {
      const houremoji = () => {
        if (tempData.hourly.weather_code[i] === 95 && tempData.hourly.rain[i] > 60) {
          return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title xmlns="">thunderstorms-night-snow-fill</title><defs><linearGradient id="SVGMeEfudbH" x1="99.5" x2="232.6" y1="30.7" y2="261.4" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe" /><stop offset=".5" stop-color="#f3f7fe" /><stop offset="1" stop-color="#deeafb" /></linearGradient><linearGradient id="SVGvnYDXzed" x1="8.7" x2="80.9" y1="17.1" y2="142.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b" /><stop offset=".5" stop-color="#f7b23b" /><stop offset="1" stop-color="#f59e0b" /></linearGradient><linearGradient id="SVGZtvutewA" x1="34.7" x2="119.2" y1="18.6" y2="165" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db" /><stop offset=".5" stop-color="#86c3db" /><stop offset="1" stop-color="#5eafcf" /></linearGradient><linearGradient id="SVGnK1vQdoS" x1="11.4" x2="32.8" y1="5.9" y2="43.1" href="#SVGZtvutewA" /><linearGradient id="SVGCgQdGRIO" x1="67.4" x2="88.8" y1="5.9" y2="43.1" href="#SVGZtvutewA" /><linearGradient id="SVG5lnOW19b" x1="123.4" x2="144.8" y1="5.9" y2="43.1" href="#SVGZtvutewA" /><symbol id="SVGsJRxDb0X" viewBox="0 0 172 172"><path fill="url(#SVGZtvutewA)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M160.6 107.4a84.8 84.8 0 0 1-85.4-84.3A83.3 83.3 0 0 1 78 2A84.7 84.7 0 0 0 2 85.7A84.8 84.8 0 0 0 87.4 170a85.2 85.2 0 0 0 82.6-63.1a88 88 0 0 1-9.4.5Z"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="-15 86 86; 9 86 86; -15 86 86" /></path></symbol><symbol id="SVGMnBDAb4I" viewBox="0 0 350 222"><path fill="url(#SVGMeEfudbH)" stroke="#e6effc" stroke-miterlimit="10" stroke-width="6" d="m291 107l-2.5.1A83.9 83.9 0 0 0 135.6 43A56 56 0 0 0 51 91a56.6 56.6 0 0 0 .8 9A60 60 0 0 0 63 219l4-.2v.2h224a56 56 0 0 0 0-112Z" /></symbol><symbol id="SVG28kZBITK" viewBox="0 0 351 246"><use width="172" height="172" href="#SVGsJRxDb0X" /><use width="350" height="222" href="#SVGMnBDAb4I" transform="translate(1 24)" /></symbol><symbol id="SVGsdZ32bDr" viewBox="0 0 156.2 49"><g><path fill="url(#SVGZtvutewA)" stroke="#86c3db" stroke-miterlimit="10" d="m41.7 31l-5.8-3.3a13.7 13.7 0 0 0 0-6.5l5.8-3.2a4 4 0 0 0 1.5-5.5a4 4 0 0 0-5.6-1.5l-5.8 3.3a13.6 13.6 0 0 0-2.6-2a13.8 13.8 0 0 0-3-1.3V4.5a4 4 0 0 0-8.1 0v6.6a14.3 14.3 0 0 0-5.7 3.2L6.6 11A4 4 0 0 0 1 12.5A4 4 0 0 0 2.5 18l5.8 3.3a13.7 13.7 0 0 0 0 6.5L2.5 31A4 4 0 0 0 1 36.5a4 4 0 0 0 3.5 2a4 4 0 0 0 2-.5l5.8-3.3a13.6 13.6 0 0 0 2.6 2a13.8 13.8 0 0 0 3 1.2v6.6a4 4 0 0 0 8.2 0v-6.6a14.2 14.2 0 0 0 5.6-3.2l6 3.3a4 4 0 0 0 2 .5a4 4 0 0 0 3.4-2a4 4 0 0 0-1.4-5.5ZM19 29.7a6 6 0 0 1-2.3-8.2a6.1 6.1 0 0 1 5.3-3a6.2 6.2 0 0 1 3 .8a6 6 0 0 1 2.2 8.2a6.1 6.1 0 0 1-8.2 2.2Z" opacity="0"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 24 24; 360 24 24" /><animate id="SVGifbapeDh" attributeName="opacity" begin="0s; t1.end+1s" dur="2s" keyTimes="0; .17; .83; 1" values="0; 1; 1; 0" /></path><animateTransform id="SVGd5cUtb9b" additive="sum" attributeName="transform" begin="0s; s1.end+1s" dur="2s" type="translate" values="0 -36; 0 92;" /></g><g><path fill="url(#SVGnK1vQdoS)" stroke="#86c3db" stroke-miterlimit="10" d="m97.7 31l-5.8-3.3a13.7 13.7 0 0 0 0-6.5l5.8-3.2a4 4 0 0 0 1.5-5.5a4 4 0 0 0-5.6-1.5l-5.8 3.3a13.6 13.6 0 0 0-2.6-2a13.8 13.8 0 0 0-3-1.3V4.5a4 4 0 0 0-8.1 0v6.6a14.3 14.3 0 0 0-5.7 3.2L62.6 11a4 4 0 0 0-5.6 1.5a4 4 0 0 0 1.5 5.5l5.8 3.3a13.7 13.7 0 0 0 0 6.5L58.5 31a4 4 0 0 0-1.5 5.5a4 4 0 0 0 3.5 2a4 4 0 0 0 2-.5l5.8-3.3a13.6 13.6 0 0 0 2.7 2a13.8 13.8 0 0 0 3 1.2v6.6a4 4 0 0 0 8 0v-6.6a14.2 14.2 0 0 0 5.7-3.2l6 3.3a4 4 0 0 0 2 .5a4 4 0 0 0 3.4-2a4 4 0 0 0-1.4-5.5ZM75 29.7a6 6 0 0 1-2.3-8.2a6.1 6.1 0 0 1 5.3-3a6.2 6.2 0 0 1 3 .8a6 6 0 0 1 2.2 8.2a6.1 6.1 0 0 1-8.2 2.2Z" opacity="0"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 80 24; 360 80 24" /><animate id="SVGs0wz2HfD" attributeName="opacity" begin="-.83s; t2.end+1s" dur="2s" keyTimes="0; .17; .83; 1" values="0; 1; 1; 0" /></path><animateTransform id="SVGiZIbbC1N" additive="sum" attributeName="transform" begin="-.83s; s2.end+1s" dur="2s" type="translate" values="0 -36; 0 92;" /></g><g><path fill="url(#SVGCgQdGRIO)" stroke="#86c3db" stroke-miterlimit="10" d="m153.7 31l-5.8-3.3a13.7 13.7 0 0 0 0-6.5l5.8-3.2a4 4 0 0 0 1.5-5.5a4 4 0 0 0-5.6-1.5l-5.8 3.3a13.6 13.6 0 0 0-2.6-2a13.8 13.8 0 0 0-3-1.3V4.5a4 4 0 0 0-8.1 0v6.6a14.3 14.3 0 0 0-5.7 3.2l-5.8-3.3a4 4 0 0 0-5.6 1.5a4 4 0 0 0 1.5 5.5l5.8 3.3a13.7 13.7 0 0 0 0 6.5l-5.8 3.2a4 4 0 0 0-1.5 5.5a4 4 0 0 0 3.5 2a4 4 0 0 0 2-.5l5.8-3.3a13.6 13.6 0 0 0 2.7 2a13.8 13.8 0 0 0 3 1.2v6.6a4 4 0 0 0 8 0v-6.6a14.2 14.2 0 0 0 5.7-3.2l5.8 3.3a4 4 0 0 0 2 .5a4 4 0 0 0 3.5-2a4 4 0 0 0-1.3-5.5ZM131 29.7a6 6 0 0 1-2.3-8.2a6.1 6.1 0 0 1 5.3-3a6.2 6.2 0 0 1 3 .8a6 6 0 0 1 2.2 8.2a6.1 6.1 0 0 1-8.2 2.2Z" opacity="0"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 136 24; 360 136 24" /><animate id="SVGI61N2d1g" attributeName="opacity" begin=".83s; t3.end+1s" dur="2s" keyTimes="0; .17; .83; 1" values="0; 1; 1; 0" /></path><animateTransform id="SVGM9wm8dfc" additive="sum" attributeName="transform" begin=".83s; s3.end+1s" dur="2s" type="translate" values="0 -36; 0 92;" /></g></symbol><symbol id="SVGoZRYF6di" viewBox="0 0 102.7 186.8"><path fill="url(#SVGvnYDXzed)" stroke="#f6a823" stroke-miterlimit="10" stroke-width="4" d="m34.8 2l-32 96h32l-16 80l80-112h-48l32-64h-48z"><animate id="SVGbxDaaeoE" attributeName="opacity" begin="0s; x1.end+.67s" dur="1.33s" keyTimes="0; .38; .5; .63; .75; .86; .94; 1" values="1; 1; 0; 1; 0; 1; 0; 1" /></path></symbol></defs><use width="351" height="246" href="#SVG28kZBITK" transform="translate(80 121)" /><use width="156.2" height="49" href="#SVGsdZ32bDr" transform="translate(177.9 337.5)" /><use width="102.7" height="186.7" href="#SVGoZRYF6di" transform="translate(205.23 291)" /></svg>;
        }
        else if (tempData.hourly.rain[i] > 40) {
          return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><title xmlns="">sun-behind-rain-cloud</title><path fill="#FCC11A" d="M38.29 29.14c-6.01 7.73-5.91 21.47 1.78 28.27c8.73 7.72 21.01 7.65 28.74.54c9.26-8.52 8.73-22.71.54-30.74c-8.24-8.08-22.95-8.5-31.06 1.93" /><path fill="#FEE269" d="M47.95 26.49c-2.38-1.06-4.98 1.81-6.12 3.78c-1.13 1.96-2.19 5.81.23 6.8c2.42.98 4.15-.68 5.89-3.55c1.74-2.88 2.72-5.82 0-7.03" /><path fill="#FFA722" d="M54.14 15.71c-.58 1.08-.38 1.91.76 2.18s8.28 1.43 8.88 1.47c.87.05 1.2-.6 1.09-1.36S63.02 6.56 62.85 5.58c-.16-.98-1.2-1.96-2.18-.65s-6.09 9.96-6.53 10.78m18.46 7.41c-1.12.35-1.09 1.03-.49 1.91c.6.87 4.74 7.19 5.12 7.62c.38.44 1.03.54 1.58-.11s7.35-10.19 7.84-10.78c.82-.98.33-2.02-.93-1.69c-.94.25-12.41 2.83-13.12 3.05M30.12 52.09c.76-1.25 1.74-.93 2.45.27c.48.82 4.57 6.32 4.96 6.92c.38.6.54 1.74-.65 2.02c-1.2.27-10.95 2.83-12.47 3.1s-2.4-.93-1.42-2.23c.57-.77 6.7-9.37 7.13-10.08m-2.06-9.48c1.39.62 2.05.4 2.34-.6c.38-1.31 1.52-7.3 1.58-8.66c.04-.89-.33-1.74-1.69-1.52s-11.16 1.58-12.42 2.02c-1.45.51-1.35 2.11-.38 2.61c1.14.6 9.59 5.72 10.57 6.15m16.93-22.87c.78-.63.54-1.52-.16-2.02c-.71-.49-9.46-6.82-10.57-7.68c-.98-.76-2.18-.49-1.85 1.25c.23 1.25 3.02 12.21 3.21 12.96c.22.87.87 1.31 1.63.76c.77-.53 6.93-4.62 7.74-5.27" /><path fill="#E2EBEE" d="M99.22 65.16s3.54-23.47-17.6-29.03C58.67 30.09 53.29 51.4 53.29 51.4s-6.68-1.82-12.85 3.14c-4.83 3.88-5.66 10.72-5.66 10.72s-9.41-.32-13.45 6.17c-3.84 6.17 0 10.22 0 10.22l55.54-2.23l34.19.2s2.47-6.42-2.28-10.87c-4.76-4.44-9.56-3.59-9.56-3.59" /><path fill="#B9CED3" d="M61.29 67.49s4.25 4.25 15.38 3.54s16.99-4.65 18.31-5.26s2.83-2.02 3.34-1.01s-.61 3.84-2.12 5.87c-1.52 2.02-2.37 3.25-2.63 4.15c-.2.71 3.14 1.72 9.41 2.02c5.36.26 8.74-.82 8.74-.82s.15 3.37-1.16 6c-1.22 2.43-2.49 3.22-4.51 3.63c-1.04.21-20.67.2-37.56.6s-38.95 1.11-42.69-.1s-4.66-3.58-5.14-4.5c-.84-1.58-1.02-4.05-1.02-4.05s4.14 2.08 10.01 1.27s9-3.84 9.81-4.15c.81-.3 4.65 1.62 10.72.1c8.48-2.13 11.11-7.29 11.11-7.29" /><path fill="#4FC2F7" d="M47.26 90.91c-1.32-.48-7.05 3.63-9.11 9.11c-3.04 8.09 7.79 10.79 10.07 3c.87-2.96.86-11.45-.96-12.11m42.81 5.9c-1.17-.52-5.82 3.02-7.93 5.99c-2.02 2.84-3.82 7.64 1.14 10.1c5.41 2.67 7.87-3.14 8.1-7.36c.21-3.82-.28-8.27-1.31-8.73m-23.55 9.59c-1.47-.35-7.11 4.23-9.13 8.5c-4.05 8.56 8.39 11.58 9.93 3.37c.98-5.21.4-11.59-.8-11.87" /><path fill="#AFE6F8" d="M61.24 113.05c-1.17-.47-3.45 2.4-3.2 4.95c.26 2.55 2.36 2.78 3.36 1.37c1.34-1.87 1-5.86-.16-6.32M41.68 97.56c-1.11-.52-3.01 2.52-2.99 4.09c.05 3.2 2.41 3.41 3.51 1.83c1.1-1.57 1.05-5.18-.52-5.92m43.15 6.21c-1.32-.63-3.59 2.28-3.42 4.39c.3 3.64 3.19 3.42 4.16 1.43s.45-5.25-.74-5.82" /></svg>;

        }
        else if (tempData.hourly.cloud_cover[i] > 50) {
          return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><title xmlns="">cloud</title><path fill="#E4EAEE" d="M23.45 62.3c.72-.72-1.27-9.29 7.6-15.91s14.92-2.67 15.77-2.96c.84-.28 4.79-17.6 21.4-22.1s33.93 3.94 38.01 18.02c3.73 12.87.84 21.54 1.27 22.1c.42.56 8.45.28 13.09 7.74s2.96 12.11 2.96 12.11l-29.56 9.15h-47.3S5.02 79.47 4.6 77.5s.53-8.37 7.32-12.25c5.9-3.37 10.26-1.68 11.53-2.95" /><path fill="#BACDD2" d="M35.16 92.84s-15.78 3.3-26.45-4.96C2.29 82.9 4.63 74.83 4.63 74.83s4.6 4.65 13.89 5.91c9.29 1.27 19.71.84 19.71.84s2.6 4.44 12.39 6.48c12.27 2.55 18.74-3.73 18.74-3.73s3.36 4.02 15.19 4.3s18.46-7.98 19.57-8.17c.56-.09 3.82 2.87 10.28 1.83c6.15-.99 9.39-3.66 9.39-3.66s.89 6.62-5.3 10.7c-4.83 3.18-13.23 3.52-13.23 3.52s-1.28 4.91-7.05 8.48c-5.36 3.33-14.6 4.44-21.44 2.4c-8.59-2.56-10.72-6.47-10.72-6.47s-6.4 3.75-16.4 2.48c-9.45-1.18-14.49-6.9-14.49-6.9" /></svg>;
        }
        else if (i >= 6 && i <= 18) {
          return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><title xmlns="">sun</title><path fill="#ffac33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z" /><circle cx="18" cy="18" r="10" fill="#ffac33" /></svg>;
        }
        else {
          return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><title xmlns="">full-moon</title><circle cx="18" cy="18" r="18" fill="#ffd983" /><g fill="#ffcc4d"><circle cx="10.5" cy="8.5" r="3.5" /><circle cx="20" cy="17" r="3" /><circle cx="24.5" cy="28.5" r="3.5" /><circle cx="22" cy="5" r="2" /><circle cx="3" cy="18" r="1" /><circle cx="30" cy="9" r="1" /><circle cx="15" cy="31" r="1" /><circle cx="32" cy="19" r="2" /><circle cx="10" cy="23" r="2" /></g></svg>;
        }
      }
      const getemoji = houremoji();
      const hour = new Date(tempData.hourly.time[i]).toLocaleTimeString([], { hour: "numeric", hour12: true });
      hourlyCards.push(
        <div className="card" key={i}>
          <h2 className="time">{hour}</h2>
          <h2 className="emoji">{getemoji}</h2>
          <h2 className="temp">{tempData.hourly.temperature_2m[i]}<span>&deg;</span></h2>
          <h2 className="rainchance">💧{tempData.hourly.precipitation_probability[i]}%</h2>
        </div>
      );
    }

  }
  return (
    <div className="hourlydiv">
      {

        tempData ? (

          <div className="hourforecast">
            {
              isMobile ? <div className="tempguage">


                <svg
                  width={graphWidth}
                  height="100%"
                >
                  <defs>
                    <linearGradient id="tempLineGradient" x1="0" y1="0" x2="1" y2="0">
                      {points.map((point, index) => (
                        <stop
                          key={index}
                          offset={`${(index / (points.length - 1)) * 100}%`}
                          stopColor={point.color}
                        />
                      ))}
                    </linearGradient>
                  </defs>

                  <path
                    d={graphPath}
                    fill="none"
                    stroke="url(#tempLineGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {
                    points.map((point, index) => (

                      <g key={index}>

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="5"
                          fill={point.color}
                        />

                        <text
                          x={point.x}
                          y={point.y - 10}
                          fill="white"
                          fontSize="11"
                          textAnchor="middle"
                          fontWeight="600"
                        >

                          {point.temp}°

                        </text>

                      </g>

                    ))
                  }

                </svg>
              </div> : <h2 className="hourforecasttext">🕒  HOURLY FORECAST</h2>
            }
            <div className="cards" key={tempData.latitude}>
              {hourlyCards}
            </div>
          </div>


        ) :
          (
            <div className="hourforecast">
              <h2 className="hourforecasttext">🕒HOURLY FORECAST</h2>
              <div className="cards1">
                {hourlyCards}
              </div>
            </div>
          )



      }



    </div>

  )
}

export default Hourlytemp