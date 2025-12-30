import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDocument } from './context/DocumentContext';
import { EditorPanel, DocumentBuilder, Preview, ExportButtons, DocumentsManager, SmartPaste } from './components/ui';
import { useTheme } from './hooks';
import { themeToCSSVariables } from './themes';
import './App.css';

type AppMode = 'builder' | 'smart' | 'documents';

function App() {
  const { document } = useDocument();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [appMode, setAppMode] = useState<AppMode>('builder');
  const navigate = useNavigate();
  const { theme } = useTheme(document.stylePreset, document.colorMode);
  const cssVars = themeToCSSVariables(theme);

  const previewStyle: Record<string, string> = {};
  Object.entries(cssVars).forEach(([key, value]) => {
    previewStyle[key] = value;
  });

  const handleSaveSuccess = (documentId: string) => {
    navigate(`/document/${documentId}`);
  };

  const handleLoadDocument = () => {
    setAppMode('builder');
  };

  return (
    <div className="app">
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            direction: 'rtl',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <header className="app-header" role="banner">
        <div className="app-header-content">
          <div className="app-header-text">
            <h1 className="app-title">מחולל מסמכים ויזואלי</h1>
            <p className="app-subtitle">צור מסמכים מרשימים וייצא ל-HTML</p>
          </div>
          <nav className="app-nav">
            <button
              className={`nav-button ${appMode === 'smart' ? 'nav-active' : ''}`}
              onClick={() => setAppMode('smart')}
            >
              מחולל אוטומטי
            </button>
            <button
              className={`nav-button ${appMode === 'builder' ? 'nav-active' : ''}`}
              onClick={() => setAppMode('builder')}
            >
              הרגיל
            </button>
            <button
              className={`nav-button ${appMode === 'documents' ? 'nav-active' : ''}`}
              onClick={() => setAppMode('documents')}
            >
              המסמכים
            </button>
          </nav>
        </div>
      </header>

      {appMode === 'documents' ? (
        <div className="documents-wrapper">
          <DocumentsManager
            onClose={handleLoadDocument}
            onNewDocument={() => setAppMode('builder')}
            inline={true}
          />
        </div>
      ) : appMode === 'smart' ? (
        <div className="smart-paste-wrapper">
          <SmartPaste />
        </div>
      ) : (
        <div className="app-layout">
          <aside className="app-sidebar">
            <EditorPanel />
            <ExportButtons />
          </aside>

          <main className="app-main" role="main">
            <nav className="tab-nav" role="tablist" aria-label="תצוגת מסמך">
              <button
                role="tab"
                aria-selected={activeTab === 'edit'}
                aria-controls="panel-edit"
                id="tab-edit"
                className={`tab-button ${activeTab === 'edit' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                ✏️ עריכה
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'preview'}
                aria-controls="panel-preview"
                id="tab-preview"
                className={`tab-button ${activeTab === 'preview' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                👁️ תצוגה מקדימה
              </button>
            </nav>

            <div className="tab-content">
              <div
                id="panel-edit"
                role="tabpanel"
                aria-labelledby="tab-edit"
                hidden={activeTab !== 'edit'}
                className="tab-panel"
                style={previewStyle as React.CSSProperties}
              >
                <DocumentBuilder />
              </div>

              <div
                id="panel-preview"
                role="tabpanel"
                aria-labelledby="tab-preview"
                hidden={activeTab !== 'preview'}
                className="tab-panel tab-panel-preview"
              >
                <Preview />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
