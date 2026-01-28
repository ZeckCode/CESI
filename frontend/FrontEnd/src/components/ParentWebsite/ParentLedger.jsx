import React, { useState, useEffect } from 'react';
import './ParentLedger.css';

const ParentLedger = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL'); // ALL, PAID, PENDING, OVERDUE

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/finance/transactions/');
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data.results || data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = filter === 'ALL'
    ? transactions
    : transactions.filter(t => t.status === filter);

  const summaryData = {
    total: transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0),
    paid: transactions
      .filter(t => t.status === 'PAID')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0),
    pending: transactions
      .filter(t => t.status === 'PENDING')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0),
    overdue: transactions
      .filter(t => t.status === 'OVERDUE')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0),
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PAID: { class: 'badge-success', label: '✓ Paid' },
      PENDING: { class: 'badge-warning', label: '⏳ Pending' },
      OVERDUE: { class: 'badge-danger', label: '⚠️ Overdue' },
    };
    return statusMap[status] || { class: '', label: status };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="parent-ledger-container">
      <div className="ledger-header">
        <h1>💰 Payment Ledger</h1>
        <p>Track all school fees and payments</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Amount</h3>
          <p className="amount">₱{summaryData.total.toFixed(2)}</p>
        </div>
        <div className="summary-card paid">
          <h3>Paid</h3>
          <p className="amount">₱{summaryData.paid.toFixed(2)}</p>
        </div>
        <div className="summary-card pending">
          <h3>Pending</h3>
          <p className="amount">₱{summaryData.pending.toFixed(2)}</p>
        </div>
        <div className="summary-card overdue">
          <h3>Overdue</h3>
          <p className="amount">₱{summaryData.overdue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="ledger-filters">
        <div className="filter-buttons">
          {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <button onClick={fetchTransactions} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {loading && <div className="loading">Loading transactions...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && filteredTransactions.length === 0 && (
        <div className="no-data">No transactions found for this filter.</div>
      )}

      {/* Transactions Table */}
      {!loading && filteredTransactions.length > 0 && (
        <div className="transactions-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => {
                const statusInfo = getStatusBadge(transaction.status);
                return (
                  <tr key={transaction.id} className={`status-${transaction.status.toLowerCase()}`}>
                    <td>{formatDate(transaction.date_created)}</td>
                    <td>
                      <div className="description">
                        <p>{transaction.description || 'School Fee'}</p>
                        <small>Student: {transaction.student_name}</small>
                      </div>
                    </td>
                    <td>
                      <span className="type-badge">
                        {transaction.transaction_type === 'TUITION' ? '📚 Tuition' : '📋 Miscellaneous'}
                      </span>
                    </td>
                    <td className="amount">₱{parseFloat(transaction.amount).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>
                      {transaction.status === 'PENDING' && (
                        <button className="action-btn pay-btn">Pay Now</button>
                      )}
                      {transaction.status === 'OVERDUE' && (
                        <button className="action-btn urgent-btn">Pay Now!</button>
                      )}
                      {transaction.status === 'PAID' && (
                        <button className="action-btn download-btn">Receipt</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParentLedger;
