import React from 'react'
import '../styling/leftpart.css'
import Temperature from './Temperature'
import Hourlytemp from './Hourlytemp'
import Weeklyreport from './Weeklyreport'
const Leftpart = () => {
  return (
    <div className="left">
        <Temperature />
        <Hourlytemp />
        <Weeklyreport />
    </div>
  )
}

export default Leftpart