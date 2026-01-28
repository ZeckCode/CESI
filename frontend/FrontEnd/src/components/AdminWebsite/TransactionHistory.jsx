<<<<<<<< Updated upstream:frontend/admin/components/pages/TransactionHistory.jsx
import React, { useState } from 'react';
import { 
  Search, Filter, Download, CreditCard, 
  DollarSign, CheckCircle, Clock, TrendingUp
} from 'lucide-react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);

  const financialStats = {
    totalRevenue: 485000,
    collected: 360000,
    pending: 125000
  };

  const transactionHistory = [
    {
      id: 1,
      date: '2026-01-15',
      studentName: 'Carlos Martinez',
      grade: 'Grade 4',
      amount: 15000,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0115-001'
    },
    {
      id: 2,
      date: '2026-01-14',
      studentName: 'Sofia Reyes',
      grade: 'Kindergarten',
      amount: 12000,
      paymentMethod: 'Bank Transfer',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0114-002'
    },
    {
      id: 3,
      date: '2026-01-14',
      studentName: 'Luis Fernandez',
      grade: 'Grade 1',
      amount: 14000,
      paymentMethod: 'GCash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0114-003'
    },
    {
      id: 4,
      date: '2026-01-13',
      studentName: 'Isabella Cruz',
      grade: 'Grade 2',
      amount: 14500,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0113-004'
    },
    {
      id: 5,
      date: '2026-01-12',
      studentName: 'Miguel Torres',
      grade: 'Grade 3',
      amount: 15000,
      paymentMethod: 'Bank Transfer',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0112-005'
    },
    {
      id: 6,
      date: '2026-01-11',
      studentName: 'Elena Rodriguez',
      grade: 'Grade 5',
      amount: 16000,
      paymentMethod: 'PayMaya',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0111-006'
    },
    {
      id: 7,
      date: '2026-01-10',
      studentName: 'David Santos',
      grade: 'Grade 6',
      amount: 16500,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0110-007'
    }
  ];

  const handleExportData = () => {
    alert('Exporting transaction data to Excel...');
  };

  const filteredTransactions = transactionHistory.filter(transaction => {
    const matchesSearch = transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="transaction-history-main">
      {/* Stats Overview */}
      <section className="th-section">
        <div className="th-stats-grid">
          <div className="th-stat-card th-stat-blue">
            <div className="th-stat-header">
              <span className="th-stat-label">Total Revenue</span>
              <TrendingUp size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.totalRevenue.toLocaleString()}</div>
            <div className="th-stat-change positive">This month</div>
          </div>

          <div className="th-stat-card th-stat-green">
            <div className="th-stat-header">
              <span className="th-stat-label">Collected</span>
              <CheckCircle size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.collected.toLocaleString()}</div>
            <div className="th-stat-change positive">74% collection rate</div>
          </div>

          <div className="th-stat-card th-stat-yellow">
            <div className="th-stat-header">
              <span className="th-stat-label">Pending</span>
              <Clock size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.pending.toLocaleString()}</div>
            <div className="th-stat-change">In process</div>
          </div>
        </div>
      </section>

      {/* Transaction History */}
      <section className="th-section">
        <div className="th-section-header">
          <div>
            <h2 className="th-section-title">Transaction History</h2>
            <p className="th-section-subtitle">All payment transactions recorded in the system</p>
          </div>
          <button className="th-btn-primary" onClick={handleExportData}>
            <Download size={18} />
            Export to Excel
          </button>
        </div>

        {/* Filters */}
        <div className="th-filters-container">
          <div className="th-search-box">
            <Search size={20} className="th-search-icon" />
            <input
              type="text"
              placeholder="Search by student name or reference number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="th-search-input"
            />
          </div>
          <div className="th-filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="th-filter-select"
            >
              <option value="all">All Transactions</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="th-table-container">
          <table className="th-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No.</th>
                <th>Student Name</th>
                <th>Grade Level</th>
                <th>Transaction Type</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr 
                  key={transaction.id}
                  className={hoveredRow === transaction.id ? 'th-row-hover' : ''}
                  onMouseEnter={() => setHoveredRow(transaction.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td>{transaction.date}</td>
                  <td className="th-reference-cell">{transaction.reference}</td>
                  <td className="th-student-name-cell">{transaction.studentName}</td>
                  <td>{transaction.grade}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <span className="th-payment-method">
                      <CreditCard size={16} />
                      {transaction.paymentMethod}
                    </span>
                  </td>
                  <td className="th-amount-cell">₱{transaction.amount.toLocaleString()}</td>
                  <td>
                    <span className={`th-status-badge th-status-${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

========
import React, { useState } from 'react';
import { 
  Search, Filter, Download, CreditCard, 
  DollarSign, CheckCircle, Clock, TrendingUp
} from 'lucide-react';
import '../AdminWebsiteCSS/TransactionHistory.css';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);

  const financialStats = {
    totalRevenue: 485000,
    collected: 360000,
    pending: 125000
  };

  const transactionHistory = [
    {
      id: 1,
      date: '2026-01-15',
      studentName: 'Carlos Martinez',
      grade: 'Grade 4',
      amount: 15000,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0115-001'
    },
    {
      id: 2,
      date: '2026-01-14',
      studentName: 'Sofia Reyes',
      grade: 'Kindergarten',
      amount: 12000,
      paymentMethod: 'Bank Transfer',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0114-002'
    },
    {
      id: 3,
      date: '2026-01-14',
      studentName: 'Luis Fernandez',
      grade: 'Grade 1',
      amount: 14000,
      paymentMethod: 'GCash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0114-003'
    },
    {
      id: 4,
      date: '2026-01-13',
      studentName: 'Isabella Cruz',
      grade: 'Grade 2',
      amount: 14500,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0113-004'
    },
    {
      id: 5,
      date: '2026-01-12',
      studentName: 'Miguel Torres',
      grade: 'Grade 3',
      amount: 15000,
      paymentMethod: 'Bank Transfer',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0112-005'
    },
    {
      id: 6,
      date: '2026-01-11',
      studentName: 'Elena Rodriguez',
      grade: 'Grade 5',
      amount: 16000,
      paymentMethod: 'PayMaya',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0111-006'
    },
    {
      id: 7,
      date: '2026-01-10',
      studentName: 'David Santos',
      grade: 'Grade 6',
      amount: 16500,
      paymentMethod: 'Cash',
      type: 'Tuition Fee',
      status: 'completed',
      reference: 'TXN-2026-0110-007'
    }
  ];

  const handleExportData = () => {
    alert('Exporting transaction data to Excel...');
  };

  const filteredTransactions = transactionHistory.filter(transaction => {
    const matchesSearch = transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="transaction-history-main">
      {/* Stats Overview */}
      <section className="th-section">
        <div className="th-stats-grid">
          <div className="th-stat-card th-stat-blue">
            <div className="th-stat-header">
              <span className="th-stat-label">Total Revenue</span>
              <TrendingUp size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.totalRevenue.toLocaleString()}</div>
            <div className="th-stat-change positive">This month</div>
          </div>

          <div className="th-stat-card th-stat-green">
            <div className="th-stat-header">
              <span className="th-stat-label">Collected</span>
              <CheckCircle size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.collected.toLocaleString()}</div>
            <div className="th-stat-change positive">74% collection rate</div>
          </div>

          <div className="th-stat-card th-stat-yellow">
            <div className="th-stat-header">
              <span className="th-stat-label">Pending</span>
              <Clock size={24} className="th-stat-icon" />
            </div>
            <div className="th-stat-value">₱{financialStats.pending.toLocaleString()}</div>
            <div className="th-stat-change">In process</div>
          </div>
        </div>
      </section>

      {/* Transaction History */}
      <section className="th-section">
        <div className="th-section-header">
          <div>
            <h2 className="th-section-title">Transaction History</h2>
            <p className="th-section-subtitle">All payment transactions recorded in the system</p>
          </div>
          <button className="th-btn-primary" onClick={handleExportData}>
            <Download size={18} />
            Export to Excel
          </button>
        </div>

        {/* Filters */}
        <div className="th-filters-container">
          <div className="th-search-box">
            <Search size={20} className="th-search-icon" />
            <input
              type="text"
              placeholder="Search by student name or reference number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="th-search-input"
            />
          </div>
          <div className="th-filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="th-filter-select"
            >
              <option value="all">All Transactions</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="th-table-container">
          <table className="th-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No.</th>
                <th>Student Name</th>
                <th>Grade Level</th>
                <th>Transaction Type</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr 
                  key={transaction.id}
                  className={hoveredRow === transaction.id ? 'th-row-hover' : ''}
                  onMouseEnter={() => setHoveredRow(transaction.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td>{transaction.date}</td>
                  <td className="th-reference-cell">{transaction.reference}</td>
                  <td className="th-student-name-cell">{transaction.studentName}</td>
                  <td>{transaction.grade}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <span className="th-payment-method">
                      <CreditCard size={16} />
                      {transaction.paymentMethod}
                    </span>
                  </td>
                  <td className="th-amount-cell">₱{transaction.amount.toLocaleString()}</td>
                  <td>
                    <span className={`th-status-badge th-status-${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

>>>>>>>> Stashed changes:frontend/FrontEnd/src/components/AdminWebsite/TransactionHistory.jsx
export default TransactionHistory;