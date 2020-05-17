let wybor = document.getElementById("ruch").value;

const sym = document.getElementById("symulacje");

const span_x = document.getElementById("przemieszczenie");
const span_v = document.getElementById("predkosc");
const span_a = document.getElementById("przyspieszenie");

const canv_x = document.getElementById("przemCanv");
const canv_v = document.getElementById("predCanv");
const canv_a = document.getElementById("przysCanv");

const ctx_x = canv_x.getContext("2d");
const ctx_v = canv_v.getContext("2d");
const ctx_a = canv_a.getContext("2d");
ctx_x.save();
ctx_v.save();
ctx_a.save();

// funkcja zatrzymująca działanie na podaną ilość milisekund
function czekaj(czas){
	return new Promise(resolve => setTimeout(resolve, czas));
}

// ukrywa wszystkie canvasy
function ukryj(){
	span_x.style.display = "none";
	span_v.style.display = "none";
	span_a.style.display = "none";
	span_x.style.float = "none";
	span_v.style.float = "none";
	span_v.style.clear = "none";
	span_a.style.float = "none";
	sym.style.paddingBottom = "0px";
}

// pokazuje dane canvasy
function pokaz(){
	wybor = document.getElementById("ruch").value;
	switch(wybor){
		case "sp":
			ukryj();
			span_x.style.display = "inline";
			span_x.style.clear = "both";
			clear_canvas(ctx_x);			
			break;
		case "j":
			ukryj();
			span_x.style.display = "inline";
			span_v.style.display = "inline";
			span_x.style.float = "left";
			span_v.style.float = "right";
			sym.style.paddingBottom = "330px";
			clear_canvas(ctx_x);
			clear_canvas(ctx_v);			
			break;
		case "jp":	
			ukryj();
			span_x.style.display = "inline";
			span_v.style.display = "inline";
			span_a.style.display = "inline";
			span_v.style.clear = "both";
			span_x.style.float = "left";
			span_a.style.float = "right";
			clear_canvas(ctx_x);
			clear_canvas(ctx_v);
			clear_canvas(ctx_a);
			break;
		default:
			ukryj();
			break;
	}
}

function draw_OX(context){
	// rysuje oś czasu
	context.beginPath();	
	context.moveTo(10,300);
	context.lineTo(290,300);
	context.stroke();
	
	// rysuje strzałkę
	context.beginPath();
	context.moveTo(280,290);
	context.lineTo(290,300);
	context.stroke();
	context.beginPath();
	context.moveTo(280,310);
	context.lineTo(290,300);
	context.stroke();
	
	// rysuje oznaczenie
	context.font = "20px Arial";
	context.fillText("t", 295, 305);
}

function draw_OY(context){
	context.strokeStyle = 'rgb(40,40,40)';
	context.fillStyle = 'rgb(40,40,40)';
	
	// rysuje oś przemieszczenia/prędkości/przyspieszenia
	context.beginPath();	
	context.moveTo(10,300);
	context.lineTo(10,10);
	context.stroke();
	
	// rysuje strzałkę
	context.beginPath();
	context.moveTo(0,20);
	context.lineTo(10,10);
	context.stroke();
	context.beginPath();
	context.moveTo(20,20);
	context.lineTo(10,10);
	context.stroke();
	
	// rysuje oznaczenie
	context.font = "20px Arial";
	switch(context){
		case ctx_x:
			context.fillText("x", 5, 11);
			break;
		case ctx_v:
			context.fillText("v", 5, 11);
			break;
		case ctx_a:
			context.fillText("a", 5, 11);
			break;
	}
}

// przygotowuje canvas
function clear_canvas(context){
	//wypełnia canvas białym kwadratem
	context.fillStyle = "white";
	context.fillRect(0,0,310,310);
	
	// rysuje osie z oznaczeniami
	draw_OY(context);
	draw_OX(context);
}

async function draw(context, x0, v0, a){
	// sprawdza rodzaj ruchu i odpowiednio przygotowuje wartosci
	switch(wybor){
		case "sp":
			x0 = 100;
			v0 = 0;
			a = 0;
			break;
		case "j":
			v0 = 1;
			a = 0;
			break;
	}
	
	// przygotowuje canvas
	clear_canvas(context);
	context.strokeStyle = "blue";
	context.lineWidth = 2;
	let y;
	
	// przesuwa na punkt 0
	switch(context){
		case ctx_x:
			y = 310 - x0;
			break;
		case ctx_v:
			y = 310 - v0;
			break;
		case ctx_a:
			y = 310 - a;
			break;
	}
	
	//rysuje wykres przemieszczenia
	for (let t = 10; t <= 290; t++){
		context.beginPath();
		context.moveTo(t,y);
		
		// zmienia wartość y w zależności od wybranej własności
		switch(context){
			case ctx_x:
				y = 310 - (x0 + v0 * t + a * t*t / 2);
				break;
			case ctx_v:
				y = 290 - (v0 + a * t);
				break;
		}
		
		context.lineTo(++t, y);
		context.stroke();
		await czekaj(10);
	}
}
