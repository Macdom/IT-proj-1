let wybor = document.getElementById("rzut");

const sym = document.getElementById("symulacje");

const span_y0 = document.getElementById("wys");
const span_v0 = document.getElementById("pred");
const span_fi = document.getElementById("kat");
const span_can = document.getElementById("can");

const slider_y0 = document.getElementById("y0");
const slider_v0 = document.getElementById("v0");
const slider_fi = document.getElementById("fi");

const canvas = document.getElementById("rzutCanv");
const ctx = canvas.getContext("2d");
ctx.save();

const g = 9.81;

// pokazuje wartość suwaka
function update(suwak, val){
	document.getElementById(suwak).value = val;
}

// funkcja zatrzymująca działanie na podaną ilość milisekund
function czekaj(czas){
	return new Promise(resolve => setTimeout(resolve, czas));
}

function draw_OX(){
	// rysuje oś odległości
	ctx.beginPath();	
	ctx.moveTo(10,300);
	ctx.lineTo(590,300);
	ctx.stroke();
	
	// rysuje strzałkę
	ctx.beginPath();
	ctx.moveTo(580,290);
	ctx.lineTo(590,300);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(580,310);
	ctx.lineTo(590,300);
	ctx.stroke();
	
	// rysuje oznaczenie
	ctx.font = "20px Arial";
	ctx.fillText("x", 595, 305);
}

function draw_OY(){
	ctx.strokeStyle = 'rgb(40,40,40)';
	ctx.fillStyle = 'rgb(40,40,40)';
	
	// rysuje oś wysokości
	ctx.beginPath();	
	ctx.moveTo(10,300);
	ctx.lineTo(10,10);
	ctx.stroke();
	
	// rysuje strzałkę
	ctx.beginPath();
	ctx.moveTo(0,20);
	ctx.lineTo(10,10);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(20,20);
	ctx.lineTo(10,10);
	ctx.stroke();
	
	// rysuje oznaczenie
	ctx.font = "20px Arial";
	ctx.fillText("y", 18, 14);
}

// ukrywa wszystkie suwaki i canvas
function ukryj(){
	span_y0.style.display = "none";
	span_v0.style.display = "none";
	span_fi.style.display = "none";
	span_can.style.display = "none";
	span_y0.style.float = "none";
	span_can.style.float = "none";
	span_v0.style.float = "none";
	span_v0.style.clear = "none";
	span_fi.style.float = "none";
}

// pokazuje dane suwaki i canvas
function pokaz(){
	wybor = document.getElementById("rzut").value;
	switch(wybor){
		case "ss":
			ukryj();
			span_y0.style.display = "inline";
			span_y0.style.clear = "both";
			span_can.style.display = "block";
			span_can.style.clear = "both";
			clear_canvas();			
			break;
		case "pid":
		case "pig":
		case "po":
			ukryj();
			span_y0.style.display = "inline";
			span_v0.style.display = "inline";
			span_y0.style.float = "left";
			span_v0.style.float = "right";
			span_can.style.display = "block";
			span_can.style.clear = "both";
			clear_canvas();			
			break;
		case "u":	
			ukryj();
			span_v0.style.display = "inline";
			span_fi.style.display = "inline";
			span_v0.style.float = "left";
			span_fi.style.float = "right";
			span_can.style.display = "block";
			span_can.style.clear = "both";
			clear_canvas();
			break;
		default:
			ukryj();
			break;
	}
}

// przygotowuje canvas
function clear_canvas(){
	//wypełnia canvas białym kwadratem
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,610,310);
	
	//rysuje osie z oznaczeniami
	draw_OY();
	draw_OX();
}

// czyści canvas i wybiera odpowiednia funkcje do rysowania trajektorii
function rysuj(w, p, k){
	clear_canvas();
	ctx.lineWidth = 2;
	
	switch(wybor){
		case "ss":
			ctx.strokeStyle = "blue";
			rysuj_ss(w);
			break;
		case "pid":
			ctx.strokeStyle = "blue";
			rysuj_pid(w, p);
			break;
		case "pig":
			ctx.strokeStyle = "green";
			rysuj_pig(w, p);
			break;
		case "po":
			ctx.strokeStyle = "blue";		
			rysuj_po(w, p);
			break;
		case "u":
			ctx.strokeStyle = "green";
			rysuj_u(p, k);
			break;
		default:
			console.log("Błąd!");
			break;
	}
}

// rysuje trajektorię w spadku swobodnym
async function rysuj_ss(w){
	let y = 310 - w;
	
	for (let t = 0; t <= 10; t++){
		ctx.beginPath();
		ctx.moveTo(300, y);
		y = 310 - (w - ((g * t*t) / 2));
		ctx.lineTo(300, y);
		ctx.stroke();
		await czekaj(65);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(0, 301, 569, 310);
}

// rysuje trajektorię w rzucie w dół
async function rysuj_pid(w, p){
	let y = 310 - w;
	
	for (let t = 0; t <= 10; t++){
		ctx.beginPath();
		ctx.moveTo(300, y);
		y = 310 - (w - ((g * t*t) / 2));
		ctx.lineTo(300, y);
		ctx.stroke();
		await czekaj(65);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(0, 301, 569, 310);
}

// rysuje trajektorię w rzucie w górę
async function rysuj_pig(w, p){
	alert("Ta symulacja nie działa prawidłowo. Argument y0 wewnątrz funkcji wzrasta dziesięciokrotnie. \n"
	+"Takiego błędu nigdy wcześniej nie widziałem i nie potrafię go naprawić.");
	let y = 310.0 - w;
	let ynew;
	for (let t = 0; t <= 10; t++){
		ctx.beginPath();
		ctx.moveTo(300, y);
		ynew = 310 - (w + (p*t - (g * t*t) / 2));
		ctx.lineTo(300, ynew);
		if(ynew > y){
		ctx.strokeStyle = "blue";
		}
		y = ynew;
		ctx.stroke();
		await czekaj(65);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(0, 301, 569, 310);
}

// rysuje trajektorię w rzucie poziomym
async function rysuj_po(w, p){
		let y = 300 - w;
		for (let t = 0; t <= 5.9; t += 0.01){
			ctx.beginPath();
			ctx.moveTo((t*p*5+10),y);
			y = 300 - (w - (g * t*t) / 2);
			ctx.lineTo((t*p*5+11),y);
			ctx.stroke();
			await czekaj(4);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(0, 301, 569, 310);
}

// rysuje trajektorię w rzucie ukośnym
async function rysuj_u(p, k){
	k *= 2;
		let y = 300;
		let ynew;
		for (let t = 0; t <= 5.9; t += 0.01){
			ctx.beginPath();
			ctx.moveTo((t*p*5+10),y);
			ynew = 300 - 5*(p*t*Math.sin(Math.PI * k/180) - (g * t*t) / 2);
			ctx.lineTo((t*p*5+11),ynew);
			if(ynew > y){
				ctx.strokeStyle = "blue";
			}
			y = ynew;
			ctx.stroke();
			await czekaj(4);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(0, 301, 569, 310);
}
