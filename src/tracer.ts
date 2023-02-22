import { Tracer, TracerOptions, tracer as tracerRaw } from 'dd-trace';
import { mockTracer } from './mock-tracer';

let tracerOptions: TracerOptions = {};
let tracer: Tracer & { isMock?: boolean };

interface ApmOptions {
    /* Use the mock tracer */
    useMock?: boolean
}

/**
 * This is a wrapper around the datadog init function.
 * This function should be imported and called before any other code,
 * otherwise the APM may not be able to trace it properly or at all.
 *
 * @param options The `TracerOptions` to be passed the tracer init function
 * @param apmOptions The datadog-apm options
 */
const init = (options: TracerOptions & { enabled?: boolean | undefined; debug?: boolean | undefined }, apmOptions: ApmOptions = {}): void => {
    tracerOptions = options;

    if (process.env.DD_TRACE_ENABLED === undefined && options.enabled) {
        process.env.DD_TRACE_ENABLED = 'true';
    } else if (process.env.DD_TRACE_ENABLED === undefined && options.enabled === undefined) {
        process.env.DD_TRACE_ENABLED = 'true';
    } else if (process.env.DD_TRACE_ENABLED === undefined && options.enabled === false) {
        process.env.DD_TRACE_ENABLED = 'false';
    }

    if (process.env.DD_TRACE_DEBUG === undefined && options.debug) {
        process.env.DD_TRACE_DEBUG = 'true';
    } else if (process.env.DD_TRACE_ENABLED === undefined && options.debug === undefined) {
        process.env.DD_TRACE_DEBUG = 'false';
    }

    if (apmOptions.useMock) {
        tracer = mockTracer;
    } else {
        tracer = tracerRaw;
        tracer.init(tracerOptions);
        tracer.isMock = false;
    }
};

export {
    tracer,
    init,
    tracerOptions,
    TracerOptions,
    ApmOptions
}
