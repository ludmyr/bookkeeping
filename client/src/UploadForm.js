// import React, { useState } from 'react';

// function UploadForm() {
//   const [name, setName] = useState('');
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !name.trim() || isUploading) return;

//     setIsUploading(true);
//     setStatus('...מעלה קובץ');

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('name', name);

//     try {
//       const res = await fetch('/upload', {
//         method: 'POST',
//         body: formData
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setStatus('✅ ' + result.message);
//         setName('');
//         setFile(null);
//       } else {
//         setStatus('❌ ' + result.message);
//       }
//     } catch (err) {
//       setStatus('❌ שגיאת רשת');
//     }
//     setIsUploading(false);
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto' }}>
//       <h2>העלאת קובץ</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="שם קובץ"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//         />
//         <br />
//         <button type="submit" disabled={isUploading}>העלה</button>
//       </form>
//       <p>{status}</p>
//     </div>
//   );
// }

// export default UploadForm;
import React, { useState } from 'react';

function UploadForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name.trim() || isUploading) return;

    setIsUploading(true);
    setStatus('...מעלה קובץ');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('✅ ' + result.message);
        setName('');
        setFile(null);
      } else {
        setStatus('❌ ' + result.message);
      }
    } catch (err) {
      setStatus('❌ שגיאת רשת');
    }
    setIsUploading(false);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: '32px 24px',
        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
        borderRadius: '18px',
        boxShadow: '0 4px 16px rgba(60,60,120,0.08)',
        direction: 'rtl' // שינוי כיוון מימין לשמאל
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#3b3b6d', marginBottom: 24 }}>העלאת קובץ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="שם קובץ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '14px',
            borderRadius: '8px',
            border: '1px solid #bfc2d4',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{
            width: '96%',
            padding: '8px',
            marginBottom: '18px',
            borderRadius: '8px',
            border: '1px solid #bfc2d4',
            background: '#fff'
          }}
        />
        <button
          type="submit"
          disabled={isUploading}
          style={{
            width: '100%',
            padding: '12px',
            background: isUploading ? '#bfc2d4' : 'linear-gradient(90deg, #6366f1 60%, #818cf8 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {isUploading ? 'מעלה...' : 'העלה'}
        </button>
      </form>
      <p style={{
        textAlign: 'center',
        marginTop: '18px',
        color: status.startsWith('✅') ? '#22c55e' : status.startsWith('❌') ? '#ef4444' : '#3b3b6d',
        fontWeight: 'bold'
      }}>
        {status}
      </p>
    </div>
  );
}

export default UploadForm;