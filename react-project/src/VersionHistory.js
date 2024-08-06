import React, { useEffect, useState } from 'react';
import { firestore, collection, onSnapshot, query, doc, setDoc, logAction } from './firebase';
import { Table } from 'react-bootstrap';

const VersionHistory = ({ categories, user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'versionHistory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map((doc) => {
        const data = doc.data();
        const category = categories.find(cat => cat.id === data.categoryId);
        const categoryName = category ? category.name : 'Unnamed Category';
        return {
          id: doc.id,
          user: data.user,
          action: data.action,
          details: data.details.replace(data.categoryId, categoryName),
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          originalData: data.originalData, // Include the original data for restoration
        };
      });
      setHistory(historyData);
    });

    return () => unsubscribe();
  }, [categories]);

  const handleRestore = async (entry) => {
    const { originalData } = entry;

    if (originalData.commentId) {
      // Restore a comment
      const commentRef = doc(firestore, 'categories', originalData.categoryId, 'comments', originalData.commentId);
      await setDoc(commentRef, originalData.commentData);
    } else if (originalData.categoryId) {
      // Restore a category
      const categoryRef = doc(firestore, 'categories', originalData.categoryId);
      await setDoc(categoryRef, originalData.categoryData);
    }

    await logAction(user, 'Restored', `Restored data from version history: ${entry.details}`);
    alert('Restoration successful');
  };

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
            <tr key={entry.id} onClick={() => handleRestore(entry)} style={{ cursor: 'pointer' }}>
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
