function connect({
  reconnect = false,
  name,
  onMessage,
  onConnect,
}: {
  reconnect?: boolean;
  name: string;
  onMessage: (payload: any) => void;
  onConnect: (port0: chrome.runtime.Port) => () => void;
}) {
  if (reconnect) {
    // noop
  }
  const port = chrome.runtime.connect({
    includeTlsChannelId: true,
    name,
  });

  port.onMessage.addListener(onMessage);

  let cleanup: () => void;
  const onDisconnect = () => {
    // TODO re-connect to background
    port.onMessage.removeListener(onMessage);
    port.onDisconnect.removeListener(onDisconnect);
    if (cleanup) {
      cleanup();
    }
  };
  port.onDisconnect.addListener(onDisconnect);

  if (onConnect) {
    cleanup = onConnect(port);
  }

  return port;
}

export default {
  connect,
};