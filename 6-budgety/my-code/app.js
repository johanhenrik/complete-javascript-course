/*
 * My implementation of the budgety app.
 *
 * The naming conventions that I am using is inspired by the following
 * disucussion:
 * https://softwareengineering.stackexchange.com/questions/149303/naming-classes-methods-functions-and-variables
 *
 * Most of the design is just me copying from the original repository, these
 * ideas are by no means owned by me. I am just learning the javascript
 * programming language.
 *
 * Sequence of implementaion:
 *  1) Defining a module pattern
 *  2) Setting up the first Event Listener
 *  3) Getting the User Input
 *  4) Adding the Budget Item to the Budget Controller
 *
 *
 * Designing a module pattern
 * -------------------------------------------------------------------------
 * The first design choise for this app is to create three controllers: a
 * budget controller, an User-Interface controller and a global controller:
 *
 * var budgetController = (function () {
 * 
 * }) ();
 *
 * var UIController = (function () {
 *
 * }) ();
 * 
 * var controller = (function (budgetCtrl, UICtrl) {
 *
 * }) (budgetController, UIController);
 *
 * Setting up the firts Event Listener
 * -------------------------------------------------------------------------
 * The first event listener should be notified when a user tries to insert
 * an expense item or an income item to the budget app. There is a bottom
 * which the user clicks when he wants to insert an item. The first event
 * listener should be notified when this action occurs.
 *
 * I register that the button is clicked using an event listenet:
 * document.querySelector('.add__btn').addEventListener('click', function() {			
 * 	console.log('Registered click.');
 * }
 *
 * There are three fields which contains information about the data that the
 * user has entered and these are: 'add__type', 'add__description' and
 * 'add__value'.
 *
 * I want a function to be executed whenever a user presses enter or clicks
 * the action button. I create a method in the global controller called
 * 'ctrlAddItem'.
 *
 * Getting the User Input
 * -------------------------------------------------------------------------
 * The different html names are stored in a json object, which is used for
 * obtaining the actual data values.
 *
 * The UIController Module reads the user's input from the webpage and parses
 * the data. The UIController will throw an exception if the parsing were
 * unsuccessful. The different html names are stored in a json object in the
 * UIController. These strings are used for obtaining the actual data values
 * from the html.
 *
 * The budgetController module creates the BudgetItem objects. I use vanilla
 * javascript where functions are used for creating objects. The following
 * code shows how the BudgetItem is implemented:
 *
 * BudgetItem: function(type, description, value) {
 * 	this.type = type;
 * 	this.description = description;
 * 	this.value = value;
 *
 * The budget items must be created using the 'new' keyword:
 *	var budget_item = new BudgetItem(EXPENSE, 'Flight Ticket', 1200);
 *
 *  1. UIController collects data #getInput.
 *  2. budgetController creates the Budget Item #createBudgetItem
 *  3. budgetController inserts the Budget Item #addBudgetItem
 *
 * Adding the Budget Item to the Budget Controller
 * -------------------------------------------------------------------------
 * This budget app stores every budget item in one array, in other words,
 * income items and expense items are stored in the same array. The Budget
 * Controller stores the budget items. After the Budget Item is created from
 * the #createBudgetItem method, then the item is inserted into the Budget
 * Controller.
 *
 */

/*var testController = (function() {

	var privateTestMehtod = (function() {
		console.log('Accessible?');
	});

	return {
		testMethod: function() {
			console.log('Execute test method.');

		}
	}
}) ();
testController.testMethod();

// var test_controller = testController();
// test_controller.testMethod();
*/

/*
 * The budget app handles two different types of budget items, either income or
 * expenses.
 *
 * These constants specifies whether an item is an expense or an income.
 * Defines whether the value should be added or subtracted to the total
 * budget.
 */
const EXPENSE = 'exp';
const INCOME = 'inc';

/*
 *
 *
 * Note - This budget controller implementation provides only support for
 * integer values.
 */
var budgetController = (function() {
	console.log('Automatically start this function!');

	var data = {
		items: [],
		totals: {
			exp: 0,
			inc: 0
		}
	};

	/*
	 * The type field has either value EXPENSE or INCOME. It is recommended to use
	 * constants rather than the string values in case the string values changes.
	 *
	 */
	function BudgetItem(type, description, value) {
		this.type = type;
		this.description = description;
		this.value = value;
	}

	return {

		/*
		 *
		 * @return true if the item item was successfully added to the budget
		 * controller, returns false other wise.
		 */
		addItem: function(budgetItem) {
			data.items.push(budgetItem);
			return true;
			//return false;
////		return 
		},

		/*
		 * Creates a Budget Item from the given data values.
		 *
		 * @return {Object} A Budget Item which represents the parameter data for
		 * this function.
		 *
		 * @throws {IllegalArgumentError} if type is neither EXPENSE nor 
		 * INCOME.
		 * @throws {NumberFormatError} if the value is not a number.
		 */
		createBudgetItem: function(type, description, value) {
			if (type === EXPENSE && type === INCOME) {
				throw 'IllegalArgumentError';
			}
			var value = parseInt(value);
			if (isNaN(value)) {
				throw 'NumberFormatError';
			}
//			this.type = type;
//			this.description = description;
//			this.value = value;
			return new BudgetItem(type, description, value);
		},

		testPrintAll: function() {
			console.groupCollapsed('Budget Items in Budget Controller:');
			for (item of data['items']) {
				console.log(item);
			}
			console.groupEnd();
		}

//		createBudgetItem: function(type, description, value) {
//			this.type = type;
//			this.description = description;
//			this.value = value;
//			if (value < 0) {
//				throw 'NegativeValueError';
//			}
//			return new BudgetItem(type, description, value);
//		}
	}

}) ();

var UIController = (function() {

	/*
     *  Private variable that stores name of the html-classes.
     *
     *  Document Object Model.
     */
    var domStrings = {
            addButton: '.add__btn',
            expenseContainter: '.expenses__list',
            incomeContainer: '.income__list',
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value'
    };

	return {
		
		/*
		 * Collects the data in the user interface provided by a user.
		 *
		 * This method collects any data in the user interface and returns it.
		 * Whether the data is provided and valid is not checked by this
		 * method. Input check must be performed elsewhere.
		 *
		 * @return {Object} All data from the user interface.
		 */
		getInput: function() {
			return {
				type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
			};
			// Check whether it is an expense item or an income itom.	
			// type = document.querySelector(domStrings.inputType).value;
			// console.log('Input type is: %s', type);
			// This method checks whether the input is a valid number.
			// value = document.querySelector(domStrings.inputValue).value;
			// console.log('The strings value: %s', value);
			// number = parseFloat(document.querySelector(domStrings.inputValue).value);
			// console.log('The value as a number: %d', number);
			// return budgetController.createBudgetItem(type, '', value);
		}
	}

}) ();

var controller = (function(budgetCtrl, UICtrl) {

   /* var setupEventListener = function() {
        /*
         *  Both click on the add button and pressing enter performs the same
         *  action.
         *
         */
   /*     domStrings = UIController.getDomStrings();
        document.querySelector(domStrings.addButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            // Uncomment and key codes will appear in browser log.
            // console.log(event);
            // Use either which or keyCode, depending on browser support
            // Firefox might use which rather than keyCode.
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {
                ctrlAddItem();
            }
        });
    }
	*/

	var ctrlAddItem = function() {
		// Groups content from function while logging.
		console.group('Inserting budget item.');
		
        // 1. Get the field input data.
		input = UIController.getInput();
		console.log('UserInput [type=%s, description=%s, value=%d]',input.type,
				input.description, input.value);

		// 2. Create a Budget Item from the user's input date.
		// If parsing fails, then the execution of this function call is cancelled.
//		var budgetItem;
		try {
			budgetItem = budgetController.createBudgetItem(input.type, input.description,
					input.value);
		} catch (err) {
			console.info('Could not parse input as budget item (%s).', err);
			console.groupEnd();
			return;
		}
		console.log('BudgetItem [type=%s, description=%s, value=%d]', 
				budgetItem.type, budgetItem.description, budgetItem.value);

		// 3. Add the item to the Budget Controller
		var successfullyAdded = budgetController.addItem(budgetItem);
		if (!successfullyAdded) {
			console.warn('BudgetItem was not added to the Budget Controller.');
			console.groupEnd();
			return;
		}
		// This line just test whether the Budget Items successfully are added
		// to the Budget Controller.
		budgetController.testPrintAll();

		console.groupEnd();
	};

	
	
	document.querySelector('.add__btn').addEventListener('click', function() {
		ctrlAddItem();
	});

	document.addEventListener('keypress', function(event) {
		console.log('Registered a keypess. - %s', event);
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) {
			ctrlAddItem();
		}
	});
	
	
}) (budgetController, UIController);


