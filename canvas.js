var cdiv = document.getElementById("coloursbtn");
var cdv = ['#ff5555', 'lightgreen', 'lightblue', 'white', 'yellow', 'orange', '#ff55ff', '#55ffff', '#ffff55', '#55ff55', 'red', '#5555ff'];
var pencolor = "#ffffff"

for (let i = 0; i<cdv.length; i++) {
	var cdi = cdv[i];
    var button = document.createElement("button")
    button.setAttribute("onclick", `pencolor = '${cdi}';`)
    button.style.width = '25px'
    button.style.height = '25px'
    button.style.borderRadius = '25px'
    button.style.backgroundColor = cdi
	cdiv.appendChild(button)
}

function addFavColour() {
	var colour = document.getElementById('colourpicker').value
	var button = document.createElement("button")
    button.setAttribute("onclick", `pencolor = '${colour}';`)
    button.style.width = '25px'
    button.style.height = '25px'
    button.style.borderRadius = '25px'
    button.style.backgroundColor = colour
	document.getElementById("favcoloursbtn").appendChild(button)
}

const c = document.getElementById("draw");
    // c.addEventListener("click", penTool); // fires after mouse left btn is released
    c.addEventListener("mousedown", setLastCoords); // fires before mouse left btn is released
    c.addEventListener("mousemove", freeForm);
    var cw = c.width
    var ch = c.height
    c.setAttribute("width", cw/2.125)
    c.setAttribute("height", ch/2.125)
    
    var pencolor = 'white'
    var penwidth = 5
    var pentool = 'pen'

    const ctx = c.getContext("2d");
    
    function clearCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);
    }

    function setLastCoords(e) {
        const {x, y} = c.getBoundingClientRect();
        lastX = e.clientX - x;
        lastY = e.clientY - y;
    }

    function freeForm(e) {
        if (e.buttons !== 1) return; // left button is not pushed yet
        drawOptions(e);
        setLastCoords(e);
    }
    
    function drawOptions(e) {
        if (pentool == 'pen') {penTool(e)}
    }

    function penTool(e) {
        const {x, y} = c.getBoundingClientRect();
        const newX = e.clientX - x;
        const newY = e.clientY - y;

        ctx.beginPath();
        ctx.lineWidth = penwidth;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = pencolor;
        ctx.stroke();
        ctx.closePath();

        lastX = newX;
        lastY = newY;
    }

    let lastX = 0;
    let lastY = 0;  
