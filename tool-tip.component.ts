/**
Class given in ngClass will be appended to the tooltip widget
 Usage :   <span tooltip ngToolTipClass="any-custom-class"
                content="You can have any html or plain text content here">
            </span>
**/

import { Component, Input, DynamicComponentLoader, ElementRef, Renderer, ComponentRef } from 'angular2/core';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
@Component({
  template : ``,
  selector: '[tooltip]',
  host: {
    '(mouseover)': 'displayTooltip($event.target)',
    '(mouseleave)' : 'hideToolTip()'
  }
})
export class ToolTipComponent{
    @Input()
    private content: string;
    @Input()
    private ngToolTipClass: string;

    private contentCmpRef : ComponentRef;

    constructor(private _loader:DynamicComponentLoader,
                private _elementRef:ElementRef,
                private _renderer: Renderer) {
    }

    displayTooltip(target){
      var self = this;
      var boundingClientRect = target.getBoundingClientRect();
      this._loader.loadNextToLocation(ToolTipContent,this._elementRef).then((compRef: ComponentRef) =>{
          // Using DOM unit Custom Render service is implemented https://github.com/angular/angular/issues/2409
          DOM.appendChild(DOM.query('body'), compRef.location.nativeElement);
          self.contentCmpRef = compRef;
          self.contentCmpRef.instance.content = self.content;
          self.contentCmpRef.instance.targetClass = self.ngToolTipClass;
          self.contentCmpRef.instance.top = boundingClientRect.bottom;
          self.contentCmpRef.instance.left = boundingClientRect.left;
      });
    }

    hideToolTip(){
      this.contentCmpRef.dispose();
    }
}


@Component({
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
                padding: 1em;
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
