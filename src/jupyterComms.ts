declare global {
    interface Window { 
        jupyterComms: IComms;
    }
}

export interface IComms {
    open(id: string): Promise<IChannel>;
}

export interface IChannel {
    messages: AsyncIterable<IMessage>;

    broadcast(message: IMessage): Promise<void>;

    close(): void;

    /**
     * Persist the messages in the notebook.
     * @param messages 
     */
    setSaveState(messages: IMessage[]): Promise<void>
}

export interface IMessage {
    readonly data: any;
    readonly buffers?: ArrayBuffer[];
}