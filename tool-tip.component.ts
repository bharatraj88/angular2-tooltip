/**
Class given in ngClass will be appended to the tooltip widget
 Usage :   <span tooltip ngToolTipClass="any-custom-class"
                content="You can have any html or plain text content here">
            </span>
**/

import { Component,Directive, Input, DynamicComponentLoader, ElementRef, Renderer, ViewContainerRef,ComponentRef } from '@angular/core';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';
@Directive({
  selector: '[tooltip]',
  providers : [BrowserDomAdapter],
  host: {
    '(mouseover)': 'displayTooltip($event)',
    '(mouseleave)' : 'hideToolTip()'
  }
})
export class ToolTipComponent{
    @Input()
    private content: string;
    @Input()
    private ngToolTipClass: string;

    private contentCmpRef : ComponentRef<ToolTipContent>;

    constructor(private _loader:DynamicComponentLoader,
                private _viewContainerRef:ViewContainerRef,
                private _renderer: Renderer,
              private _domAdapter : BrowserDomAdapter) {
    }

    displayTooltip(event:any){
      let target = event.target;
      let self = this;
      let positionX = event.clientX;
      let positionY = event.clientY;
      this._loader.loadNextToLocation(ToolTipContent,this._viewContainerRef).
          then((compRef: ComponentRef<ToolTipContent>) =>{
                self._domAdapter.appendChild(self._domAdapter.query('body'), compRef.location.nativeElement);
                self.contentCmpRef = compRef;
                self.contentCmpRef.instance.content = self.content;
                self.contentCmpRef.instance.targetClass = self.ngToolTipClass;
                self.contentCmpRef.instance.top = positionY;
                self.contentCmpRef.instance.left = positionX;
      });
    }

    hideToolTip(){
      this.contentCmpRef.destroy();
    }
}


@Component({
  selector : 'tooltip-content',
  template : `<div class="ng-tool-tip-content"
                    [ngClass]="targetClass"
                    [ngStyle]="{'top': top+'px', 'left': left+'px'}">
              </div>`,
  styles : [`
              .ng-tool-tip-content{
                z-index : 10;
                height: auto;
                width: auto;
                border: 1px solid #EEE;
                background-color: #FFF;
                position: absolute;
                border-radius: 4px;
              }
            `]
})
export class ToolTipContent{

  constructor(private _elementRef:ElementRef){

  }
  private _content: string;
  private _top: number;
  private _left: number;
  private _targetClass : string;

  set targetClass(targetClass:string){
    this._targetClass = targetClass;
  }

  get targetClass(){
    return this._targetClass;
  }

  set content(content:string){
    this._content = content;
    this._elementRef.nativeElement.querySelector('div.ng-tool-tip-content').innerHTML = content;
  }

  get content(){
    return this._content;
  }

  set top(top:number){
    this._top = top;
  }

  get top(){
    return this._top;
  }

  set left(left:number){
    this._left = left;
  }

  get left(){
    return this._left;
  }

}
