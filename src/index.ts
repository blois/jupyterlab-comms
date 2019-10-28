import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ServiceManager } from '@jupyterlab/services';
import * as comms from './jupyterComms';
import { toArray } from '@phosphor/algorithm';

// import { PageConfig } from '@jupyterlab/coreutils';


const commTargetName = 'jupyter-comms';
/**
 * Initialization data for the jupyterlab-comms extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-comms',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-comms is activated!');
    new Comms(app.serviceManager);
  }
};

class Comms implements comms.IComms {
  private readonly serviceManager: ServiceManager;
  constructor(serviceManager: ServiceManager) {
    this.serviceManager = serviceManager;
  }

  async open(id: string): Promise<comms.IChannel> {
    const sessionModels = toArray(this.serviceManager.sessions.running());
    for (const sessionModel of sessionModels) {
      const session = this.serviceManager.sessions.connectTo(sessionModel);
      session.kernel.connectToComm(commTargetName, id);
    }

    throw new Error('Not implemented');
  }
}

// class Comms {
//   constructor(serviceManager: ServiceManager) {
//     console.log(serviceManager);
//     serviceManager.sessions.runningChanged.connect((sessionManager, model) => {
//       this.handleRunningChanged();
//     })
//   }

//   private handleRunningChanged() {
//     // connectToComm
//   }
// }

// current.context.session.kernel

export default extension;
