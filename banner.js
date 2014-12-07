/*
Filename: banner.js
Author: Eric Van Buhler

The is the Javascript portion of a simple sliding banner.
The banner is set up as follows:

margin-left offset:
|0        |-1000    |-2000    |-3000    |-4000
___________________________________________________
| image   | image   | image   | image   | image   |
| 3       | 1       | 2       | 3       | 1       |
|_________|_________|_________|_________|_________|
          |         |
          | page    |
          | content |
          |         |

In this example, there are only 3 different images, but 5 slots in the banner are
required to create smooth transitions when going from 3->1 or 1->3.

Variable description:
STEP:      This is the number of pixels the margin should be changed to "slide" the banner.
           Since "margin-left" is used, the step is negative.
MAX_SHIFT: This is the furthest right the banner will be shifted.

The ID of the CSS object to slide is "banner_content_scroll"

*/
var banner;
var STEP = -1000;
var MAX_SHIFT = -4000;
var shift = STEP;
var edge_trans_event;
var timed_event;


function banner_next() {
  // Reset timed event
  window.clearInterval(timed_event);
  timed_event = window.setInterval(function() {banner_next()}, 8000);
  
  if (shift == (MAX_SHIFT - STEP)) {
    // 3->1 transition
    banner.style.transition = "margin-left 0s";
    shift = 0;
    banner.style.marginLeft = shift.toString() + "px";
    edge_trans_event = window.setInterval(function() {banner_next()}, 1);
    // return false to prevent link from executing
    return false;
  }
  
  window.clearInterval(edge_trans_event);
  banner.style.transition = "margin-left 1s";
  shift += STEP;
  banner.style.marginLeft = shift.toString() + "px";

  // return false to prevent link from executing
  return false;
}

function banner_prev() {
  // Reset timed event
  window.clearInterval(timed_event);
  timed_event = window.setInterval(function() {banner_next()}, 8000);
  
  if (shift == STEP) {
    // 1->3 transition
    banner.style.transition = "margin-left 0s";
    shift = MAX_SHIFT;
    banner.style.marginLeft = shift.toString() + "px";
    edge_trans_event = window.setInterval(function() {banner_prev()}, 1);
    // return false to prevent link from executing
    return false;
  }
  
  window.clearInterval(edge_trans_event);
  banner.style.transition = "margin-left 1s";
  shift -= STEP;
  banner.style.marginLeft = shift.toString() + "px";

  // return false to prevent link from executing
  return false;
}

// To do upon page loading
window.onload = function() {
  banner = document.getElementById("banner_content_scroll");
  
  timed_event = window.setInterval(function() {banner_next()}, 8000);
}
