import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the data object
        const transactionData = {
            email,
            password,
            transaction,
        };

        // Send the POST request to the backend
        axios.post('http://localhost:5000/api/transactions', transactionData)
            .then((response) => {
                alert('Transaction saved successfully!');
                setEmail('');  // Clear the form
                setPassword('');
                setTransaction('');
            })
            .catch((error) => {
                console.error('Error saving transaction:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Transaction:</label>
                <input
                    type="text"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionForm;
