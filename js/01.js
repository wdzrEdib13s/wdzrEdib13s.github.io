let baseDeDatos = [
	{
		id: 1,
		nombre: 'GUMMIES (Fresa-Mango con chile)',
		texto: 'Una explosión para tu paladar. En su presentación Fresa-Mango, bañadas en chile chamoy que han encantado a tantos.	Con una base de RSO obtenido por la reducción concentrada de nuestra tintura, te harán tener una experiencia tan reconfortante cómo su sabor. (conservar en refrigeración)',
		precio: 600, 
		gr:'9pz',
		imagen: 'images/gummies.png',
		mg: '250mgTHC (27.7each)'
	},
	{
		id: 2,
		nombre: 'BITES (Chocolate)',
		texto: 'Preparandos a base de nuestra base casera de Ghee (mantequilla clarificada) inficionado con nuestra selección de flores. Una deliciosa mezcla de cereal y malvavisco que logra la consistencia perfecta que te enamora con casa mordida.(Mantener en un lugar seco y fresco, para mayor conservación mantener en refrigeración)',
		precio: 420,
		descuento: '$480',
		gr:'Bolsa de 70 g',
		imagen: 'images/bitechocolate.png',
			// Oferta:'SALE'
		mg: '150 mgTHC'
	
	},
	{
		id: 3,
		nombre: 'TINCTURE',
		texto: 'Es el resultado de la maceración de nuestra selección de flores, adecuadamente descarboxiladas para la activación de los cannabinoides. Perfecta para colocarla en tu bebida preferida. Ayuda en la reducción de síntomas como la ansiedad, en insomnio y otras afecciones sin efectos psicoactivos utilizándola en microdosis. (Conservar bien cerrada en un lugar fresco y seco)',
		precio: 800,
		gr:'30ml-600drops',
		imagen: 'images/Tincture.png',
		mg: '550mgTHC/32mgCBD '
	},
	{
		id: 4,
		nombre: 'BITES (TuttiFrutti)',
		texto: 'Preparandos a base de nuestra base casera de Ghee (mantequilla clarificada) inficionado con nuestra selección de flores. Una deliciosa mezcla de cereal y malvavisco que logra la consistencia perfecta que te enamora con casa mordida.(Mantener en un lugar seco y fresco, para mayor conservación mantener en refrigeración)',
		precio: 420,
		descuento: '$480',
		gr:'6-8pz/70g ',
		imagen: 'images/bites.png',
		mg: '150 mgTHC150mgTHC(18.7-25mgTHCeach)'

	}

];

let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function renderItems() {
	for (let info of baseDeDatos) {
		// Estructura
		let miNodo = document.createElement('div');
		miNodo.classList.add('product-card','card', 'col-sm-4');
		// Body
		let miNodoCardBody = document.createElement('div');
		miNodoCardBody.classList.add('product-details');
		// Imagen
		let miNodoImagen = document.createElement('img');
		miNodoImagen.classList.add('img-fluid', 'foto');
		miNodoImagen.setAttribute('src', info['imagen']);

		// let miNodolist = document.createElement('div');
		// miNodo.classList.add('product-card', 'col-sm-4');

		// oferta
		// let miNodOferta= document.createElement('span');
		// miNodOferta.classList.add('product-promo');
		// miNodOferta.textContent =  info['Oferta'] ;

		// Titulo
		let miNodoTitle = document.createElement('h4');
		miNodoTitle.classList.add('product-details', 'titulotex');
		miNodoTitle.textContent = info['nombre'];

			// texto
		let miNodoTexto = document.createElement('p');
		miNodoTexto.classList.add('product-details', 'textoDescripcion');
		miNodoTexto.textContent = info['texto'];
			
		//especificacion
		let miNodoespecificar = document.createElement('p');
		miNodoespecificar.classList.add('product-details');
		miNodoespecificar.textContent = info['gr'] ;
		// mg
		let miNodomg = document.createElement('p');
		miNodomg.classList.add('product-details');
		miNodomg.textContent = info['mg'];
		
		// DEscuento
		let miNodoDescuento = document.createElement('s');
		miNodoDescuento.classList.add('item-price' , 'text-muted');
		miNodoDescuento.textContent = info['descuento'] ;

		// Precio
		let miNodoPrecio = document.createElement('span');
		miNodoPrecio.classList.add('product-bottom-details' , 'product-price');
		miNodoPrecio.textContent = '$' + info['precio'] ;



		// Boton
		let miNodoBoton = document.createElement('button');
		miNodoBoton.classList.add('btn', 'product-links', 'btn-primary' , 'btn-verde');
		miNodoBoton.textContent = 'Agregar a carrito';
		miNodoBoton.setAttribute('marcador', info['id']);
		miNodoBoton.addEventListener('click', anyadirCarrito);

		let miNodoBotonCarrito = document.createElement('a');
		miNodoBotonCarrito.classList.add('btn', 'product-links', 'btn-primary' , 'btn-carrito' );
		miNodoBotonCarrito.textContent = 'Ver carrito';
		
		// let input = document.getElementById('carro')
		
		miNodoBotonCarrito.addEventListener('click', () => {
			location.href ='#carro';
		})

		miNodoBoton.addEventListener('click', () => {
		swal("AGREGADO !", "Seguir agregando", "success")
		})



		// Insertamos
		miNodoCardBody.appendChild(miNodoImagen);
		// miNodoCardBody.appendChild(miNodOferta);
		miNodoCardBody.appendChild(miNodoTitle);
		miNodoCardBody.appendChild(miNodoTexto);
		miNodoCardBody.appendChild(miNodoespecificar);
		miNodoCardBody.appendChild(miNodomg);
		miNodoCardBody.appendChild(miNodoDescuento);
		miNodoCardBody.appendChild(miNodoPrecio);
		miNodoCardBody.appendChild(miNodoBoton);
		miNodoCardBody.appendChild(miNodoBotonCarrito);
		miNodo.appendChild(miNodoCardBody);
		$items.appendChild(miNodo);
	}
}

function anyadirCarrito() {
	// Anyadimos el Nodo a nuestro carrito
	carrito.push(this.getAttribute('marcador'))
	// Calculo el total
	calcularTotal();
	// Renderizamos el carrito
	renderizarCarrito();

}

function renderizarCarrito() {
	// Vaciamos todo el html
	$carrito.textContent = '';
	// Quitamos los duplicados
	let carritoSinDuplicados = [...new Set(carrito)];
	// Generamos los Nodos a partir de carrito
	carritoSinDuplicados.forEach(function (item, indice) {
		// Obtenemos el item que necesitamos de la variable base de datos
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		// Cuenta el número de veces que se repite el producto
		let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
			return itemId === item ? total += 1 : total;
		}, 0);
		// Creamos el nodo del item del carrito
		let miNodo = document.createElement('li');
		miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
		miNodo.textContent = ` Unidades = ${numeroUnidadesItem} Producto: ${miItem[0]['nombre']} / Total:  $ ${miItem[0]['precio']}`;
		// Boton de borrar
		let miBoton = document.createElement('button');
		miBoton.classList.add('btn', 'btn-danger', 'mx-5' ,'btn-eliminar');
		miBoton.textContent = 'X';
		miBoton.style.marginLeft = '1rem';
		miBoton.setAttribute('item', item);
		miBoton.addEventListener('click', borrarItemCarrito);
		// Mezclamos nodos
		miNodo.appendChild(miBoton);
		$carrito.appendChild(miNodo);
	});
}

function borrarItemCarrito() {
	// Obtenemos el producto ID que hay en el boton pulsado
	let id = this.getAttribute('item');
	// Borramos todos los productos
	carrito = carrito.filter(function (carritoId) {
		return carritoId !== id;
	});
	// volvemos a renderizar
	renderizarCarrito();
	// Calculamos de nuevo el precio
	calcularTotal();
}

function calcularTotal() {
	// Limpiamos precio anterior
	total = 0;
	// Recorremos el array del carrito
	for (let item of carrito) {
		// De cada elemento obtenemos su precio
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		total = total + miItem[0]['precio'];
	}
	// Renderizamos el precio en el HTML
	$total.textContent = total.toFixed(2);
}

function vaciarCarrito() {
	// Limpiamos los productos guardados
	carrito = [];
	// Renderizamos los cambios
	renderizarCarrito();
	calcularTotal();
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();

//enviar carrito whatsapp

function enviarWhats(){

  var formatoItems = [];
	var items = document.getElementById('carrito').querySelectorAll("li");
	for(var element of items){
		formatoItems.push(element.innerText)
	}

	var total = document.getElementById('total').innerText;
	console.log(total)
  console.log(formatoItems);

  var message = "Esta es mi orden:".concat(formatoItems.join("\n")).concat(" Total a pagar: $").concat(total);
	var formatMessage = encodeURI(message);
	console.log(message); 

	window.open("https://api.whatsapp.com/send/?phone=525519158885&text=".concat(formatMessage));

}
