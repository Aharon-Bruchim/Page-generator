// Netlify Function for GitHub API operations
// This keeps the GitHub token secure on the server side

const GITHUB_REPO = 'Aharon-Bruchim/page-generator-docs';
const GITHUB_API = 'https://api.github.com';
const DOCUMENTS_PATH = 'documents';

// Get token from environment variable
const getToken = () => process.env.GITHUB_TOKEN;

// Helper to make GitHub API requests
async function githubRequest(endpoint, options = {}) {
  const token = getToken();
  if (!token) {
    throw new Error('GitHub token not configured');
  }

  const url = `${GITHUB_API}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }

  return response.json();
}

// List all documents with titles
async function listDocuments() {
  try {
    const data = await githubRequest(`/repos/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}`);

    // Filter only JSON files
    const jsonFiles = data.filter(file => file.name.endsWith('.json') && file.name !== 'index.json');

    // Fetch each document to get the title (in parallel)
    const documents = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const fileData = await githubRequest(`/repos/${GITHUB_REPO}/contents/${file.path}`);
          const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
          const doc = JSON.parse(content);
          return {
            name: file.name.replace('.json', ''),
            title: doc.title || file.name.replace('.json', ''),
            path: file.path,
            sha: file.sha,
          };
        } catch (e) {
          // If we can't read the file, return just the name
          return {
            name: file.name.replace('.json', ''),
            title: file.name.replace('.json', ''),
            path: file.path,
            sha: file.sha,
          };
        }
      })
    );

    return documents;
  } catch (error) {
    // If any error occurs (directory doesn't exist, repo is empty, etc.), return empty array
    console.log('listDocuments error:', error.message);
    return [];
  }
}

// Get a single document
async function getDocument(documentId) {
  const path = `${DOCUMENTS_PATH}/${documentId}.json`;
  const data = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`);

  // Decode base64 content
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return {
    document: JSON.parse(content),
    sha: data.sha,
  };
}

// Save a document (create or update)
async function saveDocument(documentId, document, sha = null) {
  const path = `${DOCUMENTS_PATH}/${documentId}.json`;
  const content = Buffer.from(JSON.stringify(document, null, 2)).toString('base64');

  // If no SHA provided, try to get it (file might already exist)
  let fileSha = sha;
  if (!fileSha) {
    try {
      const existing = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`);
      fileSha = existing.sha;
    } catch (e) {
      // File doesn't exist, that's ok - it will be created
    }
  }

  const body = {
    message: `${fileSha ? 'Update' : 'Create'} document: ${document.title || documentId}`,
    content,
    branch: 'main',
  };

  // If we have a SHA, it's an update
  if (fileSha) {
    body.sha = fileSha;
  }

  const data = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  return {
    sha: data.content.sha,
    path: data.content.path,
  };
}

// Delete a document
async function deleteDocument(documentId, sha) {
  const path = `${DOCUMENTS_PATH}/${documentId}.json`;

  await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `Delete document: ${documentId}`,
      sha,
      branch: 'main',
    }),
  });

  return { success: true };
}

// Main handler
exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const path = event.path
      .replace('/.netlify/functions/github-api', '')
      .replace('/api', '');
    const segments = path.split('/').filter(Boolean);
    const method = event.httpMethod;

    // Route: GET / - List all documents
    if (method === 'GET' && segments.length === 0) {
      const documents = await listDocuments();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(documents),
      };
    }

    // Route: GET /:id - Get a single document
    if (method === 'GET' && segments.length === 1) {
      const documentId = segments[0];
      const result = await getDocument(documentId);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    // Route: PUT /:id - Save/update a document
    if (method === 'PUT' && segments.length === 1) {
      const documentId = segments[0];
      const body = JSON.parse(event.body);
      const result = await saveDocument(documentId, body.document, body.sha);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    // Route: DELETE /:id - Delete a document
    if (method === 'DELETE' && segments.length === 1) {
      const documentId = segments[0];
      const body = JSON.parse(event.body);
      const result = await deleteDocument(documentId, body.sha);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
