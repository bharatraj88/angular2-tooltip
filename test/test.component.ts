import { Component,OnInit } from '@angular/core';
import {ToolTipComponent} from '../tool-tip.component';

@Component({
    selector: 'test-app',
    template: require('./test.component.html'),
    directives : [ToolTipComponent]
})
export class TestComponent implements OnInit {

    ngOnInit(){
    }
}
