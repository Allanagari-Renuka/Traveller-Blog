const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

describe('Supabase API Tests', () => {
  let createdPostId = null;

  test('Fetch posts', async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .limit(10);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  test('Create a new post', async () => {
    const newPost = {
      title: 'Test Post from API Test',
      excerpt: 'This is a test excerpt',
      content: 'This is test content',
      published: true,
      author_id: 'test-author-id', // Replace with valid author id if needed
      country: 'Testland',
      destination: 'Test Destination',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toHaveProperty('id');
    createdPostId = data.id;
  });

  test('Fetch single post by id', async () => {
    if (!createdPostId) {
      return;
    }
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', createdPostId)
      .single();

    expect(error).toBeNull();
    expect(data).toHaveProperty('id', createdPostId);
  });

  test('Update post', async () => {
    if (!createdPostId) {
      return;
    }
    const { data, error } = await supabase
      .from('posts')
      .update({ title: 'Updated Test Post Title' })
      .eq('id', createdPostId)
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toHaveProperty('title', 'Updated Test Post Title');
  });

  test('Delete post', async () => {
    if (!createdPostId) {
      return;
    }
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', createdPostId);

    expect(error).toBeNull();
  });
});
