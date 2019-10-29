
import { Component, ViewChild } from '@angular/core';
import { ANIMALES } from '../../../data/data.animales';
import { Animal } from '../../../interfaces/animal.interface';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	//@ViewChild('mylist') slidingList: List;
	animals: Animal[] = [];
	audio = new Audio();
	audioTempo: any;

	constructor() {
		this.animals = ANIMALES.slice(0);
	}

	reproduce(animal: Animal) {

		this.pausar_audio(animal);

		if (animal.reproduciendo) {
			animal.reproduciendo = false;
			return;
		}
		this.audio.src = animal.audio;

		this.audio.load();
		this.audio.play();

		animal.reproduciendo = true;

		this.audioTempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);

	}

	private pausar_audio(animalSel: Animal) {
		clearTimeout(this.audioTempo);
		this.audio.pause();
		this.audio.currentTime= 0;

		for (const animal of this.animals) {

			if (animal.nombre != animalSel.nombre) {
				animal.reproduciendo=false;
			}
		}
	}

	borrar_animal(idx:number) {
		this.animals.splice(idx,1);
		//this.slidingList.closeSlidingItems();
	}

	recargar_animales(event) {
		setTimeout(()=> {
			this.animals = ANIMALES.slice(0);

			event.target.complete();
		},1500);
		
	}
}
