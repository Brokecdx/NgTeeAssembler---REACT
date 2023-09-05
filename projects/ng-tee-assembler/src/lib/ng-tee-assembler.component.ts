import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Tee } from '../Tee';
import { isDigit } from '../Color';

@Component({
  selector: 'render-tee',
  templateUrl: './ng-tee-assembler.component.html',
  styleUrls: ['./ng-tee-assembler.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgTeeAssemblerComponent implements OnInit{

  constructor(private elRef:ElementRef) {}

  ngOnInit() {
    const el = this.elRef.nativeElement.querySelector('.tee');
    const skinimage = el.parentElement?.getAttribute("data-skinimage");
    if(skinimage) {

      const lookmouse = el.parentElement?.getAttribute("data-lookmouse");      
      const look = el.parentElement?.getAttribute("data-look");      

      const myTee = new Tee(skinimage, el as HTMLElement);
      let size: string | undefined = (el as HTMLElement).parentElement?.getAttribute("data-size")?.replace("px", "");
      if(!size) {
        size = "92";
      }

      (el as HTMLElement).style.fontSize = (parseInt(size)/100).toString() + "px";
      (el as HTMLElement).style.height = size + "px";
      (el as HTMLElement).style.width = size + "px";
    
      if(lookmouse && lookmouse == "true") {
        myTee.lookAtCursor();
      }else if(look && isDigit(look)){
        myTee.lookAt(parseInt(look));
      }else{
        myTee.lookAt(0);
      }
    }
      
  }

}
