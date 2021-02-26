import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as Color from 'color';

@Directive({
	selector: '[appColor]'
})
export class ColorDirective implements OnInit {
	@Input() appColor: string | Color = '';
	@Input() isBackground = false;

	/**
	 * Give a color or background color to an element
	 */
	constructor(private el: ElementRef<HTMLDivElement | HTMLSpanElement>) {

	}

	ngOnInit(): void {
		this.el.nativeElement.style[this.isBackground ? 'backgroundColor' : 'color'] = String(this.appColor);
	}

}
