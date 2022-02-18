import { MaxPriorityQueue } from "@datastructures-js/priority-queue";
import { Stack } from "@datastructures-js/stack";

/**
 * Ref: https://www.hackerearth.com/practice/data-structures/queues/basics-of-queues/practice-problems/algorithm/disk-tower-b7cc7a50/
 *
 * Task description:
 * Your task is to construct a tower in days by following these conditions:
 *  - Every day you are provided with one disk of distinct size.
 *  - The disk with larger sizes should be placed at the bottom of the tower.
 *  - The disk with smaller sizes should be placed at the top of the tower.
 *
 * The order in which tower must be constructed is as follows:
 *  - You cannot put a new disk on the top of the tower until all the larger disks that are given to you get placed.
 * Restriction: Disk size will never be bigger than the size of the array
 * @param {Array} disks_provided - Arrays with the disks provided each day - ex. [4,5,1,2,3]
 * @returns {Array}  - Array of arrays with the disks placed each day - ex. [[], [5,4], [], [], [3,2,1]]
 */

const disk_tower = (disks_provided) => {
  let tower = [];
  let queue = new MaxPriorityQueue();
  let size = disks_provided.length + 1;
  for (let i = 0; i < disks_provided.length; i++) {
    size--;
    
    if(disks_provided[i] >= size){
      if (queue.isEmpty === false){
        if(queue.toArray()[0] > size){
          for (let j = 0; j < queue.toArray().length; j++) {
            if(queue.toArray()[j] > disks_provided[i]){
              tower.push(queue.toArray()[j])
            }
          }
          tower.push(disks_provided[i])
        } else if (queue.toArray()[0] === size){
          tower.push(disks_provided[i], queue.toArray()[0]);
          queue.dequeue()
        }
      } else {
        tower.push([disks_provided[i]]);
      }
    } else if (disks_provided[i] < size) {
      tower.push([]);
      queue.enqueue(disks_provided[i]);
    }
  }
  console.log(tower);
  console.log(queue.toArray());
};

disk_tower([4, 5, 1, 2, 3]);

// disk_tower([4,5,1,2,3]).forEach((disks, day) => console.log('Day',day + 1,'=>',JSON.stringify(disks)));