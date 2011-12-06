/* This is a variable that we capture when making a node active so that
   we can easily restore it's settings. 
*/
var currentStyle;


/* This is called with and without a color argument to highlight and reset
   the edges associated with a given node.  
   The evt is provided so that we can color the node itself, along with its edges.
   If color is undefined, we are restoring the orginal display.
*/
function highlightEdges(evt, row, color)
{
  var labels = edgeTable[row];
  var reset = false;

      /* If no color was specified, we are resetting the original values. */
  if(typeof color == 'undefined') {
    color = "black";
    reset = true;
  } else {
    currentStyle = evt.target.getAttribute('style');
  }
   add = "; fill: none";

    /* Loop over the edges associated with this */
  var el;
  for(var i = 0; i < labels.length; i++) {
      el = document.getElementById(labels[i]);
      if(el) {
          setEdgeStyle(el, "stroke: " + color + add);
      } else
        tmp = tmp + " " + labels[i] + " " + typeof el;
  }
 
   /* Decide whether to hide the other nodes. */
  labels = edgeDiff[row];
  var visible = "hidden";
  var stroke = "lightgray";
  if(reset) {
     visible = "visible";
     stroke = "black";
  }

    /* hide the other edges */
  for(var i = 0 ; i < labels.length; i++) {
    el = document.getElementById(labels[i]);
    if(false) {
       el.setAttribute('visibility', visible);
    } else {
	setEdgeStyle(el, 'stroke: ' + stroke + add);
    }
  }

   /* Restore or set the style for the target node. */

  if(reset) {
      evt.target.setAttribute('style', currentStyle);
  } else {
      evt.target.setAttribute('style', 'fill: ' + color);
  }
  /* window.status = "Done with row " + row + " " + labels.length; */
}

function setEdgeStyle(el, val)
{
	if(el.nodeName == "g"){
	    var kid = el.firstChild;
	    while(kid) {
		if(kid.nodeName == "path")
		    kid.setAttribute('style', val); 
		kid = kid.nextSibling;
            }
        } else
           el.setAttribute('style', val); 
}
