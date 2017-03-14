import { ContentOptions } from './options';

import { Component,AfterContentChecked , ElementRef } from '@angular/core';
@Component({
  template : `
            <div class="ng-tool-tip-content"
                    [ngClass]="options.cls"
                    [innerHTML] = "options.content"
                    [style.top.px]="options.y"
                    [style.left.px]="options.x">
              </div>
              `,
styles : [`
        .ng-tool-tip-content{
                z-index : 10;
                padding: 2px;
                border: 1px solid #DDD;
                color: #333;
                background-color: #FFF;
                position: absolute;   
            }
          `]           
})

export class HoveredContent implements AfterContentChecked{

    private _options : ContentOptions;

    constructor(private elRef:ElementRef){

    }

    set options(op : ContentOptions){
        this._options = op;
    }

    get options():ContentOptions{
        return this._options;
    }

  ngAfterContentChecked(){
    let toolTipWidth:number = this.elRef.nativeElement.querySelector('div.ng-tool-tip-content').offsetWidth;
    if(window.innerWidth < (toolTipWidth+this.options.x)){
      this.options.x = this.options.x - toolTipWidth;
    }
    if(this.options.offset && this.options.offset.x){
        this.options.x +=this.options.offset.x
    }
    if(this.options.offset && this.options.offset.y){
        this.options.y +=this.options.offset.y
    }
  }
}