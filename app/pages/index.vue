<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string('Please tell us what should we call you?'),
  email: z.email('What is your email addresss?'),
  telephone: z.string().optional(),
  help: z.string('Please tell us how can we help you?'),
  method: z.string('Please tell us how should we contact you?')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  telephone: undefined,
  help: undefined,
  method: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const req = await $fetch('/api/sendmail', {
      method: 'POST',
      body: {
        to: event.data.email,
        subject: 'Request Form',
        html: 'Thanks'
      }
    })
  } catch (err: any) {
    alert(err.message || 'Failed to send email')
  }

  toast.add({
    title: 'Form submitted',
    description:
      'The form has been submitted. We will contact you as soon as possible.',
    color: 'success'
  })

  console.log(event.data)
}
</script>

<template>
  <UPage>
    <UContainer>
      <div>Contact Form</div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" required />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" required />
        </UFormField>
        <UFormField label="Telephone" name="telephone">
          <UInput v-model="state.telephone" />
        </UFormField>
        <UFormField label="How do we help you?" name="help">
          <UInput v-model="state.help" />
        </UFormField>
        <UFormField label="How should we contact you?" name="method">
          <UInput v-model="state.method" />
        </UFormField>
        <UButton type="submit"> Submit </UButton>
      </UForm>
    </UContainer>
  </UPage>
</template>
