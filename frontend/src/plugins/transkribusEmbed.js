// TODO: listen for EVENT.LOAD
export default function TranscriberApplication(selector, options) {
  options = options || {};

  const EVENT = {
    SAVE: 'save',
    SUCCESS: 'success',
    ERROR: 'error',
    LOAD: 'load',
  };

  this.STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE', // aka ready for review
    FINAL: 'FINAL',
  };

  const URL = 'https://transkribus.eu/r/read/sandbox/embedded/';

  let viewNode;
  let iFrameNode;

  return {
    initialize: () => initialize(),
    save(options) {
      options = options || {};
      const { status } = options;
      const { success } = options;
      const { error } = options;
      const target = iFrameNode.contentWindow;

      window.addEventListener(
        'message',
        function handle(evt) {
          let callback;

          const eventData = evt.data || {};
          const eventName = eventData.type;

          console.assert(typeof eventName === 'string');

          window.removeEventListener('message', handle);

          if (eventName === EVENT.SUCCESS) callback = success;
          else if (eventName === EVENT.ERROR) {
            callback = error;
          }

          if (typeof callback !== 'function') return;

          try {
            callback(eventData.detail);
          } catch (error) {
            console.error(error);
          }
        },
        false,
      );

      target.postMessage({ type: EVENT.SAVE, detail: { status } }, URL);
    },
  };

  function initialize() {
    try {
      if (!validate(options)) console.error('Invalid config:', options);
      else {
        viewNode = document.querySelector(selector);
        iFrameNode = createIFrame(
          viewNode,
          buildUrl({
            url: URL,
            id: options.id,
            token: options.token,
            origin: options.origin,
            mode: options.mode,
            image: options.image,
          }),
        );
        viewNode.appendChild(iFrameNode);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function createIFrame(parent, url) {
    const node = document.createElement('iframe');

    node.setAttribute('width', '100%');
    node.setAttribute('height', '100%');
    node.setAttribute('frameborder', 0);

    // node.setAttribute('sandbox', 'allow-scripts');

    node.setAttribute('src', url);

    return node;
  }

  function validate(options) {
    const id = options.id || {};

    const col = typeof id.colId === 'number';
    const doc = typeof id.docId === 'number';
    const page = typeof id.pageNum === 'number';
    const token = typeof options.token === 'string' && options.token.length === 32;
    const mode = typeof options.mode === 'string';
    const image = typeof options.image === 'string';

    return col && doc && page && token && mode;
  }

  function buildUrl(options) {
    return (
      `${options.url
      }?${
        [
          `colId=${options.id.colId}`,
          `docId=${options.id.docId}`,
          `pageId=${options.id.pageNum}`,
          `token=${options.token}`,
          `origin=${options.origin}` || '',
          `markers=${options.mode === 'annotation' ? 1 : 0}`,
          `image=${options.image === 'false' ? 0 : 1}`,
        ].join('&')}`
    );
  }

  function onLoad(evt) {
    if (typeof options.success === 'function') options.success();
  }

  function onError(evt) {
    if (typeof options.error === 'function') options.error();
  }
}
