# Inspection Checklist for t25

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Structure faults
* Does the code completely implement the design?
* Is there any excess functionality in the code not specified by the design?
* Do all code constructs follow the ReactStrap standard?
* Are there any segments of repeated code that can be condensed?
* Are any components excessively complex?

### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named meaningfully and put in the constants.js file?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* If there are multiple exits for a loop, are they necessary and correct?
* Can array indexes ever go out-of-bounds?
* Are all objects (including Strings) compared with "equals" and not "=="? (Java)
* Are compound statements correctly bracketed?
* Can any deeply nested if statements be reorganized?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are variables declared in the proper scope?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Output faults
* Is all text displayed to the user free of gramatical erros?

### Exception faults
* Have all possible error conditions been considered?
* Is the appropriate action taken for each error condition?
