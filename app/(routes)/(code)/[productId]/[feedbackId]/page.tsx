'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function FeedbackModal({ params }) {
  const router = useRouter();
  const { productId, feedbackId } = React.use(params);

  const closeModal = () => {
    // Navigate back to the main page for the id
    router.push(`/${productId}`);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={closeModal} style={modalStyles.closeButton}>
          <X />
        </button>
        <h2>Feedback: {feedbackId}</h2>
        <p>Modal content goes here.</p>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, // ensure the modal is on top
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    maxWidth: '500px',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
};
