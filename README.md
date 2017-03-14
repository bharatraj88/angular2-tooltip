# angular2-tooltip
Customizable npm packaged Angular2 tooltip component

#Requirements
NodeJs

Angular2 version 2.4.3


#Usage
*Installing*:

npm install angular2-tooltip --save

*Adding to a Module*:
```typescript
import {NgModule} from "@angular/core";
...
import {ToolTipModule} from 'angular2-tooltip'
 
@NgModule({
    imports: [
        ...
        ToolTipModule
    ],
    ...
})
```

*Using*:

Place attribute **tooltip** on to any html element which you want to display a tool tip for. [Similar to attribute **disabled** on to input element for disabling it].

Example||

    <span tooltip content=”You can have any html or plain text content here”> </span>


    <input tooltip content="any text here"/>

Class given in ngClass will be appended to the tooltip widget


#Options

 1. **content** (*mandatory*): string
 
	 Any HTML content or text which needs to displayed as tootip

 2. **ngToolTipClass** (*optional*) : string
 
	 Class for customizing the tool tip display. This class will be appended to the tooltip element on display.

 3. **showOnClick** (*optional*) : boolean (default : false)
      
      Set this option to true if you want to show tooltip on click. Tooltip will be hidden on move leave.

 4. **autoShowHide** (*optional*) : boolean (default : true) 

      Set this option to false if you want to manage tooltip show and hide by your self. You need to call
      showTooltip() and hideTooltip() explicitly by passing required parameters
      (Use this option with care, absolute position (x and y) has to calculated by yourselfssss)



#Events

  1.  **beforeShow** : ToolTipComponent

       This event is emitted just before the tooltip is displayed. Returns the instance of tooltip.

  2.  **show** : ToolTipComponent

       This event is emitted just after the tooltip is displayed. Returns the instance of tooltip.
    
  3.  **beforeHide** : ToolTipComponent

       This event is emitted just before the tooltip is going to hide. Returns the instance of tooltip.

  4.  **hide** : ToolTipComponent

       This event is emitted just before the tooltip is hidden. Returns the instance of tooltip.

#Test Component

To test or check the working of this component, clone from git repository.

> git clone https://github.com/bharatraj88/angular2-tooltip
 
> npm install

> typings install

> npm test

This will start webpack server in 3000 port. Navigate to http://localhost:3000/ to view and check the component.

#Change Log

Click [Here](https://github.com/bharatraj88/angular2-tooltip/blob/master/CHANGELOG.md) to view the change log of npm releases


#Help Or Need any Enhancements?

Submit a issue in [github](https://github.com/bharatraj88/angular2-tooltip/issues/new) with details of your problems. You can also use [Plunker](https://plnkr.co/). Donot forget to mention the **AngularJS2 version** which you are using.






 
