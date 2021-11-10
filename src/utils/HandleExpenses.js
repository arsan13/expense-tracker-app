import React from 'react';

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

export {calculateTotalExpense, getAllTransactions};
