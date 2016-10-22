/**
Class given in ngClass will be appended to the tooltip widget
 Usage :   <span tooltip ngToolTipClass="any-custom-class"
                content="You can have any html or plain text content here">
            </span>
**/

import { Component,Directive,Inject, ComponentFactoryResolver, Input, ElementRef, Renderer, ViewContainerRef,ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[tooltip]',
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

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _viewContainerRef:ViewContainerRef,
                private _renderer: Renderer,
                @Inject(DOCUMENT) private _document:any) {
    }

    displayTooltip(event:any){
      let self = this;
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(ToolTipContent);
      self.contentCmpRef = this._viewContainerRef.createComponent(componentFactory);
       self._document.querySelector('body').appendChild(self.contentCmpRef.location.nativeElement);
       self.contentCmpRef.instance.content = self.content;
          self.contentCmpRef.instance.targetClass = self.ngToolTipClass;
          self.contentCmpRef.instance.mousePosition.top = event.clientY;
          self.contentCmpRef.instance.mousePosition.left = event.clientX;
    }

    hideToolTip(){
      this.contentCmpRef.destroy();
    }
}


@Component({
  template : `<div class="ng-tool-tip-content"
                    [ngClass]="targetClass"
                    [innerHTML] = "content"
                    [style.top.px]="top"
                    [style.left.px]="left">
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

  ngAfterContentChecked(){
    this.top = this.mousePosition.top;
    let toolTipWidth:number = this._elementRef.nativeElement.querySelector('div.ng-tool-tip-content').offsetWidth;
    if(window.innerWidth < (toolTipWidth+this.mousePosition.left)){
      this.left = this.mousePosition.left - toolTipWidth;
    }
    else{
      this.left = this.mousePosition.left;
    }
  }
  private _content: string;
  private top: number;
  private left: number;
  private _targetClass : string;
  public mousePosition : any = {
    top : 0,
    left : 0
  };

  set targetClass(targetClass:string){
    this._targetClass = targetClass;
  }

  get targetClass(){
    return this._targetClass;
  }

  set content(content:string){
    this._content = content;
  }

  get content(){
    return this._content;
  }

}
