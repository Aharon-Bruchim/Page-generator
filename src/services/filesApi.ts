const API_BASE = '/api';

export interface FileListItem {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  sha: string;
  uploadedAt: string;
  path: string;
  type: 'uploaded-file';
}

export interface UploadedFile {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  content: string;
  uploadedAt: string;
}

export interface FileWithMeta {
  file: UploadedFile;
  sha: string;
}

class FilesApiService {
  async list(): Promise<FileListItem[]> {
    const response = await fetch(`${API_BASE}/files`);
    if (!response.ok) {
      throw new Error('Failed to fetch files list');
    }
    return response.json();
  }

  async get(fileId: string): Promise<FileWithMeta> {
    const response = await fetch(`${API_BASE}/files/${fileId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    return response.json();
  }

  async upload(file: UploadedFile, sha?: string): Promise<{ sha: string; path: string; id: string }> {
    const response = await fetch(`${API_BASE}/files/${file.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file, sha }),
    });
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    return response.json();
  }

  async delete(fileId: string, sha: string): Promise<void> {
    const response = await fetch(`${API_BASE}/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sha }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  }
}

export const filesApi = new FilesApiService();
