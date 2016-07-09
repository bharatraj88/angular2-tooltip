# angular2-tooltip
Customizable npm packaged Angular2 tooltip component

#Requirements
NodeJs

Angular2 (beta versions)

**Note**: *Current version of this component is not yet compatible with Angular2 rc Releases.*

#Usage
*Installing*:

npm install angular2-tooltip --save

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

#Test Component

To test or check the working of this component, clone from git repository.

> git clone https://github.com/bharatraj88/angular2-tooltip

> npm install

> npm test

This will start webpack server in 3000 port. Navigate to http://localhost:3000/ to view and check the component.

#Change Log

Click [Here](https://github.com/bharatraj88/angular2-tooltip/blob/master/CHANGELOG.md) to view the change log of npm releases


#Help Or Need any Enhancements?

Submit a issue in [github](https://github.com/bharatraj88/angular2-tooltip/issues/new) with details of your problems. You can also use [Plunker](https://plnkr.co/). Donot forget to mention the **AngularJS2 version** which you are using.






 
