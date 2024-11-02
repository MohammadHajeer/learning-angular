import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
// import { CalculatorService } from '../services/calculator.service';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'todo-list-item',
  standalone: true,
  imports: [TitleCasePipe],
  template: `<li
    id="item-{{ id }}"
    (mouseenter)="toggleDeleteButton('in')"
    (mouseleave)="toggleDeleteButton('out')"
    #animateWithGSAP
    (click)="toggle()"
    class="text-xl {{
      checked ? 'bg-[#2b2b2b] shadow-md' : 'bg-[#1b1b1b] !cursor-pointer'
    }} rounded-lg line-clamp-1 leading-loose flex flex-col opacity-0 relative"
    style="transform: translateX(-{{ id * 100 }}px);"
  >
    <div class="flex items-center gap-4 p-2">
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
        class="{{
          checked ? 'line-through text-gray-600' : 'text-lime-100'
        }} transition-all select-none leading-relaxed mt-0 tracking-wider text-lg line-clamp-1"
      >
        {{ title | titlecase }}
      </label>
    </div>
    <!-- <span class="text-xs text-gray-600 p-1 pt-0">10/123/200</span> -->

    <button
      (click)="handleDeleteItem($event)"
      #deleteButton
      class="absolute right-0 top-1/2 h-full px-5 -translate-y-1/2 translate-x-full bg-[#252525]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#bef264"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  </li>`,
})
export class TodoListItem {
  @Input() id!: number;
  @Input() checked!: boolean;
  @Input() title!: string;
  ref: string = '';
  @Output() delete = new EventEmitter<number>();
  @Output() check = new EventEmitter<{ id: number; check: boolean }>();
  // private calculatorService = inject(CalculatorService);
  // sum = this.calculatorService.add(20, 50)

  @ViewChild('animateWithGSAP', { static: false }) animateWithGSAP!: ElementRef;
  @ViewChild('deleteButton', { static: false }) deleteButton!: ElementRef;

  toggleDeleteButton(status: 'in' | 'out') {
    if (status === 'in') {
      gsap.to(this.deleteButton.nativeElement, {
        x: 0,
        ease: 'back.out',
      });
    } else {
      gsap.to(this.deleteButton.nativeElement, {
        x: '100%',
        ease: 'back.in',
      });
    }
  }

  handleDeleteItem(event: Event) {
    event.stopPropagation();

    this.delete.emit(this.id);
  }

  toggle() {
    if (gsap.isTweening(this.animateWithGSAP.nativeElement)) {
      return; // Exit if there's an active animation
    }

    this.checked = !this.checked;
    this.check.emit({ id: this.id, check: this.checked });
    const timeline = gsap.timeline();

    timeline
      .to(this.animateWithGSAP.nativeElement, {
        rotate: '5deg',
        duration: 0.3,
        ease: 'power1.inOut',
      })
      .to(this.animateWithGSAP.nativeElement, {
        rotate: '-5deg',
        duration: 0.3,
        ease: 'power1.inOut',
      })
      .to(this.animateWithGSAP.nativeElement, {
        rotate: '0deg',
        duration: 0.3,
        ease: 'power1.inOut',
      });
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
