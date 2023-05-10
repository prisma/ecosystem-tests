import { test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals'
import { context } from '@opentelemetry/api'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { Resource } from '@opentelemetry/resources'
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  ReadableSpan,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { PrismaClient } from '@prisma/client'

let inMemorySpanExporter: InMemorySpanExporter

beforeAll(() => {
  const contextManager = new AsyncHooksContextManager().enable()
  context.setGlobalContextManager(contextManager)

  inMemorySpanExporter = new InMemorySpanExporter()

  const basicTracerProvider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: `test-name`,
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    }),
  })

  basicTracerProvider.addSpanProcessor(new SimpleSpanProcessor(inMemorySpanExporter))
  basicTracerProvider.register()

  registerInstrumentations({
    instrumentations: [new PrismaInstrumentation({ middleware: true })],
  })
})

beforeEach(() => {
  inMemorySpanExporter.reset()
})

afterAll(() => {
  context.disable()
})

async function waitForSpans(): Promise<ReadableSpan[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return inMemorySpanExporter.getFinishedSpans()
}

function cleanSpansForSnapshot(spans: ReadableSpan[]) {
  return JSON.parse(
    JSON.stringify(spans, (key, value) => {
      const removedKeys = ['endTime', 'startTime', 'resource', 'status', 'events', 'instrumentationLibrary']

      if (removedKeys.includes(key)) {
        return undefined
      }

      if (key[0] === '_') return undefined
      if (key === 'itx_id') return '<itxId>'
      if (key === 'db.statement') return '<dbStatement>'
      if (key === 'spanId') return '<spanId>'
      if (key === 'traceId') return '<traceId>'
      if (key === 'parentSpanId') return '<parentSpanId>'

      return value
    }),
  )
}

test('dataproxy tracing with postgres', async () => {
  const prisma = new PrismaClient()

  await prisma.user.findMany()
  const spans = await waitForSpans()

  expect(cleanSpansForSnapshot(spans)).toMatchInlineSnapshot(`
    [
      {
        "attributes": {},
        "kind": 0,
        "links": [],
        "name": "prisma:client:serialize",
        "parentSpanId": "<parentSpanId>",
      },
      {
        "attributes": {
          "method": "findMany",
          "model": "User",
          "name": "User.findMany",
        },
        "kind": 0,
        "links": [],
        "name": "prisma:client:operation",
        "parentSpanId": "<parentSpanId>",
      },
      {
        "attributes": {
          "db.type": "postgres",
        },
        "kind": 0,
        "links": [],
        "name": "prisma:engine:connection",
        "parentSpanId": "<parentSpanId>",
      },
      {
        "attributes": {
          "db.statement": "<dbStatement>",
        },
        "kind": 0,
        "links": [],
        "name": "prisma:engine:db_query",
        "parentSpanId": "<parentSpanId>",
      },
      {
        "attributes": {},
        "kind": 0,
        "links": [],
        "name": "prisma:engine:serialize",
        "parentSpanId": "<parentSpanId>",
      },
      {
        "attributes": {},
        "kind": 0,
        "links": [],
        "name": "prisma:engine",
        "parentSpanId": "<parentSpanId>",
      },
    ]
  `)
})
