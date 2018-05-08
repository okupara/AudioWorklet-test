import { of, Subject } from 'rxjs';
import { switchMap, map, publish, combineLatest } from 'rxjs/operators';

const START = 'start';
const STOP = 'stop';
const CHANGE_VOL = 'change_vol';

const userInputSubject = new Subject();
const userInputObservable = userInputSubject.asObservable().pipe(publish());
userInputObservable.connect();

of(new AudioContext())
  .pipe(
    switchMap(context =>
      new Promise((res, rej) => {
        context.audioWorklet.addModule('js/noise.js')
          .then(_ => res(context))
          .catch(e => rej(e))
      })
    ),
    map(context => {
      const noise = new window.AudioWorkletNode(context, 'noise');
      const param = noise.parameters.get('myParam');
      noise.connect(context.destination);
      context.suspend();
      return { context, volumeParam: param };
    }),
    combineLatest(
      userInputSubject,
      (audioTemp, message) => ({ ...audioTemp, message })
    )
  )
  .subscribe(({ context, volumeParam, message }) => {
    if (!message || !message.type) {
      return;
    }
    switch (message.type) {
      case START:
        context.resume();
        break;
      case STOP:
        context.suspend();
        break;
      case CHANGE_VOL:
        const newVol = message.payload;
        volumeParam.linearRampToValueAtTime(newVol, context.currentTime + 0.1);
        break;
      default:
        break;
    }

  });

export const start = () => userInputSubject.next({ type: START });
export const stop = () => userInputSubject.next({ type: STOP });
export const setVol = (vol) => userInputSubject.next({ type: CHANGE_VOL, payload: vol });

