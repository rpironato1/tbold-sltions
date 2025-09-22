import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ contacts: 0, leads: 0, briefings: 0 });

  useEffect(() => {
    const fetchData = async () => {
      // Get the logged in user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Get the counts from the tables
      const { count: contacts } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { count: leads } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { count: briefings } = await supabase.from('briefings').select('*', { count: 'exact', head: true });

      setStats({
        contacts: contacts ?? 0,
        leads: leads ?? 0,
        briefings: briefings ?? 0,
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-turnbold-dark mb-2">
        Welcome, {user?.email?.split('@')[0] || 'Admin'}!
      </h1>
      <p className="text-gray-600 mb-8">Here is a summary of recent activities.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Received Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl md:text-4xl font-bold">{stats.contacts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Captured Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl md:text-4xl font-bold">{stats.leads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sent Briefings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl md:text-4xl font-bold">{stats.briefings}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;