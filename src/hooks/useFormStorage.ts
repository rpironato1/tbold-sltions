/**
 * Custom React Hook for Form Storage Integration
 * Provides easy-to-use form management with localStorage backup
 */

import { useState, useCallback } from 'react';
import { 
  storeFormData, 
  markFormAsSubmitted, 
  validateFormData, 
  convertToSupabaseFormat,
  type FormData 
} from '@/lib/formStorage';

interface SupabaseClient {
  from: (table: string) => {
    insert: (data: Record<string, unknown>[]) => Promise<{ data?: unknown; error?: Error }>;
  };
}

interface UseFormStorageOptions<T> {
  formType: T extends FormData ? T['formType'] : string;
  supabaseTable: string;
  supabaseClient: SupabaseClient;
  onSuccess?: (data: T) => void;
  onError?: (error: Error, isStorageError?: boolean) => void;
  onValidationError?: (data: T) => void;
}

export function useFormStorage<T extends Omit<FormData, 'id' | 'timestamp' | 'submittedToSupabase'>>(
  options: UseFormStorageOptions<T>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = useCallback(async (formData: Omit<T, 'formType'>) => {
    setIsSubmitting(true);

    const fullFormData = {
      formType: options.formType,
      ...formData
    } as unknown as T;

    // Validate form data
    if (!validateFormData(fullFormData as any)) {
      if (options.onValidationError) {
        options.onValidationError(fullFormData);
      }
      setIsSubmitting(false);
      return { success: false, error: 'Validation failed' };
    }

    // Store in localStorage first
    let formId: string;
    try {
      formId = storeFormData(fullFormData as any);
      console.log(`${options.formType} data stored in localStorage with ID:`, formId);
    } catch (error) {
      console.error(`Error storing ${options.formType} data locally:`, error);
      if (options.onError) {
        options.onError(error instanceof Error ? error : new Error('Storage failed'), true);
      }
      setIsSubmitting(false);
      return { success: false, error: 'Storage failed' };
    }

    // Convert to Supabase format and submit
    const supabaseData = convertToSupabaseFormat(fullFormData as any);
    const { data, error } = await options.supabaseClient
      .from(options.supabaseTable)
      .insert([supabaseData]);

    setIsSubmitting(false);

    if (error) {
      console.error(`Error submitting ${options.formType} to Supabase:`, error);
      if (options.onError) {
        options.onError(error, false);
      }
      return { success: false, error: error.message, formId };
    } else {
      // Mark as submitted in localStorage
      markFormAsSubmitted(formId);
      if (options.onSuccess) {
        options.onSuccess(fullFormData);
      }
      return { success: true, data, formId };
    }
  }, [options]);

  return {
    submitForm,
    isSubmitting
  };
}

/**
 * Hook specifically for contact forms
 */
export function useContactFormStorage(supabaseClient: SupabaseClient) {
  return useFormStorage({
    formType: 'contact' as const,
    supabaseTable: 'contacts',
    supabaseClient
  });
}

/**
 * Hook specifically for lead forms
 */
export function useLeadFormStorage(supabaseClient: SupabaseClient) {
  return useFormStorage({
    formType: 'lead' as const,
    supabaseTable: 'leads',
    supabaseClient
  });
}

/**
 * Hook specifically for briefing forms
 */
export function useBriefingFormStorage(supabaseClient: SupabaseClient) {
  return useFormStorage({
    formType: 'briefing' as const,
    supabaseTable: 'briefings',
    supabaseClient
  });
}