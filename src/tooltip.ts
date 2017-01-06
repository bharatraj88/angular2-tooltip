import { ContentOptions,Offset } from './content/options';
import { HoveredContent } from './content/content';
import { Component,Directive,Inject, ComponentFactoryResolver, OnInit,
          AfterContentChecked,Input,Output, ElementRef, Renderer, 
          ViewContainerRef,ComponentRef, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseover)': 'onMouseHover($event)',
    '(click)': 'onClick($event)',
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
    @Input() tooltipDisplayOffset : Offset;
    /** set it to true, which will show tooltip on click */
    @Input() showOnClick:boolean = false;
    @Input() autoShowHide:boolean = true;

    private contentCmpRef : ComponentRef<HoveredContent>;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _viewContainerRef:ViewContainerRef,
                private _renderer: Renderer,
                @Inject(DOCUMENT) private _document:any) {
    }

    private onMouseHover(event:any){
        if(!this.autoShowHide || this.showOnClick){
          return;
        }
        this.buildTooltip(event);
    }
    private onClick(event:any){
      if(!this.autoShowHide || !this.showOnClick){
          return;
        }
        this.buildTooltip(event);
    }

    public showTooltip(options:ContentOptions){
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(HoveredContent);
      this.contentCmpRef = this._viewContainerRef.createComponent(componentFactory);
      this.beforeShow.emit(this);
      this._document.querySelector('body').appendChild(this.contentCmpRef.location.nativeElement);
      this.contentCmpRef.instance.options = options;
      this.show.emit(this);
    }
    private buildTooltip(event:any){
      let options:ContentOptions = {
        content : this.content,
        cls : this.ngToolTipClass,
        x : event.clientX,
        y: event.clientY,
        offset : this.tooltipDisplayOffset
      };
      this.showTooltip(options);
    }

    public hideTooltip(){
      if(this.contentCmpRef){
        this.beforeHide.emit(this);
        this.contentCmpRef.destroy();
        this.hide.emit(this);
      }
    }
}
