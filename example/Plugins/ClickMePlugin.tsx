// @ts-ignore
import React from 'react';
import { IPlugin, PluginStore, Event } from '../../src';

class ClickMePlugin implements IPlugin {
  public pluginStore: PluginStore;

  getPluginName() {
    return 'ClickMe@1.0.0';
  }
  getDependencies() {
    return ['Plugin1@2.3.0'];
  }

  init(pluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {
    this.pluginStore.addFunction('sendAlert', () => {
      alert('Testing');
    });

    this.pluginStore.executeFunction('RendererPlugin.add', 'top', () => (
      <>
        <h1>asdjkdas</h1>
        <button
          onClick={() =>
            this.pluginStore.dispatchEvent(new Event('ClickMePlugin.hello'))
          }
        >
          Dispatch event
        </button>
      </>
    ));

    setTimeout(() => {
      this.pluginStore.executeFunction('RendererPlugin.add', 'top', () => (
        <>
          <h1>Async text</h1>
          <button
            onClick={() =>
              this.pluginStore.dispatchEvent(new Event('ClickMePlugin.hello'))
            }
          >
            Async button
          </button>
        </>
      ));
    }, 5000);
  }
  deactivate() {
    this.pluginStore.removeFunction('sendAlert');
  }
}

export default ClickMePlugin;
