/**
 * Form Storage Utility for TurnBold Solutions
 * Handles localStorage operations for all contact forms with Supabase compatibility
 */

export interface BaseFormData {
  id: string;
  formType: string;
  timestamp: string;
  submittedToSupabase: boolean;
  status?: 'new' | 'read' | 'responded' | 'archived';
  responses?: FormResponse[];
  [key: string]: string | boolean | FormResponse[] | undefined;
}

export interface FormResponse {
  id: string;
  timestamp: string;
  subject: string;
  message: string;
  sentTo: string;
}

export interface LeadFormData extends BaseFormData {
  formType: 'lead';
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormData extends BaseFormData {
  formType: 'contact';
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

export interface BriefingFormData extends BaseFormData {
  formType: 'briefing';
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features: string;
  integrations: string;
}

export interface UserSessionData extends BaseFormData {
  formType: 'session';
  email: string;
  lastLogin?: string;
  rememberMe: boolean;
}

export type FormData = LeadFormData | ContactFormData | BriefingFormData | UserSessionData;

const STORAGE_KEYS = {
  FORMS: 'turnbold_forms',
  SETTINGS: 'turnbold_form_settings'
} as const;

/**
 * Generates a unique ID for form entries
 */
function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `tb_${timestamp}_${randomStr}`;
}

/**
 * Gets all stored forms from localStorage
 */
export function getAllStoredForms(): FormData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FORMS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading forms from localStorage:', error);
    return [];
  }
}

/**
 * Stores form data in localStorage with unique ID and timestamp
 */
export function storeFormData<T extends Omit<FormData, 'id' | 'timestamp' | 'submittedToSupabase' | 'status' | 'responses'>>(
  formData: T
): string {
  try {
    const currentForms = getAllStoredForms();
    const newFormData: FormData = {
      ...formData,
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      submittedToSupabase: false,
      status: 'new',
      responses: []
    } as FormData;

    currentForms.push(newFormData);
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(currentForms));
    
    console.log(`Form data stored with ID: ${newFormData.id}`);
    return newFormData.id;
  } catch (error) {
    console.error('Error storing form data:', error);
    throw new Error('Failed to store form data');
  }
}

/**
 * Updates a stored form to mark it as submitted to Supabase
 */
export function markFormAsSubmitted(formId: string): void {
  try {
    const currentForms = getAllStoredForms();
    const formIndex = currentForms.findIndex(form => form.id === formId);
    
    if (formIndex !== -1) {
      currentForms[formIndex].submittedToSupabase = true;
      localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(currentForms));
      console.log(`Form ${formId} marked as submitted to Supabase`);
    }
  } catch (error) {
    console.error('Error updating form submission status:', error);
  }
}

/**
 * Gets forms by type
 */
export function getFormsByType<T extends FormData>(type: T['formType']): T[] {
  const allForms = getAllStoredForms();
  return allForms.filter(form => form.formType === type) as T[];
}

/**
 * Gets unsubmitted forms (for dashboard integration)
 */
export function getUnsubmittedForms(): FormData[] {
  const allForms = getAllStoredForms();
  return allForms.filter(form => !form.submittedToSupabase);
}

/**
 * Converts stored form data to Supabase format
 */
export function convertToSupabaseFormat(formData: FormData): Record<string, unknown> {
  const { id, formType, timestamp, submittedToSupabase, ...supabaseData } = formData;
  
  // Convert projectType to project_type for briefings (Supabase naming convention)
  if (formType === 'briefing' && 'projectType' in supabaseData) {
    const { projectType, ...rest } = supabaseData;
    return { ...rest, project_type: projectType };
  }
  
  return supabaseData;
}

/**
 * Clears all stored forms (for testing or user request)
 */
export function clearAllStoredForms(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.FORMS);
    console.log('All stored forms cleared');
  } catch (error) {
    console.error('Error clearing stored forms:', error);
  }
}

/**
 * Gets storage statistics
 */
export function getStorageStats() {
  const forms = getAllStoredForms();
  const byType = forms.reduce((acc, form) => {
    acc[form.formType] = (acc[form.formType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: forms.length,
    submitted: forms.filter(f => f.submittedToSupabase).length,
    pending: forms.filter(f => !f.submittedToSupabase).length,
    byType
  };
}

/**
 * Validates form data before storage
 */
export function validateFormData(formData: Record<string, unknown>): boolean {
  if (!formData || typeof formData !== 'object') return false;
  if (!formData.formType || typeof formData.formType !== 'string') return false;
  
  // Basic validation for required fields based on form type
  switch (formData.formType) {
    case 'lead':
      return !!(formData.name && formData.email && formData.phone && formData.message);
    case 'contact':
      return !!(formData.name && formData.email && formData.phone && formData.subject && formData.message);
    case 'briefing':
      return !!(formData.name && formData.email && formData.phone && formData.company);
    case 'session':
      return !!(formData.email);
    default:
      return false;
  }
}

/**
 * Saves user session data for login persistence
 */
export function saveUserSession(email: string, rememberMe: boolean): string {
  const sessionData: Omit<UserSessionData, 'id' | 'timestamp' | 'submittedToSupabase'> = {
    formType: 'session',
    email,
    lastLogin: new Date().toISOString(),
    rememberMe
  };
  
  return storeFormData(sessionData);
}

/**
 * Gets the last user session
 */
export function getLastUserSession(): UserSessionData | null {
  const sessions = getFormsByType<UserSessionData>('session');
  if (sessions.length === 0) return null;
  
  // Return the most recent session
  return sessions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
}

/**
 * Updates form status for customer service management
 */
export function updateFormStatus(formId: string, status: 'new' | 'read' | 'responded' | 'archived'): void {
  try {
    const currentForms = getAllStoredForms();
    const formIndex = currentForms.findIndex(form => form.id === formId);
    
    if (formIndex !== -1) {
      currentForms[formIndex].status = status;
      localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(currentForms));
      console.log(`Form ${formId} status updated to: ${status}`);
    }
  } catch (error) {
    console.error('Error updating form status:', error);
  }
}

/**
 * Adds a response to a form for customer service tracking
 */
export function addFormResponse(formId: string, subject: string, message: string, sentTo: string): void {
  try {
    const currentForms = getAllStoredForms();
    const formIndex = currentForms.findIndex(form => form.id === formId);
    
    if (formIndex !== -1) {
      const form = currentForms[formIndex];
      if (!form.responses) {
        form.responses = [];
      }
      
      const response: FormResponse = {
        id: generateUniqueId(),
        timestamp: new Date().toISOString(),
        subject,
        message,
        sentTo
      };
      
      form.responses.push(response);
      form.status = 'responded';
      
      localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(currentForms));
      console.log(`Response added to form ${formId}`);
    }
  } catch (error) {
    console.error('Error adding form response:', error);
  }
}

/**
 * Gets forms filtered by status and search term for customer service dashboard
 */
export function getFilteredForms(
  searchTerm: string = '',
  statusFilter: string = 'all',
  originFilter: string = 'all'
): FormData[] {
  const allForms = getAllStoredForms();
  
  return allForms.filter(form => {
    // Exclude session forms from customer service view
    if (form.formType === 'session') return false;
    
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      form.name?.toLowerCase().includes(searchLower) ||
      form.email?.toLowerCase().includes(searchLower) ||
      (form.company && form.company.toLowerCase().includes(searchLower));
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
    
    // Origin filter
    const matchesOrigin = originFilter === 'all' || form.formType === originFilter;
    
    return matchesSearch && matchesStatus && matchesOrigin;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Gets customer service statistics
 */
export function getCustomerServiceStats() {
  const forms = getAllStoredForms().filter(f => f.formType !== 'session');
  
  const statusCounts = forms.reduce((acc, form) => {
    const status = form.status || 'new';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const originCounts = forms.reduce((acc, form) => {
    acc[form.formType] = (acc[form.formType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: forms.length,
    new: statusCounts.new || 0,
    read: statusCounts.read || 0,
    responded: statusCounts.responded || 0,
    archived: statusCounts.archived || 0,
    byOrigin: originCounts
  };
}