import { HoveredContent } from './content/content';
import { Component,Directive,Inject, ComponentFactoryResolver, OnInit,
          AfterContentChecked,Input,Output, ElementRef, Renderer, 
          ViewContainerRef,ComponentRef, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseover)': 'showTooltip($event)',
    '(mouseleave)' : 'hideTooltip()'
  }
})
export class ToolTipComponent{
    @Output() beforeShow : EventEmitter<ToolTipComponent> = new EventEmitter<ToolTipComponent>();
    @Output() show : EventEmitter<ToolTipComponent> = new EventEmitter<ToolTipComponent>();
    @Output() beforeHide : EventEmitter<ToolTipComponent> = new EventEmitter<ToolTipComponent>();
    @Output() hide : EventEmitter<ToolTipComponent> = new EventEmitter<ToolTipComponent>();
    @Input()  public content: string;
    @Input()  public ngToolTipClass: string;

    private contentCmpRef : ComponentRef<HoveredContent>;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _viewContainerRef:ViewContainerRef,
                private _renderer: Renderer,
                @Inject(DOCUMENT) private _document:any) {
    }

    private showTooltip(event:any){
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(HoveredContent);
      this.contentCmpRef = this._viewContainerRef.createComponent(componentFactory);
      this.beforeShow.emit(this);
      this._document.querySelector('body').appendChild(this.contentCmpRef.location.nativeElement);
      this.contentCmpRef.instance.options = {
        content : this.content,
        cls : this.ngToolTipClass,
        x : event.clientX,
        y: event.clientY
      };
      this.show.emit(this);
    }

    private hideTooltip(){
      this.beforeHide.emit(this);
      this.contentCmpRef.destroy();
      this.hide.emit(this);
    }
}
