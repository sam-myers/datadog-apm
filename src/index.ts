export {
    trace,
    traceFunction,
    Tags
} from './trace-decorator';

export {
    Span,
    Formats,
    getRootSpanFromRequestContext,
    addTags,
    addLogMetadata,
    markAsError
} from './util';

export {
    tracer,
    init,
    TracerOptions,
    ApmOptions
} from './tracer';
