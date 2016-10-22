import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolTipComponent, ToolTipContent } from './tool-tip.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [ToolTipComponent,ToolTipContent],
    exports: [ToolTipComponent],
    entryComponents: [ToolTipContent]
})
export class ToolTipModule { }