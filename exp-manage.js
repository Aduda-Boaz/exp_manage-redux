import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD EXPENSE
// const addExpense = (expense = {}) => {
//     return {
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: uuid(),
//             description: expense.description ? expense.description : '',
//             note: expense.note ? expense.note : '',
//             amount: expense.amount ? expense.amount : 0,
//             createdAt: expense.createdAt? expense.createdAt: 0
//         }
//     }
// }

// SET_TEXT_FILTER
const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT_FILTER',
        text
    }
}

// SORT_BY_AMOUNT
const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'
    }
}

// SORT_BY_DATE
const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    }
}

// REMOVE_EXPENSE
const removeExpense = (expense = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id: expense.id
    }
}

// EDIT_EXPENSE
const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
}

// SET_START_DATE
const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        startDate
    }
}

// SET_END_DATE
const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        endDate
    }
}

// Expense Reducer
const expensesReducerDefaultState = [];
const expenseReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // return Object.assign({}, state, action.expense)
            return [
                ...state,
                action.expense
            ]                    // Spread Operator
            case 'REMOVE_EXPENSE':
                return state.filter((expense) => expense.id !== action.id);
            case 'EDIT_EXPENSE':
                return state.map((expense) => {
                    if (expense.id === action.id) {
                        return Object.assign({}, expense, action.updates)
                    } else {
                        return expense;
                    }
                })
        default:
            return state;
    }
}


// Filter Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return Object.assign({}, state, {
                text: action.text
            });
        case 'SORT_BY_AMOUNT':
            return Object.assign({}, state, {
                sortBy: 'amount'
            })
            case 'SORT_BY_DATE':
                return Object.assign({}, state, {
                    sortBy: 'date'
                })
            case 'SET_START_DATE':
                return Object.assign({}, state, {
                    startDate: action.startDate
                })
            case 'SET_END_DATE':
                return Object.assign({}, state, {
                    endDate: action.endDate
                })
        default:
            return state;
    }
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
})

const expenseOne = store.dispatch(addExpense({ description: 'Vacation', amount: 500 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 600}));
const expenseThree = store.dispatch(addExpense('vehicle'));
const expenseFour = store.dispatch(addExpense());

store.dispatch(removeExpense({ id: expenseThree.expense.id }));
store.dispatch(editExpense(expenseTwo.expense.id, {description: 'Tea'}));

store.dispatch(setTextFilter('sport'));

store.dispatch(sortByAmount());

store.dispatch(sortByDate());

store.dispatch(setStartDate(5000));
store.dispatch(setEndDate(10000));