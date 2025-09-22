/**
 * Test utility for localStorage form functionality
 * This file demonstrates how the localStorage system works
 */

import { 
  storeFormData, 
  getAllStoredForms, 
  getStorageStats, 
  markFormAsSubmitted,
  getUnsubmittedForms,
  convertToSupabaseFormat,
  validateFormData
} from '@/lib/formStorage';

// Test data examples
const testLeadData = {
  formType: 'lead' as const,
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '+55 11 99999-9999',
  message: 'Gostaria de mais informações sobre os serviços'
};

const testContactData = {
  formType: 'contact' as const,
  name: 'Maria Santos',
  email: 'maria.santos@empresa.com',
  phone: '+55 11 88888-8888',
  company: 'Tech Solutions Ltda',
  subject: 'Proposta de Parceria',
  message: 'Interessados em uma parceria estratégica',
  interest: 'partnership'
};

const testBriefingData = {
  formType: 'briefing' as const,
  name: 'Carlos Oliveira',
  email: 'carlos@startup.com',
  phone: '+55 11 77777-7777',
  company: 'Startup Inovadora',
  projectType: 'web-application',
  budget: '50000-100000',
  timeline: '3-6-months',
  description: 'Sistema de gestão completo para nossa empresa',
  features: 'Dashboard, relatórios, integração API',
  integrations: 'ERP, CRM, sistemas legados'
};

export function runLocalStorageTests() {
  console.log('🚀 Testing TurnBold Solutions Form Storage System');
  console.log('='.repeat(50));

  // Clear any existing data for clean test
  localStorage.removeItem('turnbold_forms');

  try {
    // Test 1: Store different types of forms
    console.log('📝 Test 1: Storing different form types');
    
    const leadId = storeFormData(testLeadData);
    console.log(`✅ Lead form stored with ID: ${leadId}`);
    
    const contactId = storeFormData(testContactData);
    console.log(`✅ Contact form stored with ID: ${contactId}`);
    
    const briefingId = storeFormData(testBriefingData);
    console.log(`✅ Briefing form stored with ID: ${briefingId}`);

    // Test 2: Retrieve and display stored data
    console.log('\n📊 Test 2: Retrieving stored data');
    const allForms = getAllStoredForms();
    console.log(`Total forms stored: ${allForms.length}`);
    allForms.forEach(form => {
      console.log(`- ${form.formType} (${form.id}): ${form.submittedToSupabase ? 'Synced' : 'Pending'}`);
    });

    // Test 3: Storage statistics
    console.log('\n📈 Test 3: Storage statistics');
    const stats = getStorageStats();
    console.log(`Total: ${stats.total}, Submitted: ${stats.submitted}, Pending: ${stats.pending}`);
    console.log('By type:', stats.byType);

    // Test 4: Validation
    console.log('\n✅ Test 4: Data validation');
    console.log(`Lead data valid: ${validateFormData(testLeadData)}`);
    console.log(`Contact data valid: ${validateFormData(testContactData)}`);
    console.log(`Briefing data valid: ${validateFormData(testBriefingData)}`);
    
    // Test invalid data
    const invalidData = { formType: 'lead', name: 'Test' }; // Missing required fields
    console.log(`Invalid data valid: ${validateFormData(invalidData)}`);

    // Test 5: Supabase format conversion
    console.log('\n🔄 Test 5: Supabase format conversion');
    const leadSupabaseFormat = convertToSupabaseFormat(allForms.find(f => f.formType === 'lead')!);
    console.log('Lead Supabase format:', leadSupabaseFormat);
    
    const briefingSupabaseFormat = convertToSupabaseFormat(allForms.find(f => f.formType === 'briefing')!);
    console.log('Briefing Supabase format (note project_type):', briefingSupabaseFormat);

    // Test 6: Mark as submitted
    console.log('\n📤 Test 6: Marking forms as submitted');
    markFormAsSubmitted(leadId);
    console.log(`Lead form ${leadId} marked as submitted`);
    
    const updatedStats = getStorageStats();
    console.log(`Updated stats - Submitted: ${updatedStats.submitted}, Pending: ${updatedStats.pending}`);

    // Test 7: Get unsubmitted forms
    console.log('\n⏳ Test 7: Unsubmitted forms');
    const unsubmitted = getUnsubmittedForms();
    console.log(`Unsubmitted forms: ${unsubmitted.length}`);
    unsubmitted.forEach(form => {
      console.log(`- ${form.formType} (${form.id})`);
    });

    console.log('\n🎉 All tests completed successfully!');
    console.log('Check localStorage in browser DevTools to see stored data');
    
    return {
      success: true,
      totalForms: allForms.length,
      stats: getStorageStats()
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function displayStorageContents() {
  console.log('📋 Current localStorage contents:');
  console.log('='.repeat(30));
  
  const forms = getAllStoredForms();
  if (forms.length === 0) {
    console.log('No forms stored');
    return;
  }

  forms.forEach((form, index) => {
    console.log(`\n${index + 1}. ${form.formType.toUpperCase()} FORM`);
    console.log(`   ID: ${form.id}`);
    console.log(`   Timestamp: ${new Date(form.timestamp).toLocaleString()}`);
    console.log(`   Status: ${form.submittedToSupabase ? '✅ Synced' : '⏳ Pending'}`);
    
    if ('name' in form) console.log(`   Name: ${form.name}`);
    if ('email' in form) console.log(`   Email: ${form.email}`);
    if ('phone' in form) console.log(`   Phone: ${form.phone}`);
    if ('company' in form) console.log(`   Company: ${form.company}`);
    if ('subject' in form) console.log(`   Subject: ${form.subject}`);
    if ('message' in form) console.log(`   Message: ${form.message.substring(0, 50)}...`);
  });

  console.log(`\n📊 Summary: ${forms.length} forms stored`);
  const stats = getStorageStats();
  console.log(`   - Submitted to Supabase: ${stats.submitted}`);
  console.log(`   - Pending sync: ${stats.pending}`);
}

// Export functions for use in console or components
export const formStorageTest = {
  runTests: runLocalStorageTests,
  displayContents: displayStorageContents,
  clearAll: () => {
    localStorage.removeItem('turnbold_forms');
    console.log('🗑️ All stored forms cleared');
  }
};

// Make available globally for easy testing
if (typeof window !== 'undefined') {
  (window as Record<string, unknown>).formStorageTest = formStorageTest;
}