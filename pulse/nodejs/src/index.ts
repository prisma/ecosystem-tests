import { PrismaClient } from '@prisma/client'
import { PulseCreateEvent, PulseUpdateEvent, PulseDeleteEvent, withPulse } from '@prisma/extension-pulse'

process.env['PULSE_API_KEY'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNGEwNDkwYTktNjRiNC00YjNlLTk4YTMtZjQ0YTIzMDZlYTJiIiwidGVuYW50X2lkIjoiNTUwZjFiYmU2MmU4NDhhMjZmOTIwMTMwOWUwNzE4M2NlMDVhYWZhMjIxOTBhZmI2MmE0NTM5MTZjZmY3NGM4NiIsImludGVybmFsX3NlY3JldCI6IjY3YTg1MDk4LWUzYTYtNDBiZS1hMWFjLTc1NmY1N2E4NGZhZiJ9.PQ_pnmT8cTztz5rJLIyjr5DGK8yj7CeXKlfDczBw_aM'

export async function main() {
  const prisma = new PrismaClient().$extends(
    withPulse({
      apiKey: process.env['PULSE_API_KEY']!,
    }),
  )

  // Subscribe to the user model for all events
  const subscription = await prisma.user.subscribe({})
  if (subscription instanceof Error) {
    throw subscription
  }

  // sleep for a bit to make sure the subscription is active
  await new Promise((r) => setTimeout(r, 1_000))

  // Create a user
  const email = new Date().toISOString()

  // Stop the subscription after x seconds
  setTimeout(() => {
    console.info('Stopping the subscription...')
    subscription.stop()
  }, 2_000)

  // Execute in background to avoid blocking the event subscription
  prisma.$transaction([
    // Create the user
    prisma.user.create({
      data: {
        email,
      },
    }),
    // Update the user
    prisma.user.update({
      where: {
        email,
      },
      data: {
        name: 'Alice',
      },
    }),
    // Delete the user
    prisma.user.delete({
      where: {
        email,
      },
    }),
  ])

  const eventsReceived: {
    create: null | PulseCreateEvent<{ email: string; name: string | null; user_id: number }>
    update: null | PulseUpdateEvent<{ email: string; name: string | null; user_id: number }>
    delete: null | PulseDeleteEvent<{ email: string; name: string | null; user_id: number }>
  } = {
    create: null,
    update: null,
    delete: null,
  }

  // Listen to the events and collect them
  // Collecting them in this manner is interesting for testing purposes
  // So we only collect 1 event of each type
  // Because potentially
  for await (const event of subscription) {
    console.log('just received an event:', event)

    if (event.action === 'create') {
      eventsReceived.create = event
    } else if (event.action === 'update') {
      eventsReceived.update = event
    } else if (event.action === 'delete') {
      eventsReceived.delete = event
    } else {
      throw new Error('Unknown event type')
    }
  }

  return eventsReceived
}
