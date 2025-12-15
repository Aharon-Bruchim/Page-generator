import { useState } from 'react';
import { DocumentProvider, useDocument } from './context/DocumentContext';
import { EditorPanel, DocumentBuilder, Preview, ExportButtons } from './components/ui';
import { useTheme } from './hooks';
import { themeToCSSVariables } from './themes';
import './App.css';

function AppContent() {
  const { document } = useDocument();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const { theme } = useTheme(document.stylePreset, document.colorMode);
  const cssVars = themeToCSSVariables(theme);

  const previewStyle: Record<string, string> = {};
  Object.entries(cssVars).forEach(([key, value]) => {
    previewStyle[key] = value;
  });

  return (
    <div className="app">
      <header className="app-header" role="banner">
        <h1 className="app-title">מחולל מסמכים ויזואלי</h1>
        <p className="app-subtitle">צור מסמכים מרשימים וייצא ל-HTML ו-PDF</p>
      </header>

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
    </div>
  );
}

function App() {
  return (
    <DocumentProvider>
      <AppContent />
    </DocumentProvider>
  );
}

export default App;
