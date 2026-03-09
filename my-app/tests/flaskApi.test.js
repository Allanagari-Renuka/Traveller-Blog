const request = require('supertest');

const API_BASE_URL = 'http://localhost:5000'; // Flask default port

describe('Flask API Endpoints', () => {
  let createdPostId = null;

  test('should fetch list of posts', async () => {
    const res = await request(API_BASE_URL).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should create a new post', async () => {
    const newPost = {
      title: 'Test Post from API Test',
      excerpt: 'This is a test excerpt',
      content: 'This is test content',
      published: true,
      author_id: 'test-author-id',
      country: 'Testland',
      destination: 'Test Destination',
      created_at: new Date().toISOString(),
    };
    const res = await request(API_BASE_URL).post('/posts').send(newPost);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdPostId = res.body.id;
  });

  test('should fetch a single post by id', async () => {
    if (!createdPostId) return;
    const res = await request(API_BASE_URL).get(`/posts/${createdPostId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdPostId);
  });

  test('should update a post', async () => {
    if (!createdPostId) return;
    const res = await request(API_BASE_URL)
      .put(`/posts/${createdPostId}`)
      .send({ title: 'Updated Test Post Title' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Post Title');
  });

  test('should delete a post', async () => {
    if (!createdPostId) return;
    const res = await request(API_BASE_URL).delete(`/posts/${createdPostId}`);
    expect(res.statusCode).toEqual(204);
  });
});
