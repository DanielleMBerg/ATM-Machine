const ATMDeposit = ({ onChange, isDeposit, choice }) => {
  return (
    <label>
      <input id="number" type="number" onChange={onChange} placeholder={`Enter ${choice[Number(!isDeposit)]} Amount`}></input>
    </label>
  );
};

const Account = () => {
  const { useEffect, useState } = React;
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState('');
  const [isWithdrawal20, setIsWithdrawalUnder100] = useState('');
  const [isWithdrawal100, setIsWithdrawalOver100] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const choice = ["Deposit", "Withdrawal"];
  let status = totalState;

//Clears the fields upon transaction and records transaction log to console 
  useEffect(() => {
    console.log(transactionHistory);
    setDeposit(0);
    setAtmMode('')
  }, [totalState]);

// Removes the withdrawal options upon transaction or when deposit button is clicked
  useEffect(() => {
    setIsWithdrawalUnder100('');
    setIsWithdrawalOver100('');
  }, [totalState, isDeposit]);

  const handleChange = event => {
    let amount = event.target.value;
// Controls the money denomination options for withdrawal
    if (atmMode === 'Withdrawal' && amount >= 20 && amount < 100) {
      setIsWithdrawalUnder100(true);
      setIsWithdrawalOver100('');
    } else if (atmMode === 'Withdrawal' && amount >= 100) {
      setIsWithdrawalOver100(true)
      setIsWithdrawalUnder100('');
    } else {
      setIsWithdrawalUnder100('');
      setIsWithdrawalOver100('')
    }
    setDeposit(Number(amount));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
// Putting a limit on withdrawals so that the account balance doesn't go below 0
    if (newTotal <= -1) {
      alert('Not enough money in account to support withdrawal request. Transaction failed.');
      return;
    }
    setTotalState(newTotal);
// Keeping track of transactions
    let transaction = isDeposit ? deposit : -deposit
    setTransactionHistory([...transactionHistory, transaction]);
// Clearing the input field
    event.target.number.value = '';
  };

// Controls the appearance of the deposit input field
    const chooseTransactionType = (event) => {
      setAtmMode(event.target.value);
      if (event.target.value === 'Deposit') {
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      }
    };


  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2>Account Balance<br></br>$ {status}</h2>
      <h4>Select an option:</h4>
      <input type="button" onClick={chooseTransactionType} value="Deposit" className="btn btn-primary"></input>
      <input type="button" onClick={chooseTransactionType} value="Withdrawal" className="btn btn-dark"></input>
      <br></br>
      {atmMode && (
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} choice={choice}></ATMDeposit>
      )}
      <br></br>
      {isWithdrawal20 && (
        <section>
          <label className='label'>What denomination would you like your money to be in?</label>
          <br></br>
            <select>
              <option>$1 bills</option>
              <option>$5 bills</option>
              <option>$10 bills</option>
              <option>$20 bills</option>
            </select>
        </section>
      )}
      {isWithdrawal100 && (
        <section>
          <label className="label">What denomination would you like your money to be in?</label>
          <br></br>
            <select>
              <option>$20 bills</option>
              <option>$50 bills</option>
              <option>$100 bills</option>
            </select>
        </section>
      )}
      {atmMode && (
        <button id="submit" className="btn btn-success">{`Submit ${choice[Number(!isDeposit)]}`}</button>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
