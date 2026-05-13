import { Maximize2, Pause, Play, RotateCcw } from 'lucide-react';
import Button from '../UI/Button.jsx';

export default function TimerControls({ isRunning, onToggle, onReset, onFocus }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onClick={onToggle} className="min-w-36">{isRunning ? <><Pause className="mr-2 inline" size={18} />Pause</> : <><Play className="mr-2 inline" size={18} />Start</>}</Button>
      <Button variant="ghost" onClick={onReset}><RotateCcw className="mr-2 inline" size={18} />Reset</Button>
      <Button variant="ghost" onClick={onFocus}><Maximize2 className="mr-2 inline" size={18} />Focus mode</Button>
    </div>
  );
}
