import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

@Component({
    selector: 'test-app',
    template: require('./test.component.html')
})

export class TestComponent implements OnInit {

    ngOnInit(){
    }
}
