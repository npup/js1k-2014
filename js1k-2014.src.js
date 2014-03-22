// go away, o shimmy canvas
d();

/* 2048 */

// variables
var doc = document, table = doc.createElement("table")
  , side = 4, cells = [], done = 0
  , cell, tmp, i, j, k;

// score stored here
doc.title = 0;

/* This won't not have any effect when viewed in frames anyway so comment it out for the js1k */
// tmp = doc.createElement("meta");
// tmp.name = "viewport";
// tmp.content = "width=device-width,user-scalable=no";
// doc.head.appendChild(tmp);

// Build initial grid
for (i=0; i++<side; ) {
  k = table.insertRow(0);
  table.style.margin = "0 auto";
  for (j=0; j++<side;) {
    cells.push(cell = k.insertCell(0));
    cell.style.width = cell.style.height = "2.2em";
    cell.style.border = "solid #0d8";
    cell.style.textAlign = "center";
    cell.style.font = "bold 2em Arial";
    cell[side] = cells.length;
    cell.ontouchstart = doc.onkeyup = function (i) {
      move(i.keyCode-36);
      move({8:1, 12:1, 14:2, 15:2, 5:3, 9:3, 2:4, 3:4}[this[side]]);
    };
  }
}
b.appendChild(table);
addRandom();addRandom();

// set color of a cell (i) from its value j
function setBackground(i, j, k) {
  i.style.background = j ? (
      k = 255 - (128*((+j).toString(2).length/12)) | 0
      , "rgb(" + [240, k+j*3, k] + ")"
    ) : "";
}

// find empty cell and add a tile
function addRandom() {
  tmp = [];
  for (i=0; cell = cells[i++]; ) cell.innerHTML || tmp.push(cell);
  if (j=tmp.length)
    setBackground(cell = tmp[(Math.random()*j)|0], cell.innerHTML = Math.random()<.9 ? 2 : 4);
  else done = !alert(doc.title);
}

// loop rows/cols in the proper direction and do move/merge/etc
function move(dir, v0, v1, mergedValue) {
  if (!done & /^[1234]$/.test(dir)) {
    for (i=0; i<side; ++i) {
      for (j=0, tmp=[]; j<side; ++j)
        tmp[j] = cells[/[13]/.test(dir)?(/[12]/.test(dir)?(i*side+side-j-1):(i*side+j)):(/[12]/.test(dir)?((side-j-1)*side+i):(i+side*j))];
      for (k=1; k<tmp.length;) {
        cell = k-1;
        v1 = tmp[k++].innerHTML;
        while (tmp[cell] && !(v0 = tmp[cell].innerHTML)) {
          tmp[cell+1].innerHTML = "";
          setBackground(tmp[cell+1]);
          tmp[cell].innerHTML = v1;
          setBackground(tmp[cell--], v1);
        }
        v1 && v0==v1 && (
          setBackground(tmp[cell], tmp[cell].innerHTML = mergedValue=v1*2)
          , setBackground(tmp[cell+1])
          , tmp[cell+1].innerHTML = tmp[cell] = ""
          , done || (done = mergedValue==2048)
          , doc.title -= -mergedValue
        );
      }
    }
    done ? alert(doc.title) : addRandom();
  }
}