import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from './Common';
import { P, A } from './Typography';

export default ({ events }) => {

  function produceOptimalSchedule(events) {
    const res = []
    let unusedEvents = events;
    while (unusedEvents.length > 0) {
      let latestTime = new Date(0) // epoch time lmao
      let usedIndices = []
      const sched = unusedEvents.reduce((accumulator, event, i) => {
        const curTime = new Date(event.startTime)
        if (curTime.getTime() >= latestTime.getTime()) {
          accumulator.push(event)
          usedIndices.push(i)
          latestTime = new Date(event.endTime)
        }
        return accumulator;
      }, [])

      // update unused
      unusedEvents = unusedEvents.filter((value, index) => {
        return usedIndices.indexOf(index) === -1;
      })

      res.push(sched)
    }
    return res
  }

  console.log('____')
  console.log(events)
  console.log(produceOptimalSchedule(events))

  return (
    <Card>
    </Card>
  );
}