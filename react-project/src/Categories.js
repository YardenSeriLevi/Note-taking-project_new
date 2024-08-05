import React, { useState, useEffect } from 'react';
import { firestore, collection, addDoc, onSnapshot, query, doc, deleteDoc, serverTimestamp, updateDoc, logAction } from './firebase';
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';
import VersionHistory from './VersionHistory';  // Import the VersionHistory component

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const q = query(collection(firestore, 'categories'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') {
        alert('Comment cannot be empty.');
        return;
      }
    const categoryDoc = await addDoc(collection(firestore, 'categories'), { name: newCategory });
    await logAction(user, 'Added Category', `Category: ${newCategory}`);
    setNewCategory('');
    setShow(false);
  };

  const handleDeleteCategory = async (id, categoryName) => {
    await deleteDoc(doc(firestore, 'categories', id));
    await logAction(user, 'Deleted Category', `Category: ${categoryName}`);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>Add Category</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCategory}>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="mt-4">
        {categories.map((category) => (
          <Card key={category.id} className="mb-3">
            <Card.Header>
              {category.name}
              <Button variant="danger" className="float-end" onClick={() => handleDeleteCategory(category.id, category.name)}>Delete</Button>
            </Card.Header>
            <Card.Body>
              <CommentTable categoryId={category.id} user={user} />
            </Card.Body>
          </Card>
        ))}
      </div>
      <VersionHistory categories={categories} /> {/* Pass categories as a prop */}
    </div>
  );
};

const CommentTable = ({ categoryId, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [categoryName, setCategoryName] = useState('');
  
    useEffect(() => {
      const fetchCategoryName = async () => {
        try {
          const categoryDoc = await doc(firestore, 'categories', categoryId).get();
          if (categoryDoc.exists()) {
            setCategoryName(categoryDoc.data().name || 'Unnamed Category'); // Default if name is not set
          } else {
            console.error('No such category!');
          }
        } catch (error) {
          console.error('Error fetching category name:', error);
        }
      };
  
      fetchCategoryName();
  
      const q = query(collection(firestore, 'categories', categoryId, 'comments'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      });
  
      return () => unsubscribe();
    }, [categoryId]);
  
    const handleAddComment = async () => {
      if (newComment.trim() === '') {
        alert('Comment cannot be empty.');
        return;
      }
      const commentDoc = await addDoc(collection(firestore, 'categories', categoryId, 'comments'), {
        text: newComment,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      await logAction(user, 'Added Comment', `Category: ${categoryName}, Comment: ${newComment}`);
      setNewComment('');
    };
  
    const handleDeleteComment = async (commentId, commentText) => {
      await deleteDoc(doc(firestore, 'categories', categoryId, 'comments', commentId));
      await logAction(user, 'Deleted Comment', `Category: ${categoryName}, Comment: ${commentText}`);
    };
  
    const handleEditComment = async (commentId, newText, oldText) => {
      await updateDoc(doc(firestore, 'categories', categoryId, 'comments', commentId), { text: newText });
      await logAction(user, 'Edited Comment', `Category: ${categoryName}, Old Comment: ${oldText}, New Comment: ${newText}`);
    };
  
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Comment</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.text}</td>
                <td>{comment.email}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditComment(comment.id, prompt("Edit Comment", comment.text), comment.text)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteComment(comment.id, comment.text)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form.Control type="text" placeholder="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button variant="primary" onClick={handleAddComment}>Add Comment</Button>
      </div>
    );
  };

export default Categories;