import { HoveredContent } from './content/content';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTipComponent } from './tooltip';

@NgModule({
    imports: [CommonModule],
    declarations: [ToolTipComponent,HoveredContent],
    exports: [ToolTipComponent],
    entryComponents: [HoveredContent]
})
export class ToolTipModule { }
