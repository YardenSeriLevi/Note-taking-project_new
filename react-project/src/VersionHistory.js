import React, { useEffect, useState } from 'react';
import { firestore, collection, onSnapshot, query } from './firebase';
import { Table } from 'react-bootstrap';

const VersionHistory = ({ categories }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'versionHistory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Log the data for debugging
        console.log('Version History Data:', data);

        // Find category name
        const category = categories.find(cat => cat.id === data.categoryId);
        const categoryName = category ? category.name : 'Unnamed Category'; // Use category name if available
        
        // Log the resolved category name
        console.log('Resolved Category Name:', categoryName);

        return {
          id: doc.id,
          user: data.user,
          action: data.action,
          details: data.details.replace(data.categoryId, categoryName), // Replace ID with name in details
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
        };
      });
      setHistory(historyData);
    });

    return () => unsubscribe();
  }, [categories]);

  return (
    <div>
      <h2>Version History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.user}</td>
              <td>{entry.action}</td>
              <td>{entry.details}</td>
              <td>{entry.timestamp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VersionHistory;
