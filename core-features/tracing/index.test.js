const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const axios = require('axios')

function buildTree(tree, spans) {
  const childrenSpans = spans.filter((span) => {
    const [ref] = span.references
    if (!ref) {
      return false
    }

    return ref.refType === 'CHILD_OF' && ref.spanID === tree.span.spanID
  })

  if (childrenSpans.length) {
    tree.children = childrenSpans.map((span) => buildTree({ span }, spans))
  } else {
    tree.children = []
  }

  return tree
}

describe('tracing', () => {
  it('should request app and assert that traces are there', async () => {
    const email = `${new Date().toISOString()}@email.com`
    await prisma.user.create({
      data: {
        email,
      },
    })

    const appResponse = await axios({
      method: 'GET',
      url: `http://localhost:4000/users`,
    })
    expect(appResponse.status).toEqual(200)

    const jeagerResponse = await axios({
      method: 'GET',
      url: 'http://localhost:16686/api/traces?service=prisma-tracing',
    })
    expect(jeagerResponse.status).toEqual(200)

    const [trace] = jeagerResponse.data.data
    const [rootSpan, ...restOfSpans] = trace.spans
    const traceTree = buildTree({ span: rootSpan }, restOfSpans)

    const snapshotJSON = JSON.stringify(
      traceTree,
      (key, value) => {
        const ignoredKeys = [
          'traceID',
          'spanID',
          'flags',
          'references',
          'startTime',
          'duration',
          'warnings',
          'processID',
          'logs',
        ]
        if (ignoredKeys.includes(key)) {
          return undefined
        }

        // If its SQL stmt
        if (key === 'value' && typeof value === 'string') {
          if (value.includes('traceparent')) {
            // Traceparent is unique so we cant snapshot
            const [sql] = value.split('traceparent')
            value = sql
          }
        }

        return value
      },
      2,
    )

    const prettyJSON = JSON.stringify(JSON.parse(snapshotJSON), null, 2)

    expect(prettyJSON).toMatchInlineSnapshot(`
      "{
        \\"span\\": {
          \\"operationName\\": \\"middleware - runConnect\\",
          \\"tags\\": [
            {
              \\"key\\": \\"fastify.type\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"middleware\\"
            },
            {
              \\"key\\": \\"plugin.name\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"fastify-express\\"
            },
            {
              \\"key\\": \\"hook.name\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"onRequest\\"
            },
            {
              \\"key\\": \\"service.name\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"prisma-tracing\\"
            },
            {
              \\"key\\": \\"telemetry.sdk.language\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"nodejs\\"
            },
            {
              \\"key\\": \\"telemetry.sdk.name\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"opentelemetry\\"
            },
            {
              \\"key\\": \\"telemetry.sdk.version\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"1.4.0\\"
            },
            {
              \\"key\\": \\"otel.library.name\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"@opentelemetry/instrumentation-fastify\\"
            },
            {
              \\"key\\": \\"otel.library.version\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"0.25.0\\"
            },
            {
              \\"key\\": \\"internal.span.format\\",
              \\"type\\": \\"string\\",
              \\"value\\": \\"proto\\"
            }
          ]
        },
        \\"children\\": [
          {
            \\"span\\": {
              \\"operationName\\": \\"request handler - anonymous\\",
              \\"tags\\": [
                {
                  \\"key\\": \\"plugin.name\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"fastify-express\\"
                },
                {
                  \\"key\\": \\"fastify.type\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"request_handler\\"
                },
                {
                  \\"key\\": \\"http.route\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"/users\\"
                },
                {
                  \\"key\\": \\"service.name\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"prisma-tracing\\"
                },
                {
                  \\"key\\": \\"telemetry.sdk.language\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"nodejs\\"
                },
                {
                  \\"key\\": \\"telemetry.sdk.name\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"opentelemetry\\"
                },
                {
                  \\"key\\": \\"telemetry.sdk.version\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"1.4.0\\"
                },
                {
                  \\"key\\": \\"otel.library.name\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"@opentelemetry/instrumentation-fastify\\"
                },
                {
                  \\"key\\": \\"otel.library.version\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"0.25.0\\"
                },
                {
                  \\"key\\": \\"internal.span.format\\",
                  \\"type\\": \\"string\\",
                  \\"value\\": \\"proto\\"
                }
              ]
            },
            \\"children\\": [
              {
                \\"span\\": {
                  \\"operationName\\": \\"prisma\\",
                  \\"tags\\": [
                    {
                      \\"key\\": \\"method\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"findMany\\"
                    },
                    {
                      \\"key\\": \\"model\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"User\\"
                    },
                    {
                      \\"key\\": \\"service.name\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"prisma-tracing\\"
                    },
                    {
                      \\"key\\": \\"telemetry.sdk.language\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"nodejs\\"
                    },
                    {
                      \\"key\\": \\"telemetry.sdk.name\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"opentelemetry\\"
                    },
                    {
                      \\"key\\": \\"telemetry.sdk.version\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"1.4.0\\"
                    },
                    {
                      \\"key\\": \\"otel.library.name\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"prisma\\"
                    },
                    {
                      \\"key\\": \\"otel.library.version\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"undefined\\"
                    },
                    {
                      \\"key\\": \\"internal.span.format\\",
                      \\"type\\": \\"string\\",
                      \\"value\\": \\"proto\\"
                    }
                  ]
                },
                \\"children\\": [
                  {
                    \\"span\\": {
                      \\"operationName\\": \\"prisma:query_builder\\",
                      \\"tags\\": [
                        {
                          \\"key\\": \\"service.name\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"prisma-tracing\\"
                        },
                        {
                          \\"key\\": \\"telemetry.sdk.language\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"nodejs\\"
                        },
                        {
                          \\"key\\": \\"telemetry.sdk.name\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"opentelemetry\\"
                        },
                        {
                          \\"key\\": \\"telemetry.sdk.version\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"1.4.0\\"
                        },
                        {
                          \\"key\\": \\"otel.library.name\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"prisma\\"
                        },
                        {
                          \\"key\\": \\"otel.library.version\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"undefined\\"
                        },
                        {
                          \\"key\\": \\"internal.span.format\\",
                          \\"type\\": \\"string\\",
                          \\"value\\": \\"proto\\"
                        }
                      ]
                    },
                    \\"children\\": [
                      {
                        \\"span\\": {
                          \\"operationName\\": \\"prisma:db_query\\",
                          \\"tags\\": [
                            {
                              \\"key\\": \\"db.statement\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"SELECT \`main\`.\`User\`.\`id\`, \`main\`.\`User\`.\`email\`, \`main\`.\`User\`.\`name\` FROM \`main\`.\`User\` WHERE 1=1 LIMIT ? OFFSET ? /* \\"
                            },
                            {
                              \\"key\\": \\"service.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"prisma-tracing\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.language\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"nodejs\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"opentelemetry\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.version\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"1.4.0\\"
                            },
                            {
                              \\"key\\": \\"otel.library.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"prisma\\"
                            },
                            {
                              \\"key\\": \\"otel.library.version\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"undefined\\"
                            },
                            {
                              \\"key\\": \\"internal.span.format\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"proto\\"
                            }
                          ]
                        },
                        \\"children\\": []
                      },
                      {
                        \\"span\\": {
                          \\"operationName\\": \\"prisma:connection\\",
                          \\"tags\\": [
                            {
                              \\"key\\": \\"db.type\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"sqlite\\"
                            },
                            {
                              \\"key\\": \\"service.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"prisma-tracing\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.language\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"nodejs\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"opentelemetry\\"
                            },
                            {
                              \\"key\\": \\"telemetry.sdk.version\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"1.4.0\\"
                            },
                            {
                              \\"key\\": \\"otel.library.name\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"prisma\\"
                            },
                            {
                              \\"key\\": \\"otel.library.version\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"undefined\\"
                            },
                            {
                              \\"key\\": \\"internal.span.format\\",
                              \\"type\\": \\"string\\",
                              \\"value\\": \\"proto\\"
                            }
                          ]
                        },
                        \\"children\\": [
                          {
                            \\"span\\": {
                              \\"operationName\\": \\"prisma:db_query\\",
                              \\"tags\\": [
                                {
                                  \\"key\\": \\"db.statement\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"SELECT 1\\"
                                },
                                {
                                  \\"key\\": \\"service.name\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"prisma-tracing\\"
                                },
                                {
                                  \\"key\\": \\"telemetry.sdk.language\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"nodejs\\"
                                },
                                {
                                  \\"key\\": \\"telemetry.sdk.name\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"opentelemetry\\"
                                },
                                {
                                  \\"key\\": \\"telemetry.sdk.version\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"1.4.0\\"
                                },
                                {
                                  \\"key\\": \\"otel.library.name\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"prisma\\"
                                },
                                {
                                  \\"key\\": \\"otel.library.version\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"undefined\\"
                                },
                                {
                                  \\"key\\": \\"internal.span.format\\",
                                  \\"type\\": \\"string\\",
                                  \\"value\\": \\"proto\\"
                                }
                              ]
                            },
                            \\"children\\": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }"
    `)
  })
})
