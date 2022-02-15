import moment from 'moment';
import {categoryColors} from './GlobalStyle';

// Make First letter of a word capital letter
const capitalize = str => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

// Capitalize title and add color field for each category
const handleCategories = categories => {
  categories.map((item, index) => {
    categories[index].title = capitalize(item.title);
    categories[index].color = categoryColors[index % categoryColors.length];
  });
  return categories;
};

// Calculate total expense for each category
const calculateTotalExpense = categories => {
  categories.map((item, index) => {
    let total = 0;
    item.transactions.map((subItem, subIndex) => {
      total += subItem.amount;
    });
    categories[index].totalExpense = total;
  });
  return categories;
};

// All the transactions of the various categories
const getAllTransactions = categories => {
  let data = [];
  categories.map((item, index) => {
    item.transactions.map((subItem, subIndex) => {
      subItem['categoryId'] = item.id;
      subItem['categoryName'] = capitalize(item.title);
      subItem['color'] = item.color;
      data.push(subItem);
    });
  });
  return data;
};

//Eliminate reminder transactions
const eliminateReminders = categories => {
  let result = [];
  categories = JSON.parse(JSON.stringify(categories));

  for (let category of categories) {
    if (category.transactions === null) continue;
    let tempTransactions = [];
    for (let trans of category.transactions) {
      if (trans.remind === false) tempTransactions.push(trans);
    }
    category.transactions = tempTransactions;
    result.push(category);
  }

  return result;
};

// Total expense of the user
const netExpense = categories => {
  let total = 0;
  for (let category of categories) total += category.totalExpense;
  return total;
};

// Return filtered categories to Home Screen
const dateFilterHelper = (type, value, categories) => {
  let result = [];

  for (let category of categories) {
    if (category.transactions === null) continue;
    let tempTransactions = [];
    let total = 0;
    for (let txn of category.transactions) {
      let date = new Date(txn.transactionDate);
      switch (type) {
        case 'Day':
          if (date.toLocaleDateString() === value.toLocaleDateString()) {
            total += txn.amount;
            tempTransactions.push(txn);
          }
          break;
        case 'Month':
          if (
            date.getMonth() === value.getMonth() &&
            date.getFullYear() === value.getFullYear()
          ) {
            total += txn.amount;
            tempTransactions.push(txn);
          }
          break;
        case 'Year':
          if (date.getFullYear() === value) {
            total += txn.amount;
            tempTransactions.push(txn);
          }
          break;
      }
    }
    category.totalExpense = total;
    category.transactions = tempTransactions;
    if (tempTransactions.length > 0) result.push(category);
  }

  return result;
};

// Calculate expenses in each month for the desired year
const monthlyExpenses = transactions => {
  const result = {};
  for (let item of transactions) {
    let tempDate = new Date(); //get current date
    tempDate.setMonth(tempDate.getMonth() - 12); //subtract by 1 year
    tempDate = tempDate.getTime(); //convert to time
    if (item.transactionDate <= tempDate) continue; //filter only transactions of last year
    let month = moment(item.transactionDate).format('MMM');
    if (result.hasOwnProperty(month)) result[month] += item.amount;
    else result[month] = item.amount;
  }
  return result;
};

export {
  handleCategories,
  calculateTotalExpense,
  getAllTransactions,
  eliminateReminders,
  netExpense,
  dateFilterHelper,
  monthlyExpenses,
};
