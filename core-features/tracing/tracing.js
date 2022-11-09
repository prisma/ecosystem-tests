const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node')
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base')
const { PrismaInstrumentation } = require('@prisma/instrumentation')
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'ecosystem-tests-core-features-tracing',
  }),
})

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [HttpInstrumentation, new FastifyInstrumentation(), new PrismaInstrumentation()],
})

const exporter = new JaegerExporter()
provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

provider.register()
