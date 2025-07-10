const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function (req, res) {
  try {
    const { display_name, gravatar_email, bio } = req.body;
    
    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    // Update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        display_name,
        gravatar_email,
        bio,
        updated_at: new Date()
      })
      .eq('id', user.id)
      .select();

    if (updateError) throw updateError;

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
