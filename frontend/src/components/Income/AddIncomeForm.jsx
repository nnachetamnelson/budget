import React, { useState } from 'react';
import Inputs from '../Inputs/Inputs';
import EmojiPicker from 'emoji-picker-react';
import EmojiPickerpopup from '../EmojiPickerpopup';


const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => {
    setIncome((income) => ({
      ...income,
      [key]: value,
    }));
  };

  return (
    <div>
        <EmojiPickerpopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />
      <Inputs
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Inputs
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder="e.g. 1000"
        type="number"
      />

      <Inputs
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill bg-purple"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
