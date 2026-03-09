const request = require('supertest');

const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL

describe('API Endpoints', () => {
  // Posts endpoints
  describe('Posts', () => {
    it('should fetch list of posts', async () => {
      const res = await request(API_BASE_URL).get('/posts');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fetch a single post by id', async () => {
      const postId = 1; // Use a valid post id
      const res = await request(API_BASE_URL).get(`/posts/${postId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', postId);
    });

    it('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post.',
        author_id: 1,
        published: true,
      };
      const res = await request(API_BASE_URL)
        .post('/posts')
        .send(newPost);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(newPost.title);
    });

    it('should delete a post by id', async () => {
      const postIdToDelete = 2; // Use a valid post id
      const res = await request(API_BASE_URL).delete(`/posts/${postIdToDelete}`);
      expect(res.statusCode).toEqual(204);
    });
  });

  // Destinations endpoints
  describe('Destinations', () => {
    it('should fetch list of destinations', async () => {
      const res = await request(API_BASE_URL).get('/destinations');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Experiences endpoints
  describe('Experiences', () => {
    it('should fetch list of experiences', async () => {
      const res = await request(API_BASE_URL).get('/experiences');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // User authentication endpoints
  describe('Auth', () => {
    it('should login user', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };
      const res = await request(API_BASE_URL)
        .post('/auth/login')
        .send(credentials);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should register user', async () => {
      const newUser = {
        email: 'newuser@example.com',
        password: 'password123',
        full_name: 'New User',
      };
      const res = await request(API_BASE_URL)
        .post('/auth/register')
        .send(newUser);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });
});
