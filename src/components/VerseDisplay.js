// import React, { useState, useEffect, useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBook, faTimes, faBookmark as faSolidBookmark, faMoon as faSolidMoon } from '@fortawesome/free-solid-svg-icons';
// import { faBookmark as faRegularBookmark, faMoon as faRegularMoon } from '@fortawesome/free-regular-svg-icons';
// import data from '../data/bhagavad-gita.json';
// import './VerseDisplay.css';

// const VerseDisplay = () => {
//   const [chapters, setChapters] = useState([]);
//   const [verses, setVerses] = useState([]);
//   const [filteredVerses, setFilteredVerses] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState('');
//   const [selectedVerse, setSelectedVerse] = useState('');
//   const [verseText, setVerseText] = useState('');
//   const [verseTextDevnagari, setVerseTextDevnagari] = useState('');
//   const [verseTextEnglish, setVerseTextEnglish] = useState('');
//   const [synonyms, setSynonyms] = useState('');
//   const [translation, setTranslation] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const [bookmarks, setBookmarks] = useState([]);
//   const [notification, setNotification] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [matchedVerses, setMatchedVerses] = useState([]);
//   const [isBookmarksVisible, setIsBookmarksVisible] = useState(false);
//   const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

//   useEffect(() => {
//     const chapterList = [...new Set(data.map((item) => item.chapter))];
//     setChapters(chapterList);
//     const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
//     setBookmarks(savedBookmarks);
//   }, []);

//   const handleSearchChange = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);
//     if (term.trim() === '') {
//       setMatchedVerses([]);
//       return;
//     }
//     const matched = data.filter((item) =>
//       item.verse_text_english.toLowerCase().includes(term.toLowerCase()) ||
//       item.chapter.toString().includes(term) ||
//       item.verse.toString().includes(term)
//     );
//     setMatchedVerses(
//       matched.map((item) => ({
//         chapter: item.chapter,
//         verse: item.verse,
//         text: item.verse_text_english
//       }))
//     );
//   };

//   const highlightSearchTerm = (text, term) => {
//     if (!term) return text;
//     const parts = text.split(new RegExp(`(${term})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === term.toLowerCase() ? <mark key={i}>{part}</mark> : part
//     );
//   };

//   const handleChapterChange = useCallback((event) => {
//     const chapter = event.target.value;
//     setSelectedChapter(chapter);
//     const filtered = data.filter((item) => item.chapter === chapter);
//     setVerses(filtered);
//     setFilteredVerses(filtered);
//     setSelectedVerse('');
//     setVerseText('');
//     setVerseTextDevnagari('');
//     setVerseTextEnglish('');
//     setSynonyms('');
//     setTranslation('');
//   }, []);

//   const handleVerseChange = useCallback((event) => {
//     const verse = event.target.value;
//     setSelectedVerse(verse);
//     const selectedVerseText = data.find(
//       (item) => item.chapter === selectedChapter && item.verse === verse
//     );
//     setVerseText(selectedVerseText ? selectedVerseText.verse_text_english : '');
//     setVerseTextDevnagari(selectedVerseText ? selectedVerseText.verse_text_devnagari : '');
//     setVerseTextEnglish(selectedVerseText ? selectedVerseText.verse_text_english : '');
//     setSynonyms(selectedVerseText ? selectedVerseText.Synonyms : '');
//     setTranslation(selectedVerseText ? selectedVerseText.Translation : '');
//   }, [selectedChapter]);

//   const toggleDarkMode = useCallback(() => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add('dark-mode');
//     } else {
//       document.documentElement.classList.remove('dark-mode');
//     }
//   }, [darkMode]);

//   const navigateToUrl = (chapter, verse) => {
//     const url = `https://vedabase.io/en/library/bg/${chapter}/${verse}/`;
//     window.location.href = url;
//   };

//   const handleShare = useCallback(() => {
//     if (navigator.share) {
//       navigator.share({
//         url: `https://vedabase.io/en/library/bg/${selectedChapter}/${selectedVerse}/`
//       }).then(() => {
//         navigateToUrl(selectedChapter, selectedVerse);
//       })
//       .catch(console.error);
//     } else {
//       setNotification('Share feature not supported on this browser.');
//     }
//   }, [selectedChapter, selectedVerse, verseText, translation]);

//   const handleBookmark = useCallback(() => {
//     if (!bookmarks.some((bookmark) => bookmark.chapter === selectedChapter && bookmark.verse === selectedVerse)) {
//       const newBookmark = {
//         chapter: selectedChapter,
//         verse: selectedVerse,
//         verse_text_english: verseText,
//         translation: translation
//       };
//       const updatedBookmarks = [...bookmarks, newBookmark];
//       setBookmarks(updatedBookmarks);
//       localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
//       setNotification('Verse bookmarked!');
//     } else {
//       setNotification('This verse is already bookmarked!');
//     }
//   }, [bookmarks, selectedChapter, selectedVerse, verseText, translation]);

//   const handleRemoveBookmark = useCallback((verse) => {
//     const updatedBookmarks = bookmarks.filter(
//       (bookmark) => bookmark.chapter !== verse.chapter || bookmark.verse !== verse.verse
//     );
//     setBookmarks(updatedBookmarks);
//     localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
//     setNotification('Bookmark removed!');
//   }, [bookmarks]);

//   const toggleSidePanel = () => {
//     setIsSidePanelVisible(prevState => !prevState);
//   };

//   const handleViewBookmarks = () => {
//     toggleSidePanel();
//   };

//   const handlePrevNext = useCallback((direction) => {
//     const currentIndex = verses.findIndex(
//       (item) => item.chapter === selectedChapter && item.verse === selectedVerse
//     );
//     if (currentIndex !== -1) {
//       const newIndex = currentIndex + direction;
//       if (newIndex >= 0 && newIndex < verses.length) {
//         const nextVerse = verses[newIndex];
//         setSelectedVerse(nextVerse.verse);
//         setVerseText(nextVerse.verse_text_english);
//         setVerseTextDevnagari(nextVerse.verse_text_devnagari);
//         setVerseTextEnglish(nextVerse.verse_text_english);
//         setSynonyms(nextVerse.Synonyms);
//         setTranslation(nextVerse.Translation);
//       }
//     }
//   }, [verses, selectedChapter, selectedVerse]);

//   const renderVerseDevnagari = () => {
//     if (!verseTextDevnagari) return null;
//     return verseTextDevnagari.split('\n').map((line, index) => (
//       <p key={index} style={{ margin: '5px 0', fontWeight: 'bold' }}>
//         {line}
//       </p>
//     ));
//   };

//   const renderSynonyms = () => {
//     if (!synonyms) return null;
//     const synonymsList = Array.isArray(synonyms) ? synonyms : [synonyms];
//     return (
//       <ul className="list-disc pl-6" style={{ fontWeight: 'bold' }}>
//         {synonymsList.map((syn, index) => (
//           <li className="mb-1" key={index}>{syn}</li>
//         ))}
//       </ul>
//     );
//   };

//   const renderVerseEnglish = () => {
//     if (!verseTextEnglish) return null;
//     return verseTextEnglish.split('\n').map((line, index) => (
//       <p key={index} style={{ margin: '5px 0', fontWeight: 'bold' }}>
//         {line}
//       </p>
//     ));
//   };

//   return (
//     <>
//       <div className={darkMode ? 'dark-mode' : ''} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//         <div className="navbar">
//           <div className="title">
//             <h1>Bhagavad Gita</h1>
//           </div>
//           <div className="features">
//             <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
//               <div style={{ marginTop: '20px' }}>
//                 <button onClick={handleViewBookmarks} style={{ padding: '10px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '5px' }}>
//                   <FontAwesomeIcon icon={isBookmarksVisible ? faTimes : faBook} />
//                 </button>
//                 <button onClick={toggleDarkMode} style={{ marginBottom: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>
//                   <FontAwesomeIcon icon={darkMode ? faRegularMoon : faSolidMoon} style={{ marginRight: '8px' }} />
//                 </button>
//                 {verseText && (
//                   <div style={{ marginTop: '20px' }}>
//                     <button
//                       onClick={handleShare}
//                       style={{
//                         padding: '10px',
//                         backgroundColor: '#008CBA',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       <i className="fas fa-share" style={{ marginRight: '8px' }}></i>
//                       Share Screenshot
//                     </button>
//                   </div>
//                 )}
//                 {isSidePanelVisible && (
//                   <div
//                     style={{
//                       position: 'fixed',
//                       top: 0,
//                       right: 0,
//                       width: '300px',
//                       height: '100%',
//                       backgroundColor: '#f4f4f4',
//                       borderLeft: '1px solid #ccc',
//                       padding: '20px',
//                       zIndex: 1000,
//                       boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
//                       transition: 'transform 0.3s ease',
//                       transform: isSidePanelVisible ? 'translateX(0)' : 'translateX(100%)',
//                     }}
//                   >
//                     <h3>Bookmarked Verses <FontAwesomeIcon icon={faTimes} size="2xs" /></h3>
//                     {bookmarks.length > 0 ? (
//                       <ul style={{ listStyleType: 'none', padding: '0' }}>
//                         {bookmarks.map((bookmark, index) => (
//                           <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                             <div style={{ flex: 1 }}>
//                               <strong>Chapter {bookmark.chapter}, Verse {bookmark.verse}:</strong> {bookmark.verse_text_english}
//                             </div>
//                             <button
//                               onClick={() => handleRemoveBookmark(bookmark)}
//                               style={{
//                                 marginLeft: '10px',
//                                 padding: '5px 10px',
//                                 backgroundColor: '#FF6347',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                               }}
//                             >
//                               Remove
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>No verses bookmarked.</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="searchchapterverse">
//           <div className="search">
//             <div style={{ marginBottom: '20px' }}>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   handleSearchChange(e);
//                   highlightSearchTerm(e.target.value);
//                 }}
//                 placeholder="Search verses..."
//                 style={{ padding: '10px', width: '100%' }}
//               />
//             </div>
//             {matchedVerses.length > 0 && (
//               <div style={{ position: 'relative', marginTop: '20px' }}>
//                 <h2>Matched Verses:</h2>
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: '20px',
//                     left: '0',
//                     right: '0',
//                     backgroundColor: '#fff',
//                     border: '1px solid #ccc',
//                     borderRadius: '5px',
//                     padding: '10px',
//                     maxHeight: '200px',
//                     overflowY: 'auto',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     zIndex: 1000,
//                   }}
//                 >
//                   {matchedVerses.map((verse, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         padding: '5px',
//                         borderBottom: '1px solid #ccc',
//                         cursor: 'pointer',
//                         color: '#333',
//                       }}
//                       onClick={() => {
//                         setSelectedChapter(verse.chapter);
//                         setSelectedVerse(verse.verse);
//                         setVerseText(verse.text);
//                       }}
//                     >
//                       <strong>
//                         Chapter {verse.chapter}, Verse {verse.verse}:
//                       </strong>{' '}
//                       {verse.text}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="select">
//             <div className="chapterselect">
//               <div style={{ marginTop: '20px' }}>
//                 <select value={selectedChapter} onChange={handleChapterChange}>
//                   <option value="">Select Chapter</option>
//                   {chapters.map((chapter) => (
//                     <option key={chapter} value={chapter}>Chapter {chapter}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="verseselect">
//               <div style={{ marginTop: '20px' }}>
//                 <select value={selectedVerse} onChange={handleVerseChange}>
//                   <option value="">Select Verse</option>
//                   {verses.map((verse) => (
//                     <option key={verse.verse} value={verse.verse}>
//                       Verse {verse.verse}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="lower">
//           <div className="lower2">
//             <div className="left">
//               {(selectedChapter && selectedVerse) ? (
//                 <div style={{ marginTop: '20px', display: 'flex' }}>
//                   <div className="left1" style={{ flex: 1, paddingRight: '10px' }}>
//                     <div>
//                       <h2>Chapter {selectedChapter} - Verse {selectedVerse}</h2>
//                       <div style={{ marginTop: '20px' }}>
//                         <button onClick={handleBookmark} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//                           <FontAwesomeIcon
//                             icon={bookmarks.some((bookmark) => bookmark.chapter === selectedChapter && bookmark.verse === selectedVerse) ? faSolidBookmark : faRegularBookmark}
//                             style={{ marginRight: '8px' }}
//                           />
//                         </button>
//                         {notification && (
//                           <div style={{ marginTop: '20px', color: 'green' }}>
//                             <strong>{notification}</strong>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div>{renderVerseDevnagari()}</div>
//                     <div>{renderVerseEnglish()}</div>
//                   </div>
//                   <div style={{ borderLeft: '2px solid #000000', height: '100%', margin: '0 10px' }}></div>
//                   <div className="right" style={{ flex: 1, paddingLeft: '10px' }}>
//                     <div>{renderSynonyms()}</div>
//                     <p style={{ fontWeight: 'bold' }}>{translation}</p>
//                   </div>
//                   <div className="controls">
//                     {selectedVerse && (
//                       <div style={{ marginTop: '20px' }}>
//                         <button onClick={() => handlePrevNext(-1)} style={{ marginRight: '10px' }}>Previous</button>
//                         <button onClick={() => handlePrevNext(1)}>Next</button>
//                         <button onClick={() => navigateToUrl(selectedChapter, selectedVerse)}>Read More</button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                   <h1>Welcome Krsna</h1>
//                   <div className="left" style={{ flex: 1, padding: '20px', maxWidth: '600px', textAlign: 'center' }}>
//                     <h2 style={{ fontSize: '24px', color: '#2c3e50' }}>Hare Krsna Hare Krsna</h2>
//                     <h2 style={{ fontSize: '24px', color: '#2c3e50' }}>Krsna Krsna Hare Hare</h2>
//                     <h2 style={{ fontSize: '24px', color: '#2c3e50' }}>Hare Rama Hare Rama</h2>
//                     <h2 style={{ fontSize: '24px', color: '#2c3e50' }}>Rama Rama Hare Hare</h2>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VerseDisplay;




















































































import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTimes, faBookmark as faSolidBookmark, faMoon as faSolidMoon } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark, faMoon as faRegularMoon } from '@fortawesome/free-regular-svg-icons';
import data from '../data/bhagavad-gita.json';
import './VerseDisplay.css';

const VerseDisplay = () => {
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [filteredVerses, setFilteredVerses] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [verseText, setVerseText] = useState('');
  const [verseTextDevnagari, setVerseTextDevnagari] = useState('');
  const [verseTextEnglish, setVerseTextEnglish] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [translation, setTranslation] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedVerses, setMatchedVerses] = useState([]);
  const [isBookmarksVisible, setIsBookmarksVisible] = useState(false);
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

  useEffect(() => {
    const chapterList = [...new Set(data.map((item) => item.chapter))];
    setChapters(chapterList);
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === '') {
      setMatchedVerses([]);
      return;
    }
    const matched = data.filter((item) =>
      item.verse_text_english.toLowerCase().includes(term.toLowerCase()) ||
      item.chapter.toString().includes(term) ||
      item.verse.toString().includes(term)
    );
    setMatchedVerses(
      matched.map((item) => ({
        chapter: item.chapter,
        verse: item.verse,
        text: item.verse_text_english
      }))
    );
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? <mark key={i}>{part}</mark> : part
    );
  };

  const handleChapterChange = useCallback((event) => {
    const chapter = event.target.value;
    setSelectedChapter(chapter);
    const filtered = data.filter((item) => item.chapter === chapter);
    setVerses(filtered);
    setFilteredVerses(filtered);
    setSelectedVerse('');
    setVerseText('');
    setVerseTextDevnagari('');
    setVerseTextEnglish('');
    setSynonyms('');
    setTranslation('');
  }, []);

  const handleVerseChange = useCallback((event) => {
    const verse = event.target.value;
    setSelectedVerse(verse);
    const selectedVerseText = data.find(
      (item) => item.chapter === selectedChapter && item.verse === verse
    );
    setVerseText(selectedVerseText ? selectedVerseText.verse_text_english : '');
    setVerseTextDevnagari(selectedVerseText ? selectedVerseText.verse_text_devnagari : '');
    setVerseTextEnglish(selectedVerseText ? selectedVerseText.verse_text_english : '');
    setSynonyms(selectedVerseText ? selectedVerseText.Synonyms : '');
    setTranslation(selectedVerseText ? selectedVerseText.Translation : '');
  }, [selectedChapter]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const navigateToUrl = (chapter, verse) => {
    const url = `https://vedabase.io/en/library/bg/${chapter}/${verse}/`;
    window.location.href = url;
  };

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        url: `https://vedabase.io/en/library/bg/${selectedChapter}/${selectedVerse}/`
      }).then(() => {
        navigateToUrl(selectedChapter, selectedVerse);
      })
      .catch(console.error);
    } else {
      setNotification('Share feature not supported on this browser.');
    }
  }, [selectedChapter, selectedVerse, verseText, translation]);

  const handleBookmark = useCallback(() => {
    if (!bookmarks.some((bookmark) => bookmark.chapter === selectedChapter && bookmark.verse === selectedVerse)) {
      const newBookmark = {
        chapter: selectedChapter,
        verse: selectedVerse,
        verse_text_english: verseText,
        translation: translation
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setNotification('Verse bookmarked!');
    } else {
      setNotification('This verse is already bookmarked!');
    }
  }, [bookmarks, selectedChapter, selectedVerse, verseText, translation]);

  const handleRemoveBookmark = useCallback((verse) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.chapter !== verse.chapter || bookmark.verse !== verse.verse
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setNotification('Bookmark removed!');
  }, [bookmarks]);

  const toggleSidePanel = () => {
    setIsSidePanelVisible(prevState => !prevState);
  };

  const handleViewBookmarks = () => {
    toggleSidePanel();
  };

  const handlePrevNext = useCallback((direction) => {
    const currentIndex = verses.findIndex(
      (item) => item.chapter === selectedChapter && item.verse === selectedVerse
    );
    if (currentIndex !== -1) {
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < verses.length) {
        const nextVerse = verses[newIndex];
        setSelectedVerse(nextVerse.verse);
        setVerseText(nextVerse.verse_text_english);
        setVerseTextDevnagari(nextVerse.verse_text_devnagari);
        setVerseTextEnglish(nextVerse.verse_text_english);
        setSynonyms(nextVerse.Synonyms);
        setTranslation(nextVerse.Translation);
      }
    }
  }, [verses, selectedChapter, selectedVerse]);

  const renderVerseDevnagari = () => {
    if (!verseTextDevnagari) return null;
    return verseTextDevnagari.split('\n').map((line, index) => (
      <p key={index} style={{ margin: '5px 0', fontWeight: 'bold' }}>
        {line}
      </p>
    ));
  };

  const renderSynonyms = () => {
    if (!synonyms) return null;
    const synonymsList = Array.isArray(synonyms) ? synonyms : [synonyms];
    return (
      <ul className="list-disc pl-6" style={{ fontWeight: 'bold' }}>
        {synonymsList.map((syn, index) => (
          <li className="mb-1" key={index}>{syn}</li>
        ))}
      </ul>
    );
  };

  const renderVerseEnglish = () => {
    if (!verseTextEnglish) return null;
    return verseTextEnglish.split('\n').map((line, index) => (
      <p key={index} style={{ margin: '5px 0', fontWeight: 'bold' }}>
        {line}
      </p>
    ));
  };

  return (
    <>
      <div className={darkMode ? 'dark-mode' : ''}>
        <div className="navbar">
          <div className="title">
            <h1>Bhagavad Gita</h1>
          </div>
          <div className="features">
            <button onClick={handleViewBookmarks}>
              <FontAwesomeIcon icon={isBookmarksVisible ? faTimes : faBook} />
            </button>
            <button onClick={toggleDarkMode}>
              <FontAwesomeIcon icon={darkMode ? faRegularMoon : faSolidMoon} />
            </button>
            {verseText && (
              <button onClick={handleShare}>
                <i className="fas fa-share"></i> Share Screenshot
              </button>
            )}
          </div>
        </div>
        <div className="searchchapterverse">
          <div className="search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                handleSearchChange(e);
                highlightSearchTerm(e.target.value);
              }}
              placeholder="Search verses..."
            />
            {matchedVerses.length > 0 && (
              <div>
                <h2>Matched Verses:</h2>
                <div>
                  {matchedVerses.map((verse, index) => (
                    <div key={index} onClick={() => {
                      setSelectedChapter(verse.chapter);
                      setSelectedVerse(verse.verse);
                      setVerseText(verse.text);
                    }}>
                      <strong>Chapter {verse.chapter}, Verse {verse.verse}:</strong> {verse.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="select">
            <select value={selectedChapter} onChange={handleChapterChange}>
              <option value="">Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>Chapter {chapter}</option>
              ))}
            </select>
            <select value={selectedVerse} onChange={handleVerseChange}>
              <option value="">Select Verse</option>
              {verses.map((verse) => (
                <option key={verse.verse} value={verse.verse}>Verse {verse.verse}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="lower">
          <div className="left">
            {(selectedChapter && selectedVerse) ? (
              <div>
                <h2>Chapter {selectedChapter} - Verse {selectedVerse}</h2>
                <button onClick={handleBookmark}>
                  <FontAwesomeIcon icon={bookmarks.some((bookmark) => bookmark.chapter === selectedChapter && bookmark.verse === selectedVerse) ? faSolidBookmark : faRegularBookmark} />
                </button>
                {notification && <div><strong>{notification}</strong></div>}
                <div>{renderVerseDevnagari()}</div>
                <div>{renderVerseEnglish()}</div>
              </div>
            ) : (
              <div>
                <h1>Welcome Krsna</h1>
                <div>
                  <h2>Hare Krsna Hare Krsna</h2>
                  <h2>Krsna Krsna Hare Hare</h2>
                  <h2>Hare Rama Hare Rama</h2>
                  <h2>Rama Rama Hare Hare</h2>
                  <h2> Nithyananda Gauranga Hare Krsna Hare Rama</h2>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <div>{renderSynonyms()}</div>
            <p>{translation}</p>
          </div>
          <div className="controls">
            {selectedVerse && (
              <div>
                <button onClick={() => handlePrevNext(-1)}>Previous</button>
                <button onClick={() => handlePrevNext(1)}>Next</button>
                <button onClick={() => navigateToUrl(selectedChapter, selectedVerse)}>Read More</button>
              </div>
            )}
          </div>
        </div>
        {isSidePanelVisible && (
          <div className="bookmarks-panel">
            <h3>Bookmarked Verses <FontAwesomeIcon icon={faTimes} /></h3>
            {bookmarks.length > 0 ? (
              <ul>
                {bookmarks.map((bookmark, index) => (
                  <li key={index}>
                    <div>
                      <strong>Chapter {bookmark.chapter}, Verse {bookmark.verse}:</strong> {bookmark.verse_text_english}
                    </div>
                    <button onClick={() => handleRemoveBookmark(bookmark)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No verses bookmarked.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerseDisplay;