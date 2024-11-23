import { Link } from 'react-router-dom';
import  './TransactionForm.css';

const TransactionForm = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content border border-2 rounded p-4">
        <h2>Add Expense/Income</h2>
        <hr/>
        <form>
          <div className="modal-wind">
            <label htmlFor="Type">Type</label>
            <select
              name="type"
              className="form-select form-select-sm"
              aria-label="Small select example">
              <option>Expense</option>
              <option>Income</option>
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              className="form-select form-select-sm"
              aria-label="Small select example">
              <option>Salary</option>
              <option>Food</option>
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="Amount">Amount</label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                name="amount"
                min={1}
                className="form-control me-2"
              />
              <span>KGS</span>
            </div>
          </div>
          <hr/>
          <div className="my-3 d-flex justify-content-between align-items-center">
            <Link to="/" type="submit" className="btn btn-outline-info">
              Cancel
            </Link>
            <button type="submit" className="btn btn-outline-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;