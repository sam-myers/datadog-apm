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
 */
const init = (options: TracerOptions, apmOptions: ApmOptions = {}): void => {
    tracerOptions = options;

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
