// go away, o shimmy canvas
d();

// 2048
var doc = document, done = 0
  , table = doc.createElement("table")
  , side = 4
  , cells = [], cell, tmp, i, j, k
  , maxOrdinal = 12;
doc.title = 0;
tmp = doc.createElement("meta");
tmp.name = "viewport";
tmp.content = "width=device-width,user-scalable=no";
doc.head.appendChild(tmp);
for (i=0; i++<side; ) {
  k = table.insertRow(0);
  table.style.margin = "2em auto";
  for (j=0; j++<side;) {
    cells.push(cell = k.insertCell(0));
    cell.style.width = cell.style.height = "2.3em";
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

function setBackground(i, j, k) {
  i.style.background = j ? (
      k = 255 - (128*((+j).toString(2).length/maxOrdinal)) | 0
      , "rgb(" + [240, k+j*3, k] + ")"
    ) : "";
}

addRandom();addRandom(); // init board

function addRandom(possibleCells) {
  possibleCells = [];
  for (i=0; cell = cells[i++]; ) cell.innerHTML || possibleCells.push(cell);
  if (j=possibleCells.length)
    setBackground(cell = possibleCells[(Math.random()*j)|0], cell.innerHTML = Math.random()<.9 ? 2 : 4);
  else done = !alert(doc.title);
}

function move(dir, arr, next, v0, v1, mergedValue) {
  if (!done & /^[1234]/.test(dir)) {
    for (i=0; i<side; ++i) {
      for (j=0, arr=[]; j<side; ++j)
        arr[j] = cells[/[13]/.test(dir)?(/[12]/.test(dir)?(i*side+side-j-1):(i*side+j)):(/[12]/.test(dir)?((side-j-1)*side+i):(i+side*j))];
      for (k=1; k<arr.length;) {
        next = k-1;
        v1 = arr[k++].innerHTML;
        while (arr[next] && !(v0 = arr[next].innerHTML)) {
          arr[next+1].innerHTML = "";
          setBackground(arr[next+1]);
          arr[next].innerHTML = v1;
          setBackground(arr[next--], v1);
        }
        v1 && v0==v1 && (
          setBackground(arr[next], arr[next].innerHTML = mergedValue=v1*2)
          , setBackground(arr[next+1])
          , arr[next+1].innerHTML = arr[next] = ""
          , done || (done = mergedValue==2048)
          , doc.title -= -mergedValue
        );
      }
    }
    done ? alert(doc.title) : addRandom();
  }
}