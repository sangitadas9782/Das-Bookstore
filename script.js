"use strict";
// ---- CONSTRUCTORS ----
class Book {
	constructor (imgsrc,title,link) {
		this.imgsrc = imgsrc;
		this.title = title;
		this.link = link;

		const img = document.createElement("img");
		img.src = imgsrc;
		img.alt = title;
		img.classList.add("book-img");
		img.addEventListener("click",()=> window.open(link,"_blank") )
		const imgDiv = document.createElement("div");
		imgDiv.classList.add("book-img-container");
		imgDiv.appendChild(img);
		const span = document.createElement("span");
		span.innerHTML = title;
		span.classList.add("book-title");
		const div = document.createElement("div");
		div.classList.add("book");
		div.appendChild(imgDiv);
		div.appendChild(span);

		this.element = div;
	}
}

class Modal {
	constructor(){
		this.element = document.createElement("div");
		this.element.id = "modal";

		const div = document.createElement("div");
		const span = document.createElement("span");
		span.innerHTML = "Select language";
		const button1 = document.createElement("button");
		button1.id = "english-lan";
		button1.innerHTML = "English";
		button1.addEventListener("click",()=>buttonAction(0))
		const button2 = document.createElement("button");
		button2.id = "spanish-lan";
		button2.innerHTML = "Español";
		button2.addEventListener("click",()=>buttonAction(1))
		div.appendChild(span);
		div.appendChild(button1);
		div.appendChild(button2);
		this.element.appendChild(div);

		function buttonAction (value) {
			language = value;
			changeLanguage(language);
			localStorage.setItem("language",language);
			modal.element.style.animation = ".5s ease-in forwards eva";
			setTimeout(()=>modal.element.remove(),500);
			screen.style.overflow = "auto";
		}
	}
}

// ---- VARIABLES ----

const screen = document.getElementById("screen");
let modal;

const bookList = [];
let bookGrid = document.getElementById("books-grid");
if (bookGrid === null) bookGrid = document.getElementById("catalogue-list");
let bookPage = 0;

bookList[0] = new Book("covers/dinoI.jpg","DINOSAURS short stories and Coloring book for kids","https://www.amazon.com/dp/B0CK3VCVV6");
bookList[1] = new Book("covers/halloweenI.jpg","HALLOWEEN short stories for kids and Coloring book","https://www.amazon.com/dp/B0CJSXPYT6");
bookList[2] = new Book("covers/mandalaI.jpg","FLORAL MANDALAS Coloring book","https://www.amazon.com/dp/B0CJXDSJZG");
bookList[3] = new Book("covers/navidadI.jpg","VINTAGE CHRISTMAS Advent calendar and Coloring book","https://www.amazon.com/dp/B0CKKVLY8M");

// ---- BUTTON LISTENERS ----

const mobileMenuButton = document.getElementById("mobile-menu-button");
mobileMenuButton.addEventListener("click",()=>{
	if (document.querySelector("header").children.length == 2) {
		const mobileMenu = document.createElement("div");
		mobileMenu.id = "mobile-menu";
		function createLink(ref,spanIcon,inner) {
			const link = document.createElement("div");
			link.classList.add("mobile-menu-link");
			const l = document.createElement("a");
			l.href = ref;
			const icon = document.createElement("span");
			icon.classList.add("material-symbols-outlined");
			icon.innerHTML = spanIcon;
			l.appendChild(icon);
			l.innerHTML += inner;
			link.appendChild(l);
			return link;
		}

		mobileMenu.appendChild(createLink("index.html","cottage","Home"));
		mobileMenu.appendChild(createLink("aboutus.html","group","About Us"));
		mobileMenu.appendChild(createLink("catalogue.html","menu_book","Catalogue"));
		document.querySelector("header").appendChild(mobileMenu);
	} else {
		const mobileMenu = document.getElementById("mobile-menu");
		mobileMenu.style.animation = "1s ease forwards disappearMobileMenu";
		setTimeout(()=>mobileMenu.remove(),1000);
	}
})

const buttonBack = document.getElementById("books-back-button");
if (buttonBack !== null) {
	buttonBack.addEventListener("click",function(){
		if ((bookPage-1) > -1 && !this.classList.contains("blocked")) {
			bookPage--;
			refreshBooks();
		}
	});
}
const buttonNext = document.getElementById("books-next-button");
if (buttonNext !== null) {
	buttonNext.addEventListener("click",function(){
		if (((bookPage+1)*4) < bookList.length && !this.classList.contains("blocked")) {
			bookPage++;
			refreshBooks();
		}
	});
}

const catalogueButton = document.getElementById("catalogue-button");
if (catalogueButton !== null) {
	catalogueButton.addEventListener("click",()=> window.open("catalogue.html","_self") );
}

// ---- FUNCTIONS ----

function refreshBooks() {
	if (buttonBack !== null) {
		buttonBack.classList.add("blocked");
		buttonNext.classList.add("blocked");
	}
	const booksShowed = document.querySelectorAll(".book");
	for (let i in booksShowed) {
		if (typeof booksShowed[i] === "object") {
			booksShowed[i].style.animation = ".7s ease forwards evaUp";
			setTimeout (()=>booksShowed[i].remove(),700);
		}
	}
	setTimeout(()=>{
		for (let j = 0 ; j < 4; j++) {
			if (bookList[j+(bookPage*4)] !== undefined) {
				const value = bookList[j+(bookPage*4)].element;
				if (value !== null) {
					value.style.animation = ".7s ease forwards evaDown";
					bookGrid.appendChild(value);
					if (buttonBack !== null) {
						buttonBack.classList.remove("blocked");
						buttonNext.classList.remove("blocked");
						if (!((bookPage-1) > -1)) buttonBack.classList.add("blocked");
						if (!(((bookPage+1)*4) < bookList.length)) buttonNext.classList.add("blocked");
					}
				}
			}
		}
	},700);
}

// ---- LANGUAGE ----

let language;
if (localStorage.getItem("language") === null) {
	modal = new Modal();
	screen.appendChild(modal.element);
	screen.style.overflow = "hidden";
} else {
	language = localStorage.getItem("language");
	changeLanguage(parseInt(language));
}

const buttonLanguageChange = document.getElementById("lang-button");
buttonLanguageChange.addEventListener("click",()=>{
	localStorage.removeItem("language");
	modal = new Modal();
	screen.appendChild(modal.element);
	screen.scrollTop = 0;
	screen.style.overflow = "hidden";
});

function changeLanguage(id) {
	switch (id) {
		case 0:
			document.getElementById("nav1").innerHTML = "Home";
			document.getElementById("nav2").innerHTML = "About us";
			document.getElementById("nav3").innerHTML = "Catalogue";
			document.getElementById("lang-button").innerHTML = "Change Language";
			document.getElementById("credits").innerHTML = "Page made by Sangita Das";
			if (document.getElementById("catalogue-button") !== null) {
				document.getElementById("slogan-span").innerHTML = "The best way to spend a few beautiful hours";
				document.getElementById("books-title-span").innerHTML = "Best sellers";
				document.getElementById("catalogue-button").innerHTML = "Check our catalog";
				if (document.getElementById("images-text1") !== null) {
					document.getElementById("images-text1").innerHTML = "We want you to enjoy life...";
					document.getElementById("images-text2").innerHTML = "...without so many complications.";
				} else {
					document.getElementById("slogan-span").innerHTML = "Who are we?";
					document.getElementById("aboutus").innerHTML = "We are a family publishing company dedicated to creating medium and low content books for children and adults. Among our creations, we have coloring story books for boys and girls, as well as books designed to combat stress and anxiety in adults. Additionally, we create annual agendas to help you plan for the future. Explore and enjoy our products.";
					document.querySelector("h1").innerHTML = "About us";
				}
			} else {
				document.querySelector("h1").innerHTML = "Catalogue";
			}
			bookList[0] = new Book("covers/dinoI.jpg","DINOSAURS short stories and Coloring book for kids","https://www.amazon.com/dp/B0CK3VCVV6");
			bookList[1] = new Book("covers/halloweenI.jpg","HALLOWEEN short stories for kids and Coloring book","https://www.amazon.com/dp/B0CJSXPYT6");
			bookList[2] = new Book("covers/mandalaI.jpg","FLORAL MANDALAS Coloring book","https://www.amazon.com/dp/B0CJXDSJZG");
			bookList[3] = new Book("covers/navidadI.jpg","VINTAGE CHRISTMAS Advent calendar and Coloring book","https://www.amazon.com/dp/B0CKKVLY8M");
			break;
		case 1:
			document.getElementById("nav1").innerHTML = "Sangita's Books";
			document.getElementById("nav2").innerHTML = "Sobre nosotros";
			document.getElementById("nav3").innerHTML = "Catálogo";
			document.getElementById("lang-button").innerHTML = "Cambiar idioma";
			document.getElementById("credits").innerHTML = "Página hecha por Sangita Das";
			if (document.getElementById("catalogue-button") !== null) {
				document.getElementById("slogan-span").innerHTML = "La mejor forma de pasar unas bellas horas";
				document.getElementById("books-title-span").innerHTML = "Más vendidos";
				document.getElementById("catalogue-button").innerHTML = "Revisa nuestro catálogo";
				if (document.getElementById("images-text1") !== null) {
					document.getElementById("images-text1").innerHTML = "Queremos que disfrutes la vida...";
					document.getElementById("images-text2").innerHTML = "...sin tantas complicaciones.";
				} else {
					document.getElementById("slogan-span").innerHTML = "¿Quienes somos?";
					document.getElementById("aboutus").innerHTML = "Somos una empresa editorial familiar dedicada a la creación de libros de mediano y bajo contenido para niños y adultos. Entre nuestras creaciones tenemos: libros de cuentos para colorear para niños y niñas y libros para combatir el estrés y la ansiedad para adultos. También diseñamos agendas anuales que te ayudarán a planificar tu futuro. Conoce y disfruta de nuestros productos.";
					document.querySelector("h1").innerHTML = "Sobre nosotros";
				}
			} else {
				document.querySelector("h1").innerHTML = "Catálogo";
			}
			bookList[0] = new Book("covers/dinoE.jpg","Cuentos infantiles de DINOSAURIOS para colorear","https://www.amazon.com/dp/B0CK3QDGDQ");
			bookList[1] = new Book("covers/halloweenE.jpg","Cuentos infantiles de HALLOWEEN para colorear","https://www.amazon.com/dp/B0CK3VFXW3");
			bookList[2] = new Book("covers/mandalaE.jpg","MANDALAS DE FLORES para colorear","https://www.amazon.com/dp/B0CJSM4K68");
			bookList[3] = new Book("covers/navidadE.jpg","NAVIDAD VINTAGE Calendario de adviento para colorear","https://www.amazon.com/dp/B0CK9VS4T6");
			break;
	}
	refreshBooks();
}
refreshBooks();