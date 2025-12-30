import { Document } from '../types';

const API_BASE = '/api';

export interface DocumentListItem {
  name: string;
  path: string;
  sha: string;
  title?: string;
  createdAt?: string;
}

export interface DocumentWithMeta {
  document: Document;
  sha: string;
}

class DocumentsApiService {
  // List all saved documents
  async list(): Promise<DocumentListItem[]> {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error('Failed to fetch documents list');
    }
    return response.json();
  }

  // Get a single document by ID
  async get(documentId: string): Promise<DocumentWithMeta> {
    const response = await fetch(`${API_BASE}/${documentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }
    return response.json();
  }

  // Save a document (create or update)
  async save(document: Document, sha?: string): Promise<{ sha: string; path: string }> {
    const response = await fetch(`${API_BASE}/${document.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ document, sha }),
    });
    if (!response.ok) {
      throw new Error('Failed to save document');
    }
    return response.json();
  }

  // Delete a document
  async delete(documentId: string, sha: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sha }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
  }

  // Search documents by title (client-side filtering)
  async search(query: string): Promise<DocumentListItem[]> {
    const documents = await this.list();
    const lowerQuery = query.toLowerCase();
    return documents.filter(doc =>
      doc.name.toLowerCase().includes(lowerQuery)
    );
  }
}

export const documentsApi = new DocumentsApiService();
