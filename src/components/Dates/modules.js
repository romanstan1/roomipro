import React from 'react'

import {
  Clear,
  PartlyCloudyDay,
  PartlyCloudyNight,
  Wind,
  Rain,
  CloudWind,
  Fog,
  ClearNight,
  Snow,
  Hail,
  Cloudy
} from './WeatherIcons'

export const Tick = () =>
  <svg className='tick' x="0px" y="0px" viewBox="0 0 52 52">
    <g>
    	<path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406
    		l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411
    		C39.251,14.885,38.62,14.922,38.252,15.336z"/>
    </g>
  </svg>

export const WeatherIcon = ({icon}) => {
  switch (icon) {
    case 'clear-day': return <Clear/>
    case 'clear-night': return <ClearNight/>
    case 'partly-cloudy-day': return <PartlyCloudyDay/>
    case 'partly-cloudy-night': return <PartlyCloudyNight/>
    case 'cloudy': return <Cloudy/>
    case 'wind': return <CloudWind/>
    case 'rain': return <Rain/>
    case 'fog': return <Fog/>
    case 'snow': return <Snow/>
    case 'hail': return <Hail/>
    default: return null
  }
}
