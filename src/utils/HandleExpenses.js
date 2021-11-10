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

const dateFilterHelper = (type, date, categories) => {
  let result = [];
  switch (type) {
    case 'Day':
      break;
    case 'Month':
      break;
    case 'Year':
      // for (let category of categories) {
      //   let tempTransactions = [];
      //   let total = 0;
      //   for (let txn of category.transactions) {
      //     if (new Date(txn.transactionDate).getFullYear() === date) {
      //       total += txn.amount;
      //       tempTransactions.push(txn);
      //     }
      //   }
      //   category.totalExpense = total;
      //   category.transactions = tempTransactions;
      //   if (tempTransactions.length > 0) result.push(category);
      // }
      break;
  }
  console.log({result});
  return result;
};

export {
  calculateTotalExpense,
  getAllTransactions,
  netExpense,
  dateFilterHelper,
};
