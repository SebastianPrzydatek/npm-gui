import { observable, action } from 'mobx';

export class ConsoleStore {
  @observable sessions: ConsoleSession[] = [];

  @observable websocketConnected = false;

  constructor() {
    const consoleSocket = new WebSocket(`ws://${window.location.host}/api/console`);
    consoleSocket.onmessage = msg => this.addMessageToSession(JSON.parse(msg.data));
    consoleSocket.onopen = () => this.setConnected(true);
    // consoleSocket.onclose = () => {
    //   commit('addMessageToSession', { id: 'default', msg: 'disconnected\n' });
    //   commit('setConnected', false);
    //   setTimeout(() => dispatch('connect'), 1000);
    // };
  }

  @action
  addMessageToSession(message: ConsoleSession):void {
    let currentSession = this.sessions.find(s => s.id === message.id);
    if (!currentSession) {
      this.sessions.push(message);
      currentSession = message;
    } else {
      currentSession.status = message.status;
      currentSession.msg = currentSession.msg + message.msg;
    }
    console.log('new message');
  }

  @action
  setConnected(connected:boolean):void {
    this.websocketConnected = connected;
  }

  // get completedTodosCount() {
  //   return this.todos.filter(
  //     todo => todo.completed === true
  //   ).length;
  // }

  // report() {
  //   if (this.todos.length === 0)
  //     return "<none>";
  //   return `Next todo: "${this.todos[0].task}". ` +
  //     `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  // }

  // addTodo(task) {
  //   this.todos.push({
  //     task: task,
  //     completed: false,
  //     assignee: null
  //   });
  // }
}

export const consoleStore = new ConsoleStore();
