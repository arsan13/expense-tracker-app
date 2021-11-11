// Total expense of each category
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
      subItem['categoryName'] = item.title;
      data.push(subItem);
    });
  });
  return data;
};

// Total expense on all categories
const netExpense = categories => {
  let total = 0;
  for (let category of categories) total += category.totalExpense;
  return total;
};

// Return filtered categories to Home Screen
const dateFilterHelper = (type, value, categories) => {
  let result = [];

  for (let category of categories) {
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

export {
  calculateTotalExpense,
  getAllTransactions,
  netExpense,
  dateFilterHelper,
};
