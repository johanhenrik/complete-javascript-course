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
 *  5) Adding the Budget Item to the Graphical User Interface
 *  6) Clearing the input fields
 *  7) Updating the budget
 *  8) Updating the budget in the Graphical User Interface
 *  9) Setting start budget to 0.
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
 * Adding the Budget Item to the Graphical User Interface
 * -------------------------------------------------------------------------
 * UIController module handles the insertion of Budget Items to the user
 * interface. The method takes an Budget Item as inpur argument and then checks
 * whether the item is an expense or an income. The #insertBudgetItem method
 * goes through three essential steps:
 *
 *  1. Creates a html string which can be inserted in the webpage.
 *  2. Replaces the placeholder text.
 *  3. Inserts the html into the Document Object Model.
 *
 * Clearing the input fields
 * -------------------------------------------------------------------------
 * Clearing the input fields is easily done using a querySelector and then
 * setting the values for these fields to an empty string (''):
 *
 *   querySelector(field).value = '';
 *
 * Calculating the budget
 * -------------------------------------------------------------------------
 * Calculation of the budget is done by the budgetController using the method:
 * #calculateBudget.
 * My implementation has not seperated the income and the expenses into 
 * different arrays and thus, the method must iterate over all the Budget Items
 * every time a new income or a new expenses item is added into the UI.
 *
 * There is one problem calculating the percentage of income used. If no
 * income is inserted and an outcome is inserted, then the program tries do
 * divide the expenses with zero. The desired result is to return 100%.  
 *
 * Updating the budget in the graphical user interface
 * -------------------------------------------------------------------------
 * I create a method for the User Interface Controller called #updateBudget
 * which is used for updating the data values for the budget in the user
 * interface. 
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
			inc: 0,
			percentage: 0
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

		calculateBudget: function() {
			var income=0, expenses=0 , budget=0;
			console.groupCollapsed('Calculating currnet budget.');
			console.log('First iterate over every budget item.');
			for (item of data['items']) {
				console.log('Item [type=' + item.type + ',description=' + item.description
						+ ',value=' + item.value + ']');
				console.log(item);
				if (item.type === INCOME) {
					console.log('Income [description=' + item.description + ',value'
							+ item.value + ']');
					income += item.value;
					console.log('Total income=' + income);
				} else {
					console.log('Expense [description=' + item.description + ',value'
							+ item.value + ']');
					expenses += item.value;
					console.log('Total expenses=' + expenses);
				}
			}
			data.totals.income = income;
			data.totals.expenses = expenses;
			console.log('Budget is=' + (income - expenses).valueOf())
			if (income === 0) {
				data.totals.percentage = 100;
			} else {
				data.totals.percentage = parseInt(expenses / income	* 100);
			}
			console.log('Percentage=' + data.totals.percentage);
			console.groupEnd();
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

		getBudget: function() {
			console.groupCollapsed('Returning budget:');
			console.log('budget=' + ( data.totals.inc - data.totals.exp).toString());
			console.log('expenses=' + data.totals.exp.toString());
			console.log('income=' + data.totals.inc.toString());
			console.log('expenses=' + data.totals.percentage.toString());
			console.groupEnd();
			return {
				budget: data.totals.inc - data.totals.exp,
				expenses: data.totals.exp,
				income: data.totals.inc,
				percentage: data.totals.percentage
			}
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
            expensesContainer: '.expenses__list',
            incomeContainer: '.income__list',
            inputType: '.add__type',
            inputDescription: '.add__description',
            inputValue: '.add__value',
			percentageSpent: '.budget__expenses--percentage',
			totalBudget: '.budget__value',
			totalIncome: '.budget__income--value',
			totalExpenses: '.budget__expenses--value'
    };

	return {
	
		/*
		 * Values for 'inputDescription' and 'inputValue' is removed from the
		 * user interface.
		 */
		clearInputFields: function() {
			console.groupCollapsed('Removing data from the input fields.');
			// Input fields to reset:
			fields = [domStrings.inputDescription, domStrings.inputValue];
			for (field of fields) {
				console.log('Reseting data value of dom element with class=%s', field);
				document.querySelector(field).value = '';
			}
			console.groupEnd();
		},
	
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
		},

		insertBudgetItem: function(budgetItem) {
			console.groupCollapsed('Inserting a Budget Item into the html.');
			console.log('#insertBudgetItem');
			console.log('Received BudgetItem [type=%s, description=%s, value=%d]',
					budgetItem.type, budgetItem.description, budgetItem.value);

			// 1. Create html-string with placeholder text.
			// html - the string which is inserted into the html file.
			// element - the string is inserted after this element.
			var html, element;
			if (budgetItem.type === EXPENSE) {
				html    = '<div class=\'item clearfix\' id=\'expense-0\'>'
				        + '  <div class=\'item__description\'>%description%</div>'
						+ '  <div class=\'right clearfix\'>'
						+ '    <div class=\'item__value\'>- %value%</div>'
						+ '    <div class=\'item__percentage\'>0%</div>'
						+ '    <div class=\'item__delete\'>'
						+ '      <button class=\'item__delete--btn\'><i class=\'ion-ios-close-outline\'></i></button>'
						+ '    </div>'
						+ '  </div>'
						+ '</div>';
				element = domStrings.expensesContainer;
			} else {
				html    = '<div class=\'item clearfix\' id=\'income-0\'>'
						+ '  <div class=\'item__description\'>%description%</div>'
						+ '  <div class=\'right clearfix\'>'
						+ '    <div class=\'item__value\'>+ %value%</div>'
						+ '    <div class=\'item__delete\'>'
						+ '      <button class=\'item__delete--btn\'><i class=\'ion-ios-close-outline\'></i></button>'
						+ '    </div>'
						+ '  </div>'
						+ '</div>';
				element = domStrings.incomeContainer; 
			}
			console.log('html text without placeholder text=%s', html);
			console.log('Html element=%s', element);

			// 2. Replace placeholder test.
			// html = html.replace('%id%', item.id);
			html = html.replace('%description%', item.description);
			html = html.replace('%value%', item.value);
			console.log('html text=%s', html);

			// 3. Insert html-string into the Document Object Model.
			document.querySelector(element).insertAdjacentHTML('beforeend', html);

			console.groupEnd();
		},

		setBudget: function(budget) {
			console.groupCollapsed('Update budget of the GUI');
			console.log('User Interface Controller #setBudget');
			console.log(budget);
			if (budget === undefined) {
				console.log('Budget is undefined.');
				console.log('Inserting zero as values.');
			} // else {
			console.log('Selector searching for:' + domStrings.totalIncome);
			console.log('Budget value=' + budget.budget);
			if (budget.budget === 0) {
				console.log('Trying to set 0.');
				document.querySelector(domStrings.totalBudget).textContent = '0';
			} else if (budget.budget < 0) {
				console.log('Trying to set budget=' + budget.budget);
				document.querySelector(domStrings.totalBudget).textContent = '- ' + budget.budget;
			} else {
				console.log('Trying to set budget=' + budget.budget);
				document.querySelector(domStrings.totalBudget).textContent = '+ ' + budget.budget;
			}

			if (budget.income === 0) {
				document.querySelector(domStrings.totalIncome).textContent = '0';
			} else {
				document.querySelector(domStrings.totalIncome).textContent = '+ ' + budget.income;
			}
			if (budget.expenses === 0) {
				document.querySelector(domStrings.totalExpenses).textContent = '0';
			} else {
				document.querySelector(domStrings.totalExpenses).textContent = '- ' + budget.expenses;
			}
			document.querySelector(domStrings.percentageSpent).textContent = budget.percentage + '%';
			console.groupEnd();

		}

		// setBudget: setBudget(budget) {
		//	console.groupCollapsed('Update budget of the GUI');
		//	console.log('UIController #setBudget argument (budget):');
		//	console.log(budget);
		//	console.groupEnd();
		//}
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

		// 4. Insert the Budget Item to the Graphical User Interface
		UIController.insertBudgetItem(budgetItem);

		// 5. Clear the fields
		UIController.clearInputFields();

		// 6. Update budget
		updateBudget();

		console.groupEnd();
	};

	var updateBudget = function() {

		// 1. Calculate the budget
		budgetController.calculateBudget();
		// 2. Return the budget
		budget = budgetController.getBudget();
		// 3. Display the budget on the UI
		UICtrl.setBudget(budget);	
	};

	/*
	 * Inintializing the controller module. Initially both the event listeners
	 * are added to the controller. There is one listener connected to the
	 * keyboard and one connected to add button. These listeners are activated
	 * when a user tries to insert a budget item into the website.
	 *
	 * After the event listeners have been started the gui is updated to 
	 * display a budget with values set to zero.
	 */
	
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

	UICtrl.setBudget(budgetController.getBudget());
	
	
}) (budgetController, UIController);


