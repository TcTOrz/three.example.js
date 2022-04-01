/*
 * @Author: Li Jian
 * @Date: 2022-03-30 15:26:05
 * @LastEditTime: 2022-03-30 16:10:44
 * @LastEditors: Li Jian
 */
import { timer, combineLatest } from 'rxjs'

const timerOne = timer(1000, 4000)
const timerTwo = timer(2000, 4000)
const timerThree = timer(3000, 4000)

const combined = combineLatest(timerOne, timerTwo, timerThree, (one, two, three) => {
  return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`
})

const subscribe = combined.subscribe(latestValues => {
  console.log(latestValues)
})
