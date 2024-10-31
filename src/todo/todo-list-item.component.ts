import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import gsap from 'gsap';
// import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'todo-list-item',
  standalone: true,
  template: `<li
    #animateWithGSAP
    (click)="toggle()"
    class="text-xl {{
      checked ? 'bg-[#2b2b2b] shadow-md' : 'bg-[#1b1b1b] !cursor-pointer'
    }} p-2 rounded-lg line-clamp-1 leading-loose flex items-center gap-4 opacity-0 relative"
    style="transform: translateX(-{{ id * 100 }}px);"
  >
    <input
      [id]="id"
      [checked]="checked"
      (change)="toggle()"
      type="checkbox"
      class="size-4 rounded-md checked:bg-lime-700 hover:bg-lime-900 :bg-red-600
       text-lime-500 border-none focus:ring-lime-900"
    />
    <label
      [for]="id"
      [innerHTML]="title"
      class="{{
        checked ? 'line-through text-gray-600' : 'text-lime-100'
      }} transition-all select-none"
    ></label>
    @if(isHovered) {
    <span id="hover" class="absolute bg-red-400 inset-0"></span>
    }
    <!-- <span>{{sum}}</span> -->
    <!-- <span #ref class="opacity-0">it is true</span> -->
  </li>`,
})
export class TodoListItem {
  @Input() id!: number;
  @Input() checked!: boolean;
  @Input() title!: string;
  ref: string = '';
  isHovered = false;
  // private calculatorService = inject(CalculatorService);
  // sum = this.calculatorService.add(20, 50)

  @ViewChild('animateWithGSAP', { static: false }) animateWithGSAP!: ElementRef;
  // animate(value: any) {
  //   console.log(value)
  //   gsap.to(value, {
  //     opacity: 1,
  //     x: 200,
  //   });
  // }

  toggle() {
    this.checked = !this.checked;
  }

  ngAfterViewInit() {
    gsap.to(this.animateWithGSAP.nativeElement, {
      opacity: 1,
      duration: 1,
      ease: 'back.out',
      x: 0,
    });
  }
}
