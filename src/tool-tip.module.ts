import { HoveredContent } from './content/content';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolTipComponent } from './tooltip';

@NgModule({
    imports: [BrowserModule],
    declarations: [ToolTipComponent,HoveredContent],
    exports: [ToolTipComponent],
    entryComponents: [HoveredContent]
})
export class ToolTipModule { }