/**
 * Dashboard component to manage stored forms
 * This component will be used in the dashboard to view and manage stored form data
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getAllStoredForms, 
  getStorageStats, 
  getUnsubmittedForms, 
  markFormAsSubmitted, 
  clearAllStoredForms,
  convertToSupabaseFormat,
  type FormData 
} from '@/lib/formStorage';
import { supabase } from '@/integrations/supabase/client';
import { 
  Send, 
  Download, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Users,
  Mail,
  Briefcase
} from '@/components/icons';

const FormStorageManager = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getStorageStats>>({
    total: 0,
    submitted: 0,
    pending: 0,
    byType: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allForms = getAllStoredForms();
    const storageStats = getStorageStats();
    setForms(allForms);
    setStats(storageStats);
  };

  const handleSyncAllPending = async () => {
    setIsSubmitting(true);
    const pendingForms = getUnsubmittedForms();
    let successCount = 0;
    let errorCount = 0;

    for (const form of pendingForms) {
      try {
        const supabaseData = convertToSupabaseFormat(form);
        let tableName = '';
        
        switch (form.formType) {
          case 'lead':
            tableName = 'leads';
            break;
          case 'contact':
            tableName = 'contacts';
            break;
          case 'briefing':
            tableName = 'briefings';
            break;
          case 'session':
            continue; // Skip session data
        }

        const { error } = await supabase
          .from(tableName)
          .insert([supabaseData]);

        if (!error) {
          markFormAsSubmitted(form.id);
          successCount++;
        } else {
          console.error(`Error syncing form ${form.id}:`, error);
          errorCount++;
        }
      } catch (error) {
        console.error(`Error processing form ${form.id}:`, error);
        errorCount++;
      }
    }

    setIsSubmitting(false);
    loadData();
    
    alert(`Synchronization complete!\nSuccess: ${successCount}\nErrors: ${errorCount}`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all stored forms? This action cannot be undone.')) {
      clearAllStoredForms();
      loadData();
      alert('All stored forms have been cleared.');
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(forms, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `turnbold-forms-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFormIcon = (formType: string) => {
    switch (formType) {
      case 'lead': return <Users className="w-4 h-4" />;
      case 'contact': return <Mail className="w-4 h-4" />;
      case 'briefing': return <Briefcase className="w-4 h-4" />;
      case 'session': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getFormColor = (formType: string) => {
    switch (formType) {
      case 'lead': return 'bg-blue-500';
      case 'contact': return 'bg-green-500';
      case 'briefing': return 'bg-purple-500';
      case 'session': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Forms</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actions</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={handleSyncAllPending} disabled={isSubmitting || stats.pending === 0}>
                    <Send className="w-3 h-3 mr-1" />
                    Sync
                  </Button>
                </div>
              </div>
              <AlertCircle className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Stored Forms
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToJSON}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="destructive" size="sm" onClick={handleClearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Manage all forms stored locally with Supabase synchronization status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {forms.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No stored forms found.</p>
          ) : (
            <div className="space-y-4">
              {forms.reverse().map((form) => (
                <div key={form.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded ${getFormColor(form.formType)} text-white`}>
                        {getFormIcon(form.formType)}
                      </div>
                      <div>
                        <h4 className="font-semibold capitalize">{form.formType} Form</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(form.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={form.submittedToSupabase ? "default" : "destructive"}>
                      {form.submittedToSupabase ? "Synced" : "Pending"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    {'name' in form && (
                      <div>
                        <span className="font-medium">Name:</span> {form.name}
                      </div>
                    )}
                    {'email' in form && (
                      <div>
                        <span className="font-medium">Email:</span> {form.email}
                      </div>
                    )}
                    {'phone' in form && (
                      <div>
                        <span className="font-medium">Phone:</span> {form.phone}
                      </div>
                    )}
                    {'company' in form && (
                      <div>
                        <span className="font-medium">Company:</span> {form.company}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-400">
                    ID: {form.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormStorageManager;