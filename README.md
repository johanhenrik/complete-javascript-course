Learning the javascript programming language
===============================================================================
The documentation from the original repository is found [here](#jonas-repo)

General Javascript
===============================================================================

Self-invoking functions
-------------------------------------------------------------------------------
A self-invoking function is automatically started after the function
declaration. For example:
```
(function() {
	console.log('Test.');
}) ();
```
Executing a Javascript script containing the above code will automatically
print 'Test' to the console.

Functions used as values
-------------------------------------------------------------------------------
A javascript function can be called and the result might be stored as a
variable. An example is given below:
```
function testController() {
    return {
        testMethod: function() {
            console.log('Execute test method.');
        }
    }
};
var my_function = testController();
my_function.testMethod();
```

Function Expressions
-------------------------------------------------------------------------------
Rather than declaring and implementing a function and then storing the result
as a variable, one can directly evaluate the result from a function and store
it as a variable.
```
var testController = function() {
    return {
        test_method: function() {
            console.log('Execute test method.');
		}
	}
 };
```
Scope of a function
-------------------------------------------------------------------------------
A function might contain several nested functions, but having only a few of the
functions exposed to the public interface. An object might need several helping
methods in order to execute on method. These helping functions are private if
they are stored as variables inside the function. The following function has
one private and one public method:
```
function testController() {
	var privateMethod = (function() {
		// Inaccessible
	}

	return {
		publicMethod = (function() {
			console.log('Accessible method.');
		}
	}
}
```

Arrays
-------------------------------------------------------------------------------
Accessing data from objects and arrays is done different with javascript from
how it is done with Java and PHP. Given an object that has an array as one of
its variables:
```
var data = {
    items: [],
    totals: {
    	exp: 0,
    	inc: 0
    }
}
```
I would like to iterate over the items array and access every items in it.  
__Note:__ Iterating over items in an array is done using the for-of loop rather
than using the for-in loop. In javascript the for-in loop iterates over the
properties of an object, which is not what we normally want to do.
```
for (item of data['items']) {
    console.log(item);
}
```

Working with User Inputs
-------------------------------------------------------------------------------
User pressing a button on the keyboard can be registered using the an
Event-Listener:
```
document.addEventListener('keypress', function(event) {
    // Execute code.
}
```
One can register clicks on a button using the following command if
'add__btn' is a button.
```
document.querySelector('.add__btn').addEventListener('click', function() {			
    console.log('Registered click.');
}
```

DOM Manipulation
-------------------------------------------------------------------------------
The _insertAdjacentHTML_ method is used for placing text inside a html document
relative to a _html-element_. The method has the following syntax:
```
document.querySelector(element).insertAdjacentHTML(position, text);
```
The new text can be placed before or after the element and it can also be placed
inside, either as the first child or the last child. The four different
placement options are:
  * 'beforebegin'
  * 'afterbegin'
  * 'beforeend'
  * 'afterend'

Throwing Errors
-------------------------------------------------------------------------------
When working with user inputs, one must always consider illegal input. I
comment three things when a method is throwing an error.
 1. Error name.
 2. Description of why it is neccessary to throw an error.
 3. If the error is thrown from an other function, then I defines that
    function as the root for this exception.

Logging
-------------------------------------------------------------------------------
The logging to the console should group information in chucks which are
related to each other. How this is done is descriped
[here](https://stackify.com/javascript-logging-basic-tips/).

Good practice for logging is to group the logs into sections which are
relevant for a particular action. For example, every log relevant to the
insertion of a new Budget Item is grouped:
```
console.group('Inserting Budget item.');
console.log('Parsed successfully.');
console.groupEnd();
```
Collapsed group for logging
-------------------------------------------------------------------------------
For this project I want to iterate over the items array for checking which
Budget Items are inserted. After some Budget Items are inserted, then the
entire console is filled with Budget Items. I want a Collapsed Group, which can
be opened for displaying every Budget Item. Groups can be nested and I use the
following code for logging the Budget Items:
```
console.groupCollapsed('Budget Items in Budget Controller');
for (item of data['items']) {
    console.log(item);
}
console.groupEnd(); // Remember to close group.


More information about advanced logging is found [here](https://mariusschulz.com/blog/advanced-javascript-logging-using-console-group)

```

# <a name='jonas-repo'></a>Course Material and FAQ for my Complete JavaScript Course

This repo contains starter files and the finished project files for all the projects contained in the course.

Plus, I made all the [course slides available for download](slides-students-C03.pdf), to make it easier to follow along the conceptual videos.

👇 **_Please read the following Frequently Asked Questions (FAQ) carefully before starting the course_** 👇

## FAQ

### Q1: How do I download the files?

**A:** If you're new to GitHub and just want to download the complete package, hit the green button saying "Clone or download", choose the "Download ZIP" option, and you're good to go.

### Q2: I'm stuck in one of the projects. Where do I get help?

**A:** Have you extensively tried fixing the problem on your own? If you failed at fixing it, please **post a detailled description of the problem to the Q&A area of that video over at Udemy**, along with a [codepen](https://codepen.io/pen/) containing your code. You will get help as fast as possible! Please don't send me a personal message or email to fix coding problems.

### Q3: Brackets shows me errors, but my code works. Why is that?

**A:** These are _not_ errors in your code, and you can simply ignore them (they just come from so-called linters that are not correctly set up).

### Q4: You keep mentioning your resources page. Where can I find it?

**A:** It's on my website at <http://codingheroes.io/resources>. You can subscribe for updates 😉

### Q5: What Brackets and VSCode themes are you using?

**A:** I use the theme "OS X Style | Flat & Dark" in Brackets and "Oceanic Next (dimmed bg)" in VSCode. [Here is the complete setup](editors-setup.md).

### Q6: Can I see a final version of the course projects?

**A:** Sure, I have an online version of all three. Here they are: [Pig Game](https://piggame2.netlify.com/) (DOM manipulation), [Budgety](http://budgety2.netlify.com/) (advanced JavaScript) and [Forkify](https://forkify.netlify.com/) (modern JavaScript and AJAX).

### Q7: Videos don't load, can you fix it?

**A:** Unfortunately, there is nothing I can do about it. The course is hosted on Udemy's platform, and sometimes they have small technical issues like this one. Please just come back a bit later or [contact their support team](https://support.udemy.com/hc/en-us).

### Q8: Videos are blurred / have low quality, can you fix it?

**A:** Please open video settings and change the quality from 'Auto' to another value, for example 720p. If that doesn't help, please [contact the Udemy support team](https://support.udemy.com/hc/en-us).

### Q9: Are the videos downloadable?

**A:** Yes, I made all videos downloadable on the Udemy platform so you can learn even without an internet connection. To download a video, use the settings icon in the right bottom corner of the video player.

### Q10: I love your courses and want to get updates on new courses. How?

**A:** First, you can subscribe to my email list [at my website](http://codingheroes.io/newsletter). Plus, I make important announcements on twitter [@jonasschmedtman](https://twitter.com/jonasschmedtman), so you should definitely follow me there 🔥

### Q11: How do I get my certificate of completion?

**A:** A certificate of completion is provided by Udemy after you complete 100% of the course. After completing the course, just click on the "Your progress" indicator in the top right-hand corner of the course page. If you want to change your name on the certificate, please [contact the Udemy support team](https://support.udemy.com/hc/en-us).

### Q12: Do you accept pull requests?

**A:** No, for the simple reason that I want this repository to contain the _exact_ same code that is shown in the videos. However, please feel free to add an issue if you found one.
