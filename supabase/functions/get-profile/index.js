const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    
    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profileError) throw profileError;

    // Track profile view if user is authenticated
    if (req.headers.authorization) {
      const { data: session } = await supabase.auth.getSession();
      if (session.session) {
        const { error: viewError } = await supabase
          .from('profile_views')
          .insert({
            profile_id: id,
            viewer_id: session.session.user.id
          });

        if (viewError) console.error('Error tracking profile view:', viewError);
      }
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
