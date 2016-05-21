'use babel';

import AmpSnippetsView from './amp-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  ampSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ampSnippetsView = new AmpSnippetsView(state.ampSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ampSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'amp-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ampSnippetsView.destroy();
  },

  serialize() {
    return {
      ampSnippetsViewState: this.ampSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AmpSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
