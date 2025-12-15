import { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { Document, Page, Section, createDocument, createPage, createSection, SectionType, StylePreset, ColorMode } from '../types';

interface DocumentState {
  document: Document;
  currentPageIndex: number;
}

type DocumentAction =
  | { type: 'SET_DOCUMENT'; payload: Document }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'ADD_PAGE'; payload?: string }
  | { type: 'REMOVE_PAGE'; payload: string }
  | { type: 'RENAME_PAGE'; payload: { id: string; title: string } }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'MOVE_PAGE'; payload: { id: string; direction: 'up' | 'down' } }
  | { type: 'ADD_SECTION'; payload: SectionType }
  | { type: 'UPDATE_SECTION'; payload: Section }
  | { type: 'REMOVE_SECTION'; payload: string }
  | { type: 'MOVE_SECTION'; payload: { id: string; direction: 'up' | 'down' } }
  | { type: 'SET_STYLE_PRESET'; payload: StylePreset }
  | { type: 'SET_COLOR_MODE'; payload: ColorMode }
  | { type: 'RESET' };

const initialState: DocumentState = {
  document: createDocument(),
  currentPageIndex: 0,
};

function documentReducer(state: DocumentState, action: DocumentAction): DocumentState {
  const { document, currentPageIndex } = state;
  const currentPage = document.pages[currentPageIndex];

  switch (action.type) {
    case 'SET_DOCUMENT':
      return { document: action.payload, currentPageIndex: 0 };

    case 'SET_TITLE':
      return {
        ...state,
        document: { ...document, title: action.payload },
      };

    case 'ADD_PAGE': {
      const newPage = createPage(action.payload || `דף ${document.pages.length + 1}`);
      return {
        ...state,
        document: {
          ...document,
          pages: [...document.pages, newPage],
        },
        currentPageIndex: document.pages.length,
      };
    }

    case 'REMOVE_PAGE': {
      if (document.pages.length <= 1) return state;
      const newPages = document.pages.filter(p => p.id !== action.payload);
      const newIndex = Math.min(currentPageIndex, newPages.length - 1);
      return {
        ...state,
        document: { ...document, pages: newPages },
        currentPageIndex: newIndex,
      };
    }

    case 'RENAME_PAGE': {
      return {
        ...state,
        document: {
          ...document,
          pages: document.pages.map(p =>
            p.id === action.payload.id ? { ...p, title: action.payload.title } : p
          ),
        },
      };
    }

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPageIndex: Math.max(0, Math.min(action.payload, document.pages.length - 1)),
      };

    case 'MOVE_PAGE': {
      const { id, direction } = action.payload;
      const pages = [...document.pages];
      const index = pages.findIndex(p => p.id === id);

      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === pages.length - 1)
      ) {
        return state;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const [removed] = pages.splice(index, 1);
      pages.splice(newIndex, 0, removed);

      return {
        ...state,
        document: { ...document, pages },
        currentPageIndex: newIndex,
      };
    }

    case 'ADD_SECTION': {
      const newSection = createSection(action.payload);
      const updatedPages = document.pages.map((page, idx) =>
        idx === currentPageIndex
          ? { ...page, sections: [...page.sections, newSection] }
          : page
      );
      return {
        ...state,
        document: { ...document, pages: updatedPages },
      };
    }

    case 'UPDATE_SECTION': {
      const updatedPages = document.pages.map((page, idx) =>
        idx === currentPageIndex
          ? {
              ...page,
              sections: page.sections.map(section =>
                section.id === action.payload.id ? action.payload : section
              ),
            }
          : page
      );
      return {
        ...state,
        document: { ...document, pages: updatedPages },
      };
    }

    case 'REMOVE_SECTION': {
      const updatedPages = document.pages.map((page, idx) =>
        idx === currentPageIndex
          ? {
              ...page,
              sections: page.sections.filter(section => section.id !== action.payload),
            }
          : page
      );
      return {
        ...state,
        document: { ...document, pages: updatedPages },
      };
    }

    case 'MOVE_SECTION': {
      const { id, direction } = action.payload;
      const sections = [...currentPage.sections];
      const index = sections.findIndex(s => s.id === id);

      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === sections.length - 1)
      ) {
        return state;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const [removed] = sections.splice(index, 1);
      sections.splice(newIndex, 0, removed);

      const updatedPages = document.pages.map((page, idx) =>
        idx === currentPageIndex ? { ...page, sections } : page
      );

      return {
        ...state,
        document: { ...document, pages: updatedPages },
      };
    }

    case 'SET_STYLE_PRESET':
      return {
        ...state,
        document: { ...document, stylePreset: action.payload },
      };

    case 'SET_COLOR_MODE':
      return {
        ...state,
        document: { ...document, colorMode: action.payload },
      };

    case 'RESET':
      return { document: createDocument(), currentPageIndex: 0 };

    default:
      return state;
  }
}

interface DocumentContextValue {
  document: Document;
  currentPageIndex: number;
  currentPage: Page;
  setTitle: (title: string) => void;
  addPage: (title?: string) => void;
  removePage: (id: string) => void;
  renamePage: (id: string, title: string) => void;
  setCurrentPage: (index: number) => void;
  movePage: (id: string, direction: 'up' | 'down') => void;
  addSection: (type: SectionType) => void;
  updateSection: (section: Section) => void;
  removeSection: (id: string) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  setStylePreset: (preset: StylePreset) => void;
  setColorMode: (mode: ColorMode) => void;
  reset: () => void;
}

const DocumentContext = createContext<DocumentContextValue | null>(null);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  const value = useMemo(
    () => ({
      document: state.document,
      currentPageIndex: state.currentPageIndex,
      currentPage: state.document.pages[state.currentPageIndex],
      setTitle: (title: string) => dispatch({ type: 'SET_TITLE', payload: title }),
      addPage: (title?: string) => dispatch({ type: 'ADD_PAGE', payload: title }),
      removePage: (id: string) => dispatch({ type: 'REMOVE_PAGE', payload: id }),
      renamePage: (id: string, title: string) => dispatch({ type: 'RENAME_PAGE', payload: { id, title } }),
      setCurrentPage: (index: number) => dispatch({ type: 'SET_CURRENT_PAGE', payload: index }),
      movePage: (id: string, direction: 'up' | 'down') =>
        dispatch({ type: 'MOVE_PAGE', payload: { id, direction } }),
      addSection: (type: SectionType) => dispatch({ type: 'ADD_SECTION', payload: type }),
      updateSection: (section: Section) => dispatch({ type: 'UPDATE_SECTION', payload: section }),
      removeSection: (id: string) => dispatch({ type: 'REMOVE_SECTION', payload: id }),
      moveSection: (id: string, direction: 'up' | 'down') =>
        dispatch({ type: 'MOVE_SECTION', payload: { id, direction } }),
      setStylePreset: (preset: StylePreset) =>
        dispatch({ type: 'SET_STYLE_PRESET', payload: preset }),
      setColorMode: (mode: ColorMode) => dispatch({ type: 'SET_COLOR_MODE', payload: mode }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    [state.document, state.currentPageIndex]
  );

  return (
    <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}
